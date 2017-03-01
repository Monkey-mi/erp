Ext.define('erp.materialInspection.view.EditMaterialInspection',{
    extend:'erp.ux.Panel',
    requires:['erp.materialInspection.store.TestProject',
              'erp.materialInspection.model.Csjgxsj',
              'erp.common.basic.view.field.HelpField',
              'erp.common.basic.view.MaterialTestProHelp'
    ],
    alias:'widget.edit_MaterialInspection',
    closable : true,
    modal:true,
    listeners:{
    	/*beforeclose:function(){
				var mes=confirm('真的要关闭此页面吗?');
				return mes;
				
			},*/
		'close':function(cmp){
			//这里防止有些组件没有destroy,必须要加上
		cmp.destroy();
		}
	},
	layout:{
		type:'border',
		padding:2
	},
	initComponent: function(){
        var me = this;
        me.sjslsum = 0;
        me.deStore = Ext.create('erp.materialInspection.store.MaterialApply');
        me.testStore=Ext.create('erp.materialInspection.store.MaterialDetail');
        me.deStore.on({
            'load':function(s,recs){
               var grid = me.down('#EditDetial');
               grid.getSelectionModel().deselectAll();
               erp.Util.gridSelect(grid,recs);
            }
        });
        me.TestProject = Ext.create('erp.materialInspection.store.TestProject');
        me.Csjgxsj = Ext.create('erp.materialInspection.model.Csjgxsj');
        me.protect = true;
        /*me.TestProject.load();*/
        Ext.apply(me,{
           tbar:[
           {text:'导入',iconCls:'page_go',itemId:'btn_lead',disabled:me.sts},
           {text:'增加',iconCls:'page_add',itemId:'btn_add',disabled:me.sts},
           {text:'删除',iconCls:'page_delete',itemId:'btn_del',disabled:me.sts},
           {text:'明细增加',iconCls:'page_add',itemId:'btn_detailadd',disabled:me.sts},
           {text:'明细删除',iconCls:'page_delete',itemId:'btn_detaildel',disabled:me.sts},
           {text:'明细复制',iconCls:'page_copy',itemId:'btn_detailcopy',disabled:me.sts},
           {text:'明细粘贴',iconCls:'page_parase',itemId:'btn_detailparse',disabled:me.sts},
           {text:'保存',iconCls:'save',itemId:'BTN_SAVE',disabled:me.sts}
           ],
	       items : [{
	           region : 'north',
	           xtype : 'form',
	           height: 180,
	           itemId : 'mainform',
	           layout: 'column',
	           defaults: {
		            labelWidth:80,padding:5,labelStyle : 'font-weight:bold'
		       },
		       items : [
		       {fieldLabel:'委托单号',xtype:'textfield',itmeId:'wtdh',name:'wtdh',columnWidth:.2,readOnly : true,fieldStyle:'background:#E6E6E6'},
		       {fieldLabel:'委托部门',xtype:'textfield',itemId:'wtlb',name:'wtlb',xtype:'comboxTree',
      			queryMode : 'local',
      			store : Ext.create('erp.materialInspection.store.WtbhTree'),
      			displayField : 'text',
      			valueField: 'nodeId',
      			allowBlank:false,
      			columnWidth:.2
      			,readOnly:me.canedt
      			,listeners:{
						   	'select':function(obj,rec){
						   		if(rec!=null){
						   			var lbbh = rec.get('nodeId');
    		                        if(!rec.get('leaf')){
    			                       Ext.Msg.alert('提示','该委托类别不是末级类别，请选择末级列别!');
    			                       me.down('#wtlb').setValue("");
    			                       return;
    	                            }
						   		}
						   	}
      			}},
		       {fieldLabel:'委托人',xtype:'textfield',itemId:'wtrm',name:'wtrm',columnWidth:.2,readOnly:me.canedt},
		       {fieldLabel:'委托日期',itemId:'wtrq',name:'wtrq',columnWidth:.2,xtype: 'datefield',readOnly:me.canedt},
		       {fieldLabel:'测试类型', xtype:'combo',
		       store:[['内部测试','内部测试'],['委外测试','委外测试']],itemId:'cslx',name:'cslx',columnWidth:.2,readOnly:me.canedt},
		       {xtype : 'helpField',	
						code : erp.DataConst.FACTORYINFO,
						forceSelection:false,
						filterParams:{gdbj:0,spbj:1},
						winParam:{gdbj:0,spbj:1},
						itemId:'csbh',
						name:'csbh',
						width:415,
						fieldLabel:'供应厂商',columnWidth:.55,readOnly:me.canedt},
		       {fieldLabel:'测试机构',
					/*emptyText:'(必填)',*/
					forceSelection:false,
					xtype : 'helpField',
					code : erp.DataConst.FACTORYINFO,
					itemId:'csjg',
					name:'csjg',columnWidth:.45,readOnly:me.canedt},
		       {fieldLabel:'测试目的',xtype:'textfield',
		       itemId:'csmd',name:'csmd',columnWidth:1,readOnly:me.canedt},
		       {fieldLabel:'备注说明',xtype:'textfield',itemId:'bzsm',name:'bzsm',columnWidth:1,readOnly:me.canedt}
		       ]
	       },{
	       	  xtype:'panel',
	       	  region : 'center',
	       	  title : '申请明细',
	       	  split : true,
	       	  layout:{
		          type:'border',
		          padding:2
	          },
	       	  items:[{
	          xtype:'grid',
	          itemId : 'EditDetial',
	          region : 'center',
	          split : true,
	          flex : 2.1,
	          selModel:Ext.create('Ext.selection.CheckboxModel'),
	          features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock: 'bottom'
			   }],
			   store : me.deStore,
			   columns : [
			   {header:'',dataIndex:'wtdh',width:50,hidden:true},
			   {header:'序号',dataIndex:'wtxh',width:50},
			   {header:'材料货号',dataIndex:'clhh',width:80},
			   {header:'材料名称',dataIndex:'clmc',width:180,field:{
			   				xtype:'commonTrigger',
		   	  	  			name:'clmc',
							itemId:'clmc',
							selModel:'MULTI',
							edtMaterialInspection:'edtMaterialInspection',
							cusConfig:{
//								type:'ContractDetail',
								field:'clmc',
								indexNum:4,
								callback:function(v,rec,recs){
									me.clmcCallback(v,rec,recs);
								}
							},
							win:'erp.view.master.purchaseDetail.window.MateCombo'
							/*win:Ext.create('erp.view.master.purchaseDetail.window.MateCombo',{
								edtMaterialInspection:'edtMaterialInspection'
							})*/
			   	  	  		/*xtype : 'helpField',
							code : erp.DataConst.MATEINFO,
							listeners:{
								change : function(o,  newValue,  oldValue,  eOpts){
									console.log(o);
									console.log(newValue);
									console.log(oldValue);
									console.log(eOpts);
								}*/
//							}
			   	}},
			   {header:'送检数量',dataIndex:'sjsl',width:80,field:{xtype: 'numberfield'},
			     summaryType: 'sum',
				 summaryRenderer: function(value, summaryData, dataIndex) {
				 me.sjslsum = value;
				 return value;
			   }},
			   {header:'合同号',dataIndex:'hth',width:80},
			   {header:'到货号',dataIndex:'dhh',width:80},
			   {header:'单位',dataIndex:'jldw',width:60},
			   {header:'来料日期',dataIndex:'llrq',width:90,xtype:'datecolumn',format:'Y-m-d'},
			   {header:'cghtyq',dataIndex:'cghtyq',hidden:true}
			   ],
			   plugins: Ext.create('Ext.grid.plugin.CellEditing', {
			   		ptype: 'cellediting',
			        destroyed:true,
			        clicksToEdit : 2,
			        autoCancel: false,
			        listeners:{
			        	edit:function(editor,con,e){
			        		var field=con.field;
			        		var rec=con.record;
			        		if(con.originalValue==con.value){
			        			return ;
			        		}
			        		
			        		switch(field){
			        			case 'clmc':
			        				if(con.originalValue==con.value){
			        					break;
			        				}
			        			break;
			        			
			        		}
			        	}			        	
			        }	
			   }),
				listeners : {
				   selectionchange : function(grid, rec) {
				      if (rec.length > 0) {
				      	console.log('selectionchange');
						console.log(rec);
				      	 //me.testStore.load({params:{wtdh:rec[0].get('wtdh'),wtxh:rec[0].get('wtxh')}});
				      	 me.testStore.filter([/*{
				      	 	property : 'wtdh',
				      	 	value : rec[0].get('wtdh')
				      	 },*/{
				      	 	property : 'wtxh',
				      	 	value : rec[0].get('wtxh')
				      	 }]);
				         /*me.testStore.filterBy(function(record){
				         	console.log(record);
				         	console.log(record.get('wtxh'));
				         	console.log(rec[0].get('wtxh'));
				            return record.get('wtxh') == rec[0].get('wtxh');
				         })*/
				         me.down('#cghtyq').setValue(rec[0].get('cghtyq'))
				      }
				   }  
				}
	         },{
	         	region : 'east',
	            flex : 3,
	            split : true,
	            layout : {type:'vbox',align:'stretch'},
	            items:[{
	            xtype : 'grid',
	            flex : 3,
	            split : true,
	            itemId : 'TestDetail', 
	            store : me.testStore,
	            selModel:Ext.create('Ext.selection.CheckboxModel'),
	            columns:[
	            {header:'序号',dataIndex:'wtsqxh',width:50},
	            {header:'小时价',dataIndex:'xsjbj',width:50,
	   	  	  				renderer:function(value){
								if(value=="true"||value=="1"){
									return '<img class="x-grid-checkcolumn x-grid-checkcolumn-checked" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
								}else {
									return '<img class="x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
								}
	   	  	  				}},
	            {header:'紧急程度',dataIndex:'jjd',width:70,
	            renderer: function(value){
	               if(value==1){
	               return '普通'
	               }else if(value==2){
	               return '紧急'
	               }else if(value==3){
	               return '特急'
	               }
	            },
	            field:{
	                xtype : 'combo',
	                store : [[1,'普通'],[2,'紧急'],[3,'特急']]
	            }},
	            {header:'测试项目',dataIndex:'csxm',width:180,editor:{
			   	  	  		xtype : 'helpField',
							code : erp.DataConst.MaterialTestPro
							}
			   	},
	            {header:'测试标准及方法',dataIndex:'csbz',width:200,editor:{
							}},
				{header:'备注说明',dataIndex:'bzsm',width:150,editor:{}},	
				{header:'测试结论',dataIndex:'jyjg',width:80},
				{header:'测试值',dataIndex:'csz',width:80},
	            {header:'测试单价',dataIndex:'csjg',width:70},
	            {header:'测试周期',dataIndex:'cszq',width:70/*,editor:{editable:me.protect}*/},
	            {header:'测试总价',dataIndex:'cszj',width:80},
	            {header:'要求交期',dataIndex:'yqjq',xtype:'datecolumn',format:'Y-m-d',
	            field:{xtype:'datefield',
		  				format:'Y.m.d H:i:s'}},
	            {header:'评审人',dataIndex:'psrm',width:70},
	            {header:'评审交期',dataIndex:'psjq',width:80,xtype:'datecolumn',format:'Y-m-d'},
	            {header:'处理人名',dataIndex:'clrm',width:70},
	            {header:'附件名称',dataIndex:'wjmc',width:90},
   	  	  	  	{header:'操作',xtype:'actioncolumn',width:70,
   	  	  	  	items:[{
   	  	  	  	   iconCls:'download',
				   tooltip:'下载/预览',
				   handler:function(grid,rowIndex,colIndex){
					 var rec = grid.getStore().getAt(rowIndex);
					 if(Ext.isEmpty(rec.get('wjlj')))
				  {
					  Ext.Msg.alert('提示','未上传，无法下载');return;
				  }
					window.open('ftp://'+tp_ftpUrl+rec.get('wjlj'), 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=no, status=no');
				} 
   	  	  	  	}]}
	            ],
			    plugins:Ext.create('Ext.grid.plugin.CellEditing', {
							        clicksToEdit : 1,
							        editable : !me.canedt,
							        autoCancel: false,
							        itemId :'cellEditing',
							        listeners : {
							           'edit':function(editor,e){
						        		var rec=e.record;
						        		if(Ext.isEmpty(e.value)){
						        			e.value=''
						        		}
						        		var form = me.down('#mainform');
						        		var record = form.getRecord();
						        		form.updateRecord(record);
						        		var cslx = record.get('cslx');
						        		var csdj = rec.get('csjg');
						        		var jjd = rec.get('jjd')
						        		console.log(jjd);
						        		console.log(cslx);
						        		csjg = record.get('csjg');
						        		console.log(csjg)
						        		if(e.value!=e.originalValue){
						        		    var csxm=rec.get('csxm');
						        		    switch(e.field){
						        		    	case 'csxm' :
						        		    	     var csbz = rec.get('csbz');
							              	     me.Csjgxsj = erp.Const.callServiceMethodSync('erp/materialInspection.act?method=getTgb',{
	                                                   	     csxm : csxm,csbz:csbz,csjg:csjg
	                                             })
	                                             console.log(me.Csjgxsj);
	                                             if(me.Csjgxsj!=null){
	                                             var csdj = me.Csjgxsj.csjg;
	                                             var xsjbj = me.Csjgxsj.xsjbj;
	                                             
	                                             rec.set('csjg',csdj);
	                                             rec.set('xsjbj',xsjbj);
	                                             var jjdxs;
	                                             jjdxs = erp.Const.callServiceMethodSync('erp/materialInspection.act?method=getJjdxs',{
	                                                   jjcd : jjd
	                                             })
	                                             if(xsjbj==0){
	                                                if(jjdxs!=0&&csdj!=0){
	                                                   rec.set('cszq',0);
	                                                   var s_cszj = jjdxs*csdj;
	                                                   rec.set('cszj',s_cszj);
	                                                }
	                                             }else{
	                                                 if(cszq==0){
	                                                   Ext.Msg.alert('提示','此测试标准价格为小时价，请输入周期！');
	                                                   return;
	                                                 }else if(jjdxs!=0&&csdj!=0){
	                                                   	  var s_cszj = jjdxs*cszq*csdj;
	                                                   	  rec.set('cszj',s_cszj);
	                                                   	    }
	                                              }
	                                              }else{
	                                                  rec.set('csjg',0);
	                                                  rec.set('cszj',0);
	                                              }      	 
						        		    	break;
						        		    	case 'jjd' :
						        		    	     var cszj = rec.get('cszj');
						        		    	     var jjdxs;
	                                                 jjdxs = erp.Const.callServiceMethodSync('erp/materialInspection.act?method=getJjdxs',{
	                                                   	    jjcd : jjd
	                                                 })
	                                                 if(!Ext.isEmpty(cszj)&&cszj!=0){
						        		    	     e.record.set('cszj',jjdxs*cszj);
	                                                 }
						        		    	break;
						        		    }
						        		}
							           },
							           'beforeedit':function(editor, e, obj){
							              var rec=e.record;
							              var csxm = rec.get('csxm');
						        		  if(Ext.isEmpty(e.value)){
						        			e.value=''
						        		  }
						        		  var form = me.down('#mainform');
						        		  var record = form.getRecord();
						        		  form.updateRecord(record);
						        		  var cslx = record.get('cslx');
						        		  console.log(cslx);
						        		  csjg = record.get('csjg');
						        		  console.log(csjg)
							              switch(e.field){
							              	     case 'csxm':
							              	     break;
							                     case 'csbz' : 
							                     if(Ext.isEmpty(csxm)){
							                     	 Ext.Msg.alert('提示','该测试项目不存在测试标准!');
						        		    	     return;
							                     }
						        		    	 var xmbh = erp.Const.callServiceMethodSync('erp/materialInspection.act?method=getXmbh',{
						        		    	     xmmc : csxm
						        		    	 })
						        		    	 if(xmbh == 0){
						        		    	      Ext.Msg.alert('提示','该测试项目不存在测试标准!');
						        		    	      return;
						        		    	 }
						        		    	 var str_csjg = '';
						        		    	 if(cslx=='委外测试'){
						        		    	    str_csjg = csjg;
						        		    	 }
						        		    	 console.log('1')
						        		    	 var win  = Ext.widget('Test_Standard',{
						        		    	     xmbh : xmbh,
						        		    	     csjg : str_csjg
						        		    	 });
						        		    	 win.down('#btn_confirm').on({
	                                                 click : function(btn){
	                                                   var win =  btn.up('window');
	                                                   var bool = false;
	                                                   var trec = win.down('#grd_TestStandard').getSelectionModel().getSelection()[0];
	                                                   if(trec.get('xmbz')!=''&&!Ext.isEmpty(trec.get('xmbz'))){
	                                                   	var s_modified=1;
	                                                   	rec.set('csbz',trec.get('xmbz'));
	                                                   	 me.Csjgxsj = erp.Const.callServiceMethodSync('erp/materialInspection.act?method=getTgb',{
	                                                   	     csxm : csxm,csbz:trec.get('xmbz'),csjg:csjg
	                                                   	 })
	                                                   	 var csdj = me.Csjgxsj.csjg;
	                                                   	 var xsjbj = me.Csjgxsj.xsjbj;
	                                                   	 console.log(csdj)
	                                                   	 console.log(xsjbj)
	                                                   	 rec.set('csjg',csdj);
	                                                   	 rec.set('xsjbj',xsjbj);
	                                                   	 if(xsjbj==0){
	                                                   	    me.protect=false;
	                                                   	 }else{
	                                                   	    rec.set('cszq',0);
	                                                   	    me.protect=true;
	                                                   	 }
	                                                   	 var jjcd = rec.get('jjd');
	                                                   	 var cszq = rec.get('cszq');
	                                                   	 var jjdxs;
	                                                   	 jjdxs = erp.Const.callServiceMethodSync('erp/materialInspection.act?method=getJjdxs',{
	                                                   	    jjcd : jjcd
	                                                   	 })
	                                                   	 if(xsjbj==0){
	                                                   	   if(jjdxs!=0&&csdj!=0){
	                                                   	       rec.set('cszq',0);
	                                                   	       var s_cszj = jjdxs*csdj;
	                                                   	       rec.set('cszj',s_cszj);
	                                                   	   }
	                                                   	 }else{
	                                                   	    if(cszq==0){
	                                                   	    Ext.Msg.alert('提示','此测试标准价格为小时价，请输入周期！');
	                                                   	    return;
	                                                   	    }else if(jjdxs!=0&&csdj!=0){
	                                                   	       var s_cszj = jjdxs*cszq*csdj;
	                                                   	       rec.set('cszj',s_cszj);
	                                                   	    }
	                                                   	 }
	                                                   	
	                                                  /* e.record.set('xmbh',rec.get('xmbh'));
	                                                  
	                                                   e.record.set('csjg',rec.get('csjg'));
	                                                   e.record.set('xmbh',rec.get('xmbh'));*/
	                                                   }
	                                                    win.close();
	                                                  }
						        		    	 })
						        		    	 win.show();
						        		    	/*var win = Ext.*/
						        		        break;
							              }
							             }
							        }
				  })
	           },{
	              xtype : 'textarea',
	              flex : 1,
	              itemId : 'cghtyq'/*, 
	              anchor: "96.7%", 
	              height: 40*//*,
	              
	              value : ''*/
	              ,
				  listeners:{
					change:function(f,n,o){
					   recs=me.down('#EditDetial').getSelectionModel().getSelection();
					   if(recs.length>0){
					       Ext.each(recs,function(rec){
					           rec.set('cghtyq',n)
					       })
					   }else{
							Ext.Msg.alert('提示','请至少选中一列');
					   }
					 }
					}
	             }]
	         }]
	       }]
         })
         me.callParent(arguments);  
    },
    clmcCallback : function(view,rec,recs){
    	var me = this;
		var grid = me.down('#EditDetial');
		var srec = grid.getSelectionModel().getSelection()[0];
		var store = grid.getStore();
		console.log(rec);
		console.log(recs);
		srec.set('clmc',rec.get('clmc'));
		srec.set('clhh',rec.get('clhh'));
		srec.set('jldw',rec.get('jldw'));		
    },
    
    loadData : function(rec,isEdit){
        var me=this;
		var form=me.down('#mainform');
		me.loadWtbmStore(rec.get('wtlb'));
		form.loadRecord(rec);
		if(isEdit){
		   /*me.store.load({
		       params : {
		          wtdh : rec.get('wtdh') 
		       }
		   });*/
		   me.testStore.load({
		       params : {
		          wtdh : rec.get('wtdh') 
		       }
		   })
			me.deStore.load({
		           params : {
		          wtdh : rec.get('wtdh') 
		       }
		   })
		  
		  /* me.testStore.filterBy(function(record){
				   return record.get('wtxh') == rec[0].get('wtxh');
			})*/
		}
		if(me.isCopy){
		 me.testStore.load({
		       params : {
		          wtdh : me.wtdh
		       }
		   ,callback:function(recs){
		   	  me.testStore.each(function(rec){
		   	       rec.set('wtdh',0);
		   	       rec.phantom =true;//表示新增
		   	  })
		   }});
			me.deStore.load({
		           params : {
		          wtdh : me.wtdh 
		       },callback:function(recs){
		   	  me.deStore.each(function(rec){
		   	       rec.set('wtdh',0);
		   	       rec.phantom =true;//表示新增
		   	  })
		   }})
		}
    },
    loadWtbmStore : function(node){
        var me = this;
        if(node!=null && node!='' && node!=0){
             var picker=me.down('#wtlb').getPicker();      
             picker.expandAll();
        }
    }
})