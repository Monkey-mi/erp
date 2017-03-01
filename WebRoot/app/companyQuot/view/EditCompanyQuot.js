Ext.define('erp.companyQuot.view.EditCompanyQuot',{
      extend: 'erp.ux.Window',
      alias:'widget.edt_CompanyQuot',
      requires:['erp.ux.SearchCombobox','erp.ux.CommonTrigger','erp.view.master.purchaseDetail.window.MateCombo',
      'erp.ux.SelectField','erp.view.master.purchaseDetail.store.MaterialDetail'],
      title : '厂商报价单编辑',
      /*modal:true,*/
      width : 0.75 * window.screen.width,
	  height:0.8 * window.screen.height,
      initComponent : function(){
          var me = this;
          me.deStore = Ext.create('erp.companyQuot.store.QuotDetail');
          me.fileStore = Ext.create('erp.companyQuot.store.CompanyQuotFile');
          me.CurrencyStore = Ext.create('erp.master.foreigncurrency.store.foreignCurrency');
          me.CurrencyStore.load();
          me.clStore = Ext.create('erp.view.master.purchaseDetail.store.MaterialDetail')
          /*me.toBeDeleteFileArray=[];*/
          Ext.apply(me,{
              layout : {
                 type : 'vbox',
                 align : 'stretch'
              },
           tbar: [{text:'保存',glyph:0xf0c7,itemId:'BTN_SAVE',disabled:!me.canedit},
                  {text: '关闭',glyph:0xf00d,handler:function(){
                  me.close();
                  }}
              ],
           items:[{
               xtype : 'form',
               itemId : 'bjForm',
               height : 90,
               bodyPadding: 10,
               store : me.mainstore,
               layout: 'column',
               defaults:{
                 labelWidth:70,xtype:'textfield',padding:5
               },
               items:[
                  {fieldLabel : '操作员名',name: 'czym',itemId:'czym',hidden : true,
                  /*defaultValue:erp.UInfo.currentUser.name,*/columnWidth:1},
                  {fieldLabel : '操作时间',name: 'czsj',itemId:'czsj',hidden : true,
                  /*defaultValue:new Date(),*/columnWidth:1},
                  {
                   fieldLabel: '报价单号',
                   itemId: 'bjdh',
                   name: 'bjdh',
                   columnWidth : .23,
                   allowBlank:false,
                   readOnly : true,
                   fieldStyle:'background:#E6E6E6'
                   },{
                   xtype : 'datefield',
                   fieldLabel : '报价日期',
                   name : 'bjrq',
                   itemId : 'bjrq',
                   allowBlank:false,
                   columnWidth:.3,
                   readOnly:!me.canedit
                   },{
                   fieldLabel: '厂商名称',
                   itemId: 'csbh',
		           name: 'csbh',
		           columnWidth:.47,
		           allowBlank:false,
		           blankText : '厂商名称不能为空',
				   emptyText:'(必填)',
				   readOnly:!me.canedit,
		           xtype:'helpField',
		           code : erp.DataConst.FACTORYINFO,
				   fieldConfig:{forceSelection:true},
				   listeners:{
				          change :function(o,  newValue,  oldValue,  eOpts){
				             var data = o.displayTplData;
				             if(data.length>0){
				             var rec=data[0];
				             me.down('#csmc').setValue(rec.csmc);
				             }
				           }
				          }  
                   },{
                     fieldLabel : '备注说明',
                     itemId : 'bzsm',
                     name : 'bzsm',
                     columnWidth : 1,
                     maxLength:100,
                     readOnly:!me.canedit
                   },{
                     fieldLabel : '真厂商名称',
                     hidden : true,
                     itemId : 'csmc',
                     name : 'csmc'
                   },{
                    fieldLabel : '操作人名',
                    itemId : 'czym',
                    name : 'czym',
                    value : erp.UInfo.currentUser.name,
                    hidden : true
                   },{
                    fieldLabel : '操作时间',
                    name : 'czsj',
                    itemId : 'czsj',
                    hidden : true,
                    value : new Date()
                   }]
             },{
              xtype: 'tabpanel',
              flex : 1,
              items :[
              {
                  xtype : 'grid',
                  itemId : 'grdQuotDetail',
                  title : '报价明细',
                  selModel:Ext.create('Ext.selection.CheckboxModel'),
                  tbar:[{text:'增加',glyph:0xf055,itemId:'btn_quotdetail_add',disabled:!me.isPlus},
						{text:'删除',glyph:0xf014,itemId:'btn_quotdetail_del',disabled:!me.isDelete}
						],
				  columns : [
				  {header: '序号',dataIndex:'bjxh',width:50},
				  {header: '材料编码',dataIndex:'clhh',itemId:'clhh',width:160,align:'center'
				 /* ,editor:{
				      xtype : 'helpField',
				       code : erp.DataConst.MATEINFO,
				       winOpen:true,
					   fieldConfig:{forceSelection:false},
					   listeners:{
					       change : function(o,  newValue,  oldValue,  eOpts){
					           if(o.displayTplData!=null){
					           var data = o.displayTplData;
					           if(data.length>0){
				                 var rec=data[0];
				                 var grid = me.down('#grdQuotDetail');
				                 var srec = grid.getSelectionModel().getSelection()[0];
				                 srec.set('clmc',rec.clmc);
				                 srec.set('wbbh',rec.wbbh);
				                 srec.set('jldw',rec.jldw);
				                 srec.set('csbj',rec.cbdj);
				               }
					       }
					       }
					   }
				  }*/},
				  {header: '材料名称',dataIndex:'clmc',width:350,field:{
			   	  	  			xtype:'commonTrigger',
			   	  	  			name:'clmc',
								itemId:'clmc',
								selModel:'MULTI',
								cusConfig:{
									type:'ContractDetail',
									field:'clmc',
									indexNum:4,
									callback:function(v,rec,recs){
										me.clmcCallback(v,rec,recs);
									}
								},
								win:'erp.view.master.purchaseDetail.window.MateCombo',
								listeners:{
									change :function(o,  newValue,  oldValue,  eOpts){
										//console.log(o);
										//console.log(newValue);
				                    }
								}
			   	  	  		}
				  /*field : {
				    xtype:'tps_searchcbo',
					itemId:'clmc',
					name : 'clmc',
					hideTrigger:true,
					store: Ext.create('erp.view.master.purchaseDetail.store.MaterialDetail'),
					displayField:'clmc',
					 valueField:'clmc',
					listeners:{
							'change':function(obj,value){
								if(!Ext.isEmpty(value)){
							        me.store= Ext.create('erp.view.master.purchaseDetail.store.MaterialDetail');
						            me.store.loadPage(1,
       	  				    		{
           	  				    	params:{
           	  				    		usePaging : true,
           	  				    		search:value
           	  				    	}
       	  				    	});
								}
							},
							'select' : function(record, index){
								var me = this;
                                var grid = me.up('#grdQuotDetail');
                                var srec = grid.getSelectionModel().getSelection()[0];
                                var rec = index;
                                srec.set('clhh',rec.get('clhh'));
                                srec.set('clmc', rec.get('clmc'));
                                srec.set('jldw', rec.get('jldw'));
                                srec.set('csbj', rec.get('csbj'));
							}
					}
				  }*/
				  /*editor:{
				    xtype:'commonTrigger',
					name:'clmc',
					itemId:'clmc',
					selModel:'MULTI',
				    cusConfig:{
					   type:'QuotDetail',
					   field:'clmc',
					   indexNum:3,
					   callback : function(v,rec,recs){
										me.clmcCallback(v,rec,recs);
									}
					},
					 win:'erp.view.master.purchaseDetail.window.MateCombo',
					 listeners:{
							change :function(o,  newValue,  oldValue,  eOpts){
				            },
				            specialkey: function(field, e){
    	                    if (e.getKey() == e.ENTER) {
    	                        me.QueryMate();
    	                    }
    	                   }
						}
				  },	
				  renderer:function(v,metaData){
					        metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				            return v;
				  }*/
				  },
				  {header: '单位',dataIndex:'jldw',width:50,editor:{}},
				  {header: '厂商出价',dataIndex:'jzj_str',width:80,editor:{}},
				  {header: '材料控价',dataIndex:'csbj',width:80,editor:{}},
				  {header: '辅助单位',dataIndex:'fzdw',width:80},
				  {header: '辅助控价',dataIndex:'fzkj',width:80,editor:{}},
				  {header: '币种',dataIndex:'wbbh',width:50,
				  editor:{
				         xtype: 'combo',
				         readOnly : me.editwbbh,
				         forceSelection:true,
				         store : Ext.create('erp.master.foreigncurrency.store.foreignCurrency'),
				         displayField:'wbdh',
				         valueField:'wbbh'
				  },
				    renderer:function(value){
				        var rec = me.CurrencyStore.findRecord('wbbh',value,0,false,false,true);
				        return Ext.isEmpty(rec)?value:rec.get('wbdh');
				     }
				  },
				  {header: '外币报价',dataIndex:'wbbj',width:80,editor:{}},
				  {header: '备注说明',dataIndex:'mxbz',width:260,editor:{}}
				  ],store: me.deStore,
				  plugins: {
					        ptype: 'cellediting',
					        clicksToEdit: 1,
					        listeners: {			        												
								'beforeedit':function(editor, e, obj){
									if(me.cannotedit){
										Ext.Msg.alert('提示','不可修改');
										return false;
									}
								},
								edit:function(editor,con,e){
								    var field=con.field;
					        		var rec=con.record;
					        		var csbh=me.down('#csbh').getValue();	
					        		switch(field){
					        		case 'clmc' : 
					        		   if(con.originalValue==con.value){
					        					break;
					        				}
					        				var clrec = Ext.create('erp.view.master.purchaseDetail.model.MaterialDetail');
					        				clrec = erp.Const.callServiceMethodSync('purchasedetail/purchasedetail.act?method=getMaterialDetailList',
											{
												clhh : rec.get('clmc')
											});
										/*	var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											var cd=data.cd;*/
										 var wbbh;
                                         var sql = "select wbbh  from csxxb where csbh="+csbh+";"
                                         var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						                    {sql : sql});
			                             var data = Ext.decode(result);
			                             if (!data.bool) {
					                     Ext.toastErrorInfo(data.msg);
					                          return;
				                           }
			                             if(data.val!=null){
				                           wbbh = data.val;}	
			                             if(wbbh==null||Ext.String.trim(wbbh)==''){
                                           wbbh = 60;
                                         }		
                                         if(!Ext.isEmpty(clrec)){
                                           rec.set('clhh',clrec[0].clhh);
                                           rec.set('wbbh',wbbh);
                                           rec.set('jldw',clrec[0].jldw);
                                           rec.set('fzdw',clrec[0].fzdw);
                                           rec.set('csbj',clrec[0].cbdj);
                                           rec.set('clmc',clrec[0].clmc);
                                         }
                                        break; 
					        		}
								}
					        }
					    }
                 },{
                  itemId: 'CompanyQuotFile',
				  overflowY:'auto',
			      overflowX:'auto',
				  title : '附件明细',
				  layout: 'border',
				   items:[{
                   xtype : 'grid',
                   itemId : 'grd_QuotFile',
                   title:'附件明细',
                    region: 'center',
                   flex : 1,
                   selModel:Ext.create('Ext.selection.CheckboxModel'),
				   tbar:[{iconCls:'add',tooltip:'上传',itemId:'btn_QuotFile_upload',disabled:!me.isPlus}/*,
						 {iconCls:'download',tooltip:'下载',itemId:'btn_QuotFile_download',disabled:!me.isDelete,
						 handler:function(grid,rowIndex,colIndex){
						      
						 }
						 },
						 {iconCls:'delete',tooltip:'删除',itemId:'btn_QuotFilel_del',disabled:!me.isDelete,
						 handler:function(grid,rowIndex,colIndex){
						 	 var rec = grid.getStore().getAt(rowIndex);
						     if(Ext.isEmpty(rec.get('wjlj'))){
						         Ext.Msg.alert('提示','文件尚未上传，无法删除');
								 return;
						     }
						  Ext.Msg.confirm("提示","是否确认删除上传的附件?",function(btn){
							if(btn=="yes"){
							    me.toBeDeleteFileArray.push(currentrec.get('wjlj'));
							    erp.Const.callServiceMethodSync('common/deleteFileByPath.srm',{
							    		patharray:me.toBeDeleteFileArray.join(',')
		                           });
		                         me.toBeDeleteFileArray=[]; //重置
							     rec.set('wjlj',null);
							 }
						   }) 
						 }}*/
						],
						 columns:[
		         	   {header: '文件编号',dataIndex:'wjbh',flex:1},
		         	   {header: '文件路径',dataIndex:'wjlj',flex:3,
		         	   renderer:function(v,metaData){
					      metaData.tdAttr='data-qtip="'+v+'"';
					      return v;
				        }},
		         	   {header: '文件名称',dataIndex:'wjmc',flex:2,
		         	   renderer:function(v,metaData){
					      metaData.tdAttr='data-qtip="'+v+'"';
					      return v;
				        }},
		         	   {header: '创建人名',dataIndex:'cjrm',flex:1},
		         	   {header: '创建日期',dataIndex:'cjrq',flex:1,xtype:'datecolumn',format:'Y-m-d'},
		         	   {header: '操作',xtype:'actioncolumn',flex:2,
		         	       items:[
		         	       {iconCls:'download',tooltip:'下载',itemId:'btn_QuotFile_download',/*disabled:!me.isDelete,*/
		         	       handler: function(grid,rowIndex,colIndex){
		         	       	var rec = grid.getStore().getAt(rowIndex);
		         	       	if(Ext.isEmpty(rec.get('wjlj')))
							{
								Ext.Msg.alert('提示','未上传，无法下载');
								return;
							}
							file_path=rec.get('wjlj');
							window.open('ftp://'+tp_ftpUrl+file_path, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=no, status=no');
		         	       }
		         	       },
		         	       { iconCls:'delete',tooltip:'删除',itemId:'btn_QuotFilel_del',disabled:!me.isDelete,align:'right',
						 handler:function(grid,rowIndex,colIndex){
						 	 var rec = grid.getStore().getAt(rowIndex);
						 	 var bjdh = rec.get('bjdh');
						     if(Ext.isEmpty(rec.get('wjlj'))){
						         Ext.Msg.alert('提示','文件尚未上传，无法删除');
								 return;
						     }
						  Ext.Msg.confirm("提示","是否确认删除上传的附件?",function(btn){
							if(btn=="yes"){
							   /* me.toBeDeleteFileArray.push(rec.get('wjlj'));*/
							   Ext.Ajax.request({
					             //将生成的xml发送到服务器端,需特别注意这个页面的地址
					              url: 'common/deleteAttachement.action',
					              async:false,
					              timeout: 600000,
					              method: 'POST',
					              success: function(response, opts)  {
					                    	rec.set('dytp','');
					                    	Ext.Msg.alert('提示', '删除成功！');
					              },
					              disableCaching:true,
					              isUpload: true,
					              params: {urlId:rec.get('wjlj')}
					              });
							    /*erp.Const.callServiceMethodSync('common/deleteFileByPath.do',{
							    		patharray:me.toBeDeleteFileArray.join(',')
		                           });*/
		                        /* me.toBeDeleteFileArray=[]; //重置
*/		                         me.fileStore.remove(rec);
		                         me.fileStore.sync({
		                         success : function(){
		                         me.fileStore.reload({
	  	                                        params : 
	  	                                       {
	  	                                      bjdh : bjdh
	  	                                    }
	  	                                 })
	  	                             }
		                         })       
							 }
						   }) 
						 }
						 },
				     	{
						//预览
						/*icon:'resources/images/icon/application_view_list.png',*/
						iconCls:'application_view_list',
						tooltip:'预览',/*
						flex : 1,
						itemId : 'btn_view',*/
						handler:function(grid,rowIndex,colIndex)
						{
							var rec = grid.getStore().getAt(rowIndex);
							var file_path=rec.get('wjlj');
							if(!Ext.isEmpty(file_path))
							{
								var suffixIndex=file_path.lastIndexOf('.');
                            	var suffixStr=file_path.substring(suffixIndex+1).toLowerCase();
                            	
                            	if(suffixStr=='bmp'||suffixStr=='jpg'||suffixStr=='jpeg'||suffixStr=='png'||suffixStr=='gif')
                            	{
                            		me.showPic(file_path,'PIC2');
                            	}
                            	else
                            	{
                            		Ext.Msg.alert('提示','当前格式不可直接预览,请通过下载方式查看');
									return;
                            	}
							}
							else
							{
								Ext.Msg.alert('提示','当前还没有上传文件');
								return;
							}
						}}
		         	       ]
		         	   }
		         	   ],
		         	   store : me.fileStore,
		         	    plugins:Ext.create('Ext.grid.plugin.CellEditing', {
							        clicksToEdit : 1,
							        editable : !me.canedit,
							        autoCancel: false,
							        itemId:'cellEditing'
				     })/*,
		          listeners: {
							selectionchange: function(grid, rec) {
								if (rec.length>0&&me.isPlus){
									me.down('#btn_QuotFile_download').setDisabled(false);
									me.down('#btn_QuotFilel_del').setDisabled(false);
								 }else{
								 	me.down('#btn_QuotFile_download').setDisabled(true);
								 	me.down('#btn_QuotFilel_del').setDisabled(true);
								 }
							}
						}*/
                  },{
			    			//预览图片
						region:'east',
			    		xtype:'image',
			    		flex:1,
			    		split: true,
			    		itemId:'PIC2',
			    		autoScroll:true,
			    		src:null,
						style:"position:absolute;left:0;top:0;width:100%;height:100%;"
			    		}
               ]}]
            }]
          })
            me.callParent(arguments);
      },
      clmcCallback : function(v,rec,recs){
        var me = this;
        var grid = me.down('#grdQuotDetail');
        var srec = grid.getSelectionModel().getSelection()[0];
        var bjdh = srec.get('bjdh');
        srec.set('clhh',recs[0].get('clhh'));
        srec.set('clmc', recs[0].get('clmc'));/*
        srec.set('wbbh', recs[0].get('wbbh'));
        srec.set('wbbh', recs[0].get('wbbh'));*/
        srec.set('jldw', recs[0].get('jldw'));
        srec.set('fzdw', recs[0].get('fzdw'));
        srec.set('csbj', recs[0].get('cbdj'));
        var nrecs = new Array();
        var bjxh = me.deStore.max('bjxh')==null?1:me.deStore.max('bjxh')+1;
        if(recs.length>1){
        for(var i = 1; i<recs.length;i++){
            var newrec = Ext.create('erp.companyQuot.model.QuotDetail');
            newrec.set('bjdh',bjdh);
            newrec.set('bjxh',bjxh);
            newrec.set('clhh',recs[i].get('clhh'));
            newrec.set('fzdw',recs[i].get('fzdw'));
            newrec.set('wbbh',srec.get('wbbh'));
            newrec.set('clmc',recs[i].get('clmc'));
            newrec.set('jldw',recs[i].get('jldw'));
            newrec.set('csbj',recs[i].get('cbdj'));
            nrecs.push(newrec);
            bjxh++;
        }
        me.deStore.add(nrecs);
        }
        /*srec.set('fzkj', rec.get('fzkj'));
        srec.set('fzdw', rec.get('fzdw'));*/
      }, 
      QueryMate : function(){},
      loadData : function(rec,isEdit){
      	var me = this;
      	var form=me.down('#bjForm');
      	form.loadRecord(rec);
      	if(isEdit){
      	   me.deStore.load({params:{
      	       bjdh: rec.get('bjdh')
      	  }});
      	   me.fileStore.load({params:{
      	       bjdh: rec.get('bjdh')
      	  }});
      	}
      },//图片展示
   		showPic:function(file_path,id){
   		var me=this;
   		var panel=me.down('#'+id);
   		if(file_path!=null&&file_path!=''){
   					/*var file_path=encodeURIComponent(encodeURIComponent(file_path));*/
   					/*var src='supplier/downloadAttched.do?file_path='+''+file_path+'&isimg=true';
   					console.log(src)*/
   					var src='ftp://'+tp_ftpUrl+file_path;
   					panel.setSrc(src);
   				}
   		}
})