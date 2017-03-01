Ext.define('erp.PurchaseClearing.view.PurchaseClearingImp',{
    extend:'erp.ux.Panel',
	alias:'widget.Imp_PurchaseClearing',
	closable : true,
	/*modal:true,*/
	width : 0.75 * window.screen.width,
	height:0.8 * window.screen.height,
	title:'采购结算导入生成',
	iconCls:'page_go',
	requires : ['erp.PurchaseClearing.store.JsFydbImp',
                'erp.PurchaseClearing.store.JsRkdbImp',
	            'erp.PurchaseClearing.store.JsFydbImpBufferrd',
	            'erp.PurchaseClearing.store.JsRkdbImpBufferrd',
	            'erp.ux.SupcanGrid'
	],
	 listeners:{
		'close':function(cmp){
			//删除临时表
			erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=deleteJsrkdb',{
			   tablename : cmp.tablename,
			   tbname : cmp.tbname
			})
			cmp.destroy();
		},
		beforeclose:function(panel){
			
			//编辑界面如果有父级菜单则设置设为enable
			if(panel.mainPanel!=null){
					panel.mainPanel.enable();
			}
		},
		afterrender : function(cmp) {
			//编辑界面如果有父级菜单则设置设为disable
				if(cmp.mainPanel!=null){
					cmp.mainPanel.disable();
			}
		}
	},
	initComponent:function(){
	    var me = this;
	    me.params={csbh : me.csbh,hsbm : me.hsbm,tablename : me.tablename,
	    czy_gh:erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id};
	    me.rkStore = Ext.create('erp.PurchaseClearing.store.JsRkdbImp');
	    me.search = Ext.create('erp.PurchaseClearing.model.RkQueryParam');
	    me.rkSelStore = Ext.create('erp.PurchaseClearing.store.JsRkdbImp');
	    me.fyStore = Ext.create('erp.PurchaseClearing.store.JsFydbImp');
	    me.fySelStore = Ext.create('erp.PurchaseClearing.store.JsFydbImp');
	    me.rkSum = Ext.create('erp.PurchaseClearing.store.JsRkdbImp');
	    me.fySum = Ext.create('erp.PurchaseClearing.store.JsFydbImp');
	   /* me.rkStore.on({
	       beforeload:function(store,oper){
	          me.BeforeLoadRk();
	       }
	    })*/
	    me.fyStore.on({
	       beforeload:function(store,oper){
	         me.BeforeLoadFY();
	       }
	    })
	    var sec_bar=Ext.create('Ext.toolbar.Toolbar',{dock:'top',items: [
	    	{itemId : 'shdh',fieldLabel :'送货单号',labelWidth : 75,xtype : 'textfield'
	         ,listeners:{
	             specialkey: function(field, e){
	                 if(e.getKey() == e.ENTER){
	                      me.loadQueryRkImp();
	                 }
	             }
	         }
	    },{
            text:'查询',glyph:0xf002,
             handler: function(btn){
                 	me.loadQueryRkImp();
             }
        }/*,{
           text:'重置',
   	  	   iconCls:'refresh_backwards',
   	  	   handler:function(){
   	  	      me.down('#shdh').setValue("");
   	  	      delete me.params.shdh;
   	  	      var supcanGrid=me.down('#grd_rkd');
   	  	      var rkrecss = me.down('#grd_sel_rkd').getAllRow();
	          var recDate = "[";
		      var a=false;
		      Ext.each(rkrecss, function(rec) {
		          if(a){
		         	recDate += ",";
		          }
		          recDate += Ext.encode(rec.data);
		                a=true;
		          })
		      recDate += "]";
	          erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=beforeloadJsRkdbImpsx',{
		           recDate : recDate,tablename : me.tablename
	          })	
	          supcanGrid.load(me.params);
   	  	  }
        }*/]})
	    
	    /*Ext.apply(me.rkStore.proxy.extraParams,{
	                 csbh : me.csbh,
	                 hsbm : me.hsbm
	    })*/
	    Ext.apply(me.fyStore.proxy.extraParams,{
	                 csbh : me.csbh,
	                 tbname : me.tbname
	    })
	    Ext.apply(me,{
	        listeners:{
	    		afterrender:function(cmp){
	    			
	    		    me.fyStore.load()
	    		}
	    	},
	        dockedItems: [{
		           xtype: 'toolbar',
			       dock: 'top',
			       itemId: 'PurchaseClearingImpBar',
			       items : [
			       {text: '分组对账',itemId:'btn_fzdz'},
			       {text: '单价核查',itemId:'btn_djhc'},
			       /*{text: '全选',itemId: 'btn_selectall',handler:function(){
			               var rkgrd = me.down('#grd_rkd');
			               rkgrd.view.getSelectionModel().selectAll();
			               var store = rkgrd.getStore();
                           var len = store.getCount();
                           for(var i=0;i<len;i++){
                           	   record=store.getAt(i);
                           	   rkgrd.getSelectionModel().select(record,true);
                           }
			              
			       }},
			       {text: '全不选',itemId: 'btn_selectnone'},*/
			       {text: '拆分',itemId:'btn_split'},
			       {text: '合并',itemId:'btn_Merge'},
			       {text: '筛选',glyph:0xf002,itemId:'btn_dr_query'},
			       {text: '到货查询',itemId:'btn_ArriveQuery',handler:function(){
			                 var rec = me.down('#grd_rkd').getSelectRow();
			                 if(Ext.isEmpty(rec[0])){
			                     Ext.Msg.alert('提示','请选择一条入库单记录')
			                     return;
			                 }
			                 var win  = Ext.widget('Win_ArriveQuery',{
			                     shdh : rec[0].get('shdh'),
			                     csbh : rec[0].get('csbh')
			                 });
			                 win.show();
			       }}/*,
			       {text: '刷新',iconCls:'refresh_backwards',handler:function(){
			                 var title = me.down('tabpanel').getActiveTab().title;
			                 if(title == '入库单'){
			                 me.BeforeLoadRk();
			                 var rkrecss = me.down('#grd_sel_rkd').getAllRow();
	                         var recDate = "[";
		                     var a=false;
		                     Ext.each(rkrecss, function(rec) {
		                       if(a){
		         	           recDate += ",";
		                       }
		                     recDate += Ext.encode(rec.data);
		                     a=true;
		                     })
		                     recDate += "]";
	                         erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=beforeloadJsRkdbImpsx',{
		                     recDate : recDate,tablename : me.tablename
	                         })		
			                 me.down('#grd_rkd').load();
			                 me.rkStore.reload({params:{
	                               csbh : me.csbh,
	                               hsbm : me.hsbm
	                            }});
			                 }else if(title == '费用单'){   
	                         var rkrecs = me.fySelStore.data.items;
	                         var recordData = "[";
		                     var a=false;
		                     Ext.each(rkrecs, function(rec) {
		                     if(a){
		         	               recordData += ",";
		                     }
		                           recordData += Ext.encode(rec.data);
		                      a=true;
		                     })
		                           recordData += "]";
		                     erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=beforeloadFydbImp',{
		                          recordData : recordData,tbname:me.tbname
		                     })
			                 me.fyStore.reload({params:{
	                               csbh : me.csbh
	                             }});   
			                 }     
			        }}*/,sec_bar
			       ,
			       {text:'确认',iconCls:'accept',itemId:'btn_confirm',margin:'0 0 0 30'},
			       {text:'关闭',iconCls:'cancel',handler:function(){me.close();}}
			       ]
		    }],
		  items : [
		      {
		         xtype : 'tabpanel',
		         itemId : 'maintab',
		      items : [
		         {
		          title : '入库单',
		          itemId : 'panel_rkd',
	    		   layout:{
		           type: 'border',
		           padding : 2
		        },
	            items : [{   
	            region : 'center',	
		        xtype : 'SupcanGrid',
		        reference: 'grd_rkd',
		        itemId : 'grd_rkd',
		        flex:30,
		        mainModel:Ext.create('erp.PurchaseClearing.model.JsRkdbImp'),
			    MainColumns:me.MainColumns,
			    /*
			    features: [{
				        ftype: 'summary',
			        	dock:'bottom'
				    }],*/
				Properties:{curSelMode:'rows'},
				url:'purchaseclearing/purchaseclearing.act?method=getJsRkdbImp',
				params : me.params,
				onSupcanReady: function(id) {
					var me = this;
				    switch(id){
				    // 根据id判断，只处理与自己相关的报表控件
				    	case me.supcanId:
						var af=me.getSupcan();
						if(!af||af==null||typeof af.func!='function'){
							//延迟1秒执行，初次加载界面还没有渲染好，会报错！！
						 	var task = new Ext.util.DelayedTask(function(){
								af.func("Build",me.xml);
							    //插入一列表示是否选择
							    if(me.Properties.curSelMode){
							    	af.func("InsertCol", "0 \r\n name=checked;width='35';editType='Check';editAble=false;datatype='bool';title='选择'");
							    }
							    url=me.url;
							});
						 	task.delay(500);
						}else{
				    	af.func("Build",me.xml);
				    	//插入一列表示是否选择
				    	if(me.Properties.curSelMode){
				    		af.func("InsertCol", "0 \r\n name=checked;width='35';editType='Check';editAble=false;datatype='bool';title='选择'");
				    	}
				    	url=me.url;
						}
				    	//params=me.params||{czy_gh:'wj',gdbj:0};
				    	//me.load(params);
				    	me.load(me.params);
						break;
				    }
				},
				 onSupcanEvent: function(id, event, p1, p2, p3, p4) {
					var SupcanGrid = this;
				    var af=SupcanGrid.getSupcan();
					if(id==SupcanGrid.supcanId){
					    switch(event){
					    	case 'MenuClicked':
								if(p1==4001){
									Ext.toastErrorInfo("当前界面共有记录条数"+af.func("getRows", "")+"条!");
								}
							break;
							case 'MenuBeforePopup':
							    var enable="true";
							    if(p1 != "-1") { //鼠标点在某行
							    }
							    else { //鼠标点在标题区或空白区
							      enable="false";
							    }
							
							    //拼装成菜单串
							    var menu = "id=4001; text='记录条数'; icon=''; detail='当前界面共有记录条数"+af.func("getRows", "")+"条!';";
							    menu += "enabled=" +enable+ "\r\n";
							    af.func("AddMenu", menu);
							break;
					        case 'SelChanged':
					        
							break;
							case 'Clicked':
							  if(p1!=-1&&p2=='checked'){
							     var str =SupcanGrid.getCurrentRow();
								 var value=SupcanGrid.getCellData(p1,p2);
								 if(value==1){
										value=0;
								}else{
										value=1;
							     }
								 var strArr=str.split(',');
								 var start=parseInt(strArr[0]),
								 end=parseInt(strArr[strArr.length-1]),
									len=strArr.length;
								 ;	
								 if(len>1&&((end-start)==len-1)||((start-end)==len-1)){
										if(start>end){
											start=strArr[len-1];
											end=strArr[0];
										}
										SupcanGrid.setColCellData(p2,value,start,end);
									}else{
										SupcanGrid.setCellData(p1,p2,value);
									}
									//设置值
									var rstr=SupcanGrid.findAll("checked=1");
								}
							  var rksl = SupcanGrid.getCodeSum('rksl');
					          var rkje = SupcanGrid.getCodeSum('rkje_hx');
					          var wxjgje = SupcanGrid.getCodeSum('wxjgje');
					          var csje = SupcanGrid.getCodeSum('csje_hx');
					          var zzse = SupcanGrid.getCodeSum('zzse_hx');
					          var wbje = SupcanGrid.getCodeSum('wbje_hx');
					          var fzsl = SupcanGrid.getCodeSum('fzsl');
					          me.down('#sumrksl').setValue(Ext.util.Format.number(rksl,'0,000.00'));
					          me.down('#sumrkje').setValue(Ext.util.Format.number(rkje,'0,000.00'));
					          me.down('#sumwxjgje').setValue(wxjgje);
					          me.down('#sumcsje').setValue(Ext.util.Format.number(csje,'0,000.00'));
					          me.down('#sumzzse').setValue(Ext.util.Format.number(zzse,'0,000.00'));
					          me.down('#sumwbje').setValue(wbje);
					          me.down('#sumfzsl').setValue(fzsl);
					          Ext.apply(me.rkSum.data.rksl,rksl);
								if(p1!=-1){
									erp.Util.SearchPanel.grid=SupcanGrid;
									erp.Util.SearchPanel.cellIndex=p2;
									erp.Util.SearchPanel.value=SupcanGrid.getCellData(p1,p2);
									erp.Util.SearchPanel.type=SupcanGrid.getColProp(p2,'dataType');
								}else{
									erp.Util.SearchPanel.grid=SupcanGrid;
								}
							break;
					    }
					}
				} ,dockedItems:[{
				   xtype : 'toolbar',
				   dock : 'bottom',
				   defaults:{labelWidth:80,width:180,xtype:'textfield'},
				   items:[{fieldLabel:'合计: 入库数量:',labelWidth:110,width:210,itemId:'sumrksl'},
				          {fieldLabel:'含税金额:',labelWidth:70,itemId:'sumrkje'},
				          {fieldLabel:'加工金额:',labelWidth:70,itemId:'sumwxjgje'},
				          {fieldLabel:'除税金额:',labelWidth:70,itemId:'sumcsje'},
				          {fieldLabel:'税额:',labelWidth:50,width:160,itemId:'sumzzse'},
				          {fieldLabel:'外币金额:',labelWidth:70,itemId:'sumwbje'},
				          {fieldLabel:'辅助数量:',labelWidth:70,itemId:'sumfzsl'}
				   ]
				}]
		            },{
		            	region : 'south',
		            	flex : 23,
		            	layout : {
                         type : 'vbox',
                         align : 'stretch'
                        },
                        split:true,
		            	items : [{
              xtype:'container',
		      width : 400,
		      flex : 2,
		      align : 'center',  
		      region : 'center',
		      layout:{type:'hbox',align:'stretch',pack:'center',defaultMargins:5},
		          items:[{
		              itemId:'btn_sel',
					  xtype:'button',
					  tooltip:'选择',
					  text:'选择',
					  iconCls:'control-270',
					  listeners:{
					     click:function(but,  e,  eOpts){
					     	var supcanGrid=me.down('#grd_rkd');
					     	var dsupcanGrid=me.down('#grd_sel_rkd');
					     		var af=supcanGrid.getSupcan();
					           var saf = dsupcanGrid.getSupcan();
					           var rstr='';
					           var xml = '';
					           var recs=[];
					           rstr=supcanGrid.findAll("checked=1");
					           if(rstr.length>0){
					           xml = af.func("Export","asData \r\n row=" +rstr);
					           saf.func("load", xml+" \r\n fillmode=insert")
					           return af.func("DeleteRows","checked=1");
					           }
					      }
					    }
		          },{
                     itemId:'btn_selAll',
					 xtype:'button',
					 tooltip:'全选',
					 text:'全选',
					 iconCls:'control-double-270',
					 listeners:{
						click:function(but,  e,  eOpts){
							   var supcanGrid=me.down('#grd_rkd');
							   var dsupcanGrid=me.down('#grd_sel_rkd');
					     	
					     	   var rstr=''
							   var row = supcanGrid.getRows();
					           var af=supcanGrid.getSupcan();
					           var saf = dsupcanGrid.getSupcan();
					           var xml = af.func("Export","asData \r\n startRow = 0 \r\n endRow ="+row );
					           saf.func("load", xml+" \r\n fillmode=insert")
					           return af.func("DeleteRows","0 \r\n "+row)
						 }
					  }                
                   },{
                    itemId:'btn_unSel',
					tooltip:'取消选择',
					text:'取消选择',
					xtype:'button',
					iconCls:'control-090',
					listeners:{
						click:function(but,  e,  eOpts){
							var supcanGrid=me.down('#grd_rkd');
					     	var dsupcanGrid=me.down('#grd_sel_rkd');
					     		var af=supcanGrid.getSupcan();
					           var saf = dsupcanGrid.getSupcan();
					           var rstr='';
					           var xml = '';
					           var recs=[];
					           rstr=dsupcanGrid.findAll("checked=1");
					           xml = saf.func("Export","asData \r\n row=" +rstr);
					           af.func("load", xml+" \r\n fillmode=insert")
					           return saf.func("DeleteRows","checked=1");
						}
					}
                   },{
                    itemId:'btn_unSelAll',
					tooltip:'全不选',
					text:'全不选',
					xtype:'button',
					iconCls:'control-double-090',
					listeners:{
						click:function(but,  e,  eOpts){
							   var supcanGrid=me.down('#grd_rkd');
							   var dsupcanGrid=me.down('#grd_sel_rkd');
					     	   var rstr=''
							   var row = dsupcanGrid.getRows();
					           var af=supcanGrid.getSupcan();
					           var saf = dsupcanGrid.getSupcan();
					           var xml = saf.func("Export","asData \r\n startRow = 0 \r\n endRow ="+row );
					           af.func("load", xml+" \r\n fillmode=insert")
					           return saf.func("DeleteRows","0 \r\n "+row)
						}
					} 
                  }]   
            },{
                xtype : 'SupcanGrid',
		        reference: 'grd_sel_rkd',
		        itemId : 'grd_sel_rkd',
		        flex:23,
		        mainModel:Ext.create('erp.PurchaseClearing.model.JsRkdbImp'),
			    MainColumns:me.MainColumns,
			    /*
			    features: [{
				        ftype: 'summary',
			        	dock:'bottom'
				    }],*/
				Properties:{curSelMode:'rows'},
				url:'purchaseclearing/purchaseclearing.act?method=getJsRkdbImp',
				onSupcanReady: function(id) {
					var me = this;
				    switch(id){
				    // 根据id判断，只处理与自己相关的报表控件
				    	case me.supcanId:
						var af=me.getSupcan();
				    	af.func("Build",me.xml);
				    	//插入一列表示是否选择
				    	if(me.Properties.curSelMode){
				    		af.func("InsertCol", "0 \r\n name=checked;width='35';editType='Check';editAble=false;datatype='bool';title='选择'");
				    	}
				    	url=me.url;
				    	//params=me.params||{czy_gh:'wj',gdbj:0};
				    	//me.load(params);
						break;
				    }
				},
				 onSupcanEvent: function(id, event, p1, p2, p3, p4) {
					var SupcanGrid = this;
				    var af=SupcanGrid.getSupcan();
					if(id==SupcanGrid.supcanId){
					    switch(event){
					        case 'SelChanged':
					           /* var rksl = 0;var rkje = 0;var wxjgje = 0;
					       var csje = 0;var zzse = 0;var wbje = 0;
					       var fzsl = 0;
					       for(x in recs){
					          rksl += recs[x].get('rksl');
					          rkje += recs[x].get('rkje_hx');
					         wxjgje += recs[x].get('wxjgje');
					         csje += recs[x].get('csje_hx');
					         zzse += recs[x].get('zzse_hx');
					         wbje += recs[x].get('wbje_hx');
					         fzsl += recs[x].get('fzsl')
					       }
					       */
							break;
							case 'Clicked':
							  if(p1!=-1&&p2=='checked'){
							     var str =SupcanGrid.getCurrentRow();
								 var value=SupcanGrid.getCellData(p1,p2);
								 if(value==1){
										value=0;
								}else{
										value=1;
							     }
								 var strArr=str.split(',');
								 var start=parseInt(strArr[0]),
								 end=parseInt(strArr[strArr.length-1]),
									len=strArr.length;
								 ;	
								 if(len>1&&((end-start)==len-1)||((start-end)==len-1)){
										if(start>end){
											start=strArr[len-1];
											end=strArr[0];
										}
										SupcanGrid.setColCellData(p2,value,start,end);
									}else{
										SupcanGrid.setCellData(p1,p2,value);
									}
									//设置值
									var rstr=SupcanGrid.findAll("checked=1");
								}
								if(p1!=-1){
									erp.Util.SearchPanel.grid=SupcanGrid;
									erp.Util.SearchPanel.cellIndex=p2;
									erp.Util.SearchPanel.value=SupcanGrid.getCellData(p1,p2);
								}else{
									erp.Util.SearchPanel.grid=SupcanGrid;
								}
							break;
					    }
					}
				}}
		         ]}]
		         },{	
		          title : '费用单',
		          itemId : 'panel_fyd',
	    		   layout:{
		           type: 'border',
		           padding : 2
		          },
	    	 items : [{  
		     xtype : 'grid',
		     region : 'center',
		     itemId : 'grd_fyd',
		     overflowY:'auto',
			 overflowX:'auto',
			 split:true,
			 flex : 30,
		     selModel:Ext.create('Ext.selection.CheckboxModel'/*,{
					mode:'MULTI',
					checkOnly:true
				}*/),
		        columns : [
		      {header:'核销',width:40,dataIndex:'hxbj',renderer: erp.Util.Staterenderer/*, 
					           summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }*/},  
		      {header:'审批',width:40,dataIndex:'spbj',renderer: erp.Util.Staterenderer},  
		      {header:'分组号',width:70,dataIndex:'fzhm'},  
		      {header: '费用单号',width:80 ,dataIndex:'fydh'},
		      {header: '序号',width: 40,dataIndex:'fyxh'},
		      {header: '费用日期',width: 80,dataIndex:'fyrq',xtype:'datecolumn',format:'Y-m-d'},
		      {header: '出运编号',width: 80,dataIndex:'cybh'},
		      {header: '费用摘要',width: 220,dataIndex:'fyzy'},
		      {header: '费用性质',width: 80,dataIndex:'fyxz'},
		      {header: '核算部门',width: 100,dataIndex: 'bmmc'},
		      {header: '数量',width: 100,dataIndex:'fysl',
		                          summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:function(value, summaryData, dataIndex) {
					              	 return value;
					            }},
		      {header: '含税单价',width: 70,dataIndex:'fydj_hx'},
		      {header: '含税金额',width: 100,dataIndex:'fyje_hx',
		                          summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }},
			  {header: '税率',width:50,dataIndex: 'zzsl_hx',field:{
			   	  	  			xtype:'numberfield',
			   	  	  			maxValue:1,
			   	  	  			decimalPrecision:2},
			   	  	  		 renderer : Ext.util.Format.percentRenderer},		            
			  {header: '除税单价',width:80,dataIndex: 'csdj_hx'},		            
			  {header: '除税金额',width:80,dataIndex: 'csje_hx',
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }},		            
			  {header: '税额',width:70,dataIndex: 'zzse_hx',
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }},		            
		      {header: '币种',width: 50,dataIndex:'wbdh'},
		      {header: '汇率',width: 50,dataIndex:'wbhl',field:{}},
		      {header: '外币单价',width: 70,dataIndex:'wbdj'},
		      {header: '外币金额',width: 100,dataIndex:'wbje',
		                          summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }},
		      {header: '采购类别',width: 70,dataIndex:'cglb'},
		      {header: '供应厂商编号',width: 70,dataIndex:'csbh'},
		      {header: '供应厂商',width: 160,dataIndex:'csmc'},
		      {header: '计划号',width: 70,dataIndex:'jhh'},
		      {header: '合同号',width: 70,dataIndex:'hth'},
		      {header: '备注说明',width: 160,dataIndex:'bzsm'},
		      {header: '操作员',width: 70,dataIndex:'czym'},
		      {header: '操作时间',width: 80,dataIndex:'czsj',xtype:'datecolumn',format:'Y-m-d'},
		      {header: '锁定人',width: 70,dataIndex:'sdrm'},
		      {header: '锁定时间',width: 80,dataIndex:'sdsj',xtype:'datecolumn',format:'Y-m-d'},
		      {header: '被拆序号',width: 70,dataIndex:'cfxh'},
		      {header: '通知单号',width: 70,dataIndex:'tzdh'},
		      {header: '发票类别',width: 70,dataIndex:'fplb'},
		      {header: '发票号码',width: 70,dataIndex:'fphm'},
		      {header: '核销日期',width: 80,dataIndex:'hxrq',xtype:'datecolumn',format:'Y-m-d'}
		     ],store : me.fyStore,
			  dockedItems:[{
			    		xtype : 'pagingbar',
			    		stateId : "pagingbar"+Ext.id(),
			    		store:me.fyStore,
			    		dock:'bottom',
			    		defaultPageSize : 1000,
			    		displayInfo:true
			    	  },{
				   xtype : 'toolbar',
				   dock : 'bottom',
				   defaults:{labelWidth:80,width:180,xtype:'textfield'},
				   items:[{fieldLabel:'合计: 费用数量:',labelWidth:110,width:210,itemId:'sumfysl'},
				          {fieldLabel:'含税金额:',labelWidth:70,itemId:'sumfyje'},
				          {fieldLabel:'外币金额:',labelWidth:70,itemId:'sumwbje'}
				   ]
				}],
				listeners : {
					   'itemdblclick':function(view,rec){
					        me.fySelStore.add(rec);
					        me.fyStore.remove(rec);
					   },
				        selectionchange : function( record , isSelected , suppressEvent , commitFn ) {
				            var grid = me.down('#grd_fyd');
				            var recs = grid.getSelectionModel().getSelection();
				            var fysl = 0; var fyje = 0; var wbje = 0;
				            for(x in recs){
				               fysl += recs[x].get('fysl');
				               fyje += recs[x].get('fyje_hx');
				               wbje += recs[x].get('wbje_hx');
				            }
				            me.down('#sumfysl').setValue(fysl);
				            me.down('#sumfyje').setValue(Ext.util.Format.number(fyje,'0,000.00'));
				            me.down('#sumwbje').setValue(Ext.util.Format.number(wbje,'0,000.00'));
				        }
				    }
		   },{
		            	region : 'south',
		            	flex : 23,
		            	layout : {
                         type : 'vbox',
                         align : 'stretch'
                        },
                        split:true,
		            	items : [{
              xtype:'container',
		      width : 400,
		      align : 'center',  
		      itemId : 'fysel',
		      layout:{type:'hbox',align:'stretch',pack:'center',defaultMargins:5},
		          items:[{
		              itemId:'btn_fysel',
					  xtype:'button',
					  tooltip:'选择',
					  text:'选择',
					  iconCls:'control-270',
					  listeners:{
					     click:function(but,  e,  eOpts){
					     	recs=me.down('#grd_fyd').getSelectionModel().getSelection();
					        me.fySelStore.add(recs);
					        me.fyStore.remove(recs);
					      }
					    }
		          },{
                     itemId:'btn_fyselAll',
					 xtype:'button',
					 tooltip:'全选',
					 text:'全选',
					 iconCls:'control-double-270',
					 listeners:{
						click:function(but,  e,  eOpts){
							recs=me.fyStore.getRange();
							me.fySelStore.add(recs);
					        me.fyStore.remove(recs);
						 }
					  }                
                   },{
                    itemId:'btn_unfySel',
					tooltip:'取消选择',
					text:'取消选择',
					xtype:'button',
					iconCls:'control-090',
					listeners:{
						click:function(but,  e,  eOpts){
							recs=me.down('#fyproofimelData').getSelectionModel().getSelection();
							    me.fyStore.insert(me.fyStore.getCount(),recs);
								me.fySelStore.remove(recs);
						}
					}
                   },{
                    itemId:'btn_unfySelAll',
					tooltip:'全不选',
					text:'全不选',
					xtype:'button',
					iconCls:'control-double-090',
					listeners:{
						click:function(but,  e,  eOpts){
							recs=me.fySelStore.getRange();
							me.fyStore.insert(me.fyStore.getCount(),recs);
							me.fySelStore.removeAll();
						}
					} 
                   }]  
            },{
               xtype : 'grid',
		       itemId : 'fyproofimelData',
		       overflowY:'auto',
			   overflowX:'auto',
			   flex : 2,
			   features: [{
				        ftype: 'summary',
			        	dock:'bottom'
				    }],
			   selModel:Ext.create('Ext.selection.CheckboxModel'),
				 listeners:{
					  'itemdblclick':function(view,rec){
						me.fySelStore.remove(rec);
						me.fyStore.insert(me.fyStore.getCount(),rec);
				 }
				},
		        columns : [
		      {header:'核销',width:40,dataIndex:'hxbj',renderer: erp.Util.Staterenderer, 
					           summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }},  
		      {header:'审批',width:40,dataIndex:'spbj',renderer: erp.Util.Staterenderer},  
		      {header:'分组号',width:70,dataIndex:'fzhm'},  
		      {header: '费用单号',width:80 ,dataIndex:'fydh'},
		      {header: '序号',width: 40,dataIndex:'fyxh'},
		      {header: '费用日期',width: 80,dataIndex:'fyrq',xtype:'datecolumn',format:'Y-m-d'},
		      {header: '出运编号',width: 80,dataIndex:'cybh'},
		      {header: '费用摘要',width: 220,dataIndex:'fyzy'},
		      {header: '费用性质',width: 80,dataIndex:'fyxz'},
		      {header: '核算部门',width: 100,dataIndex: 'bmmc'},
		      {header: '数量',width: 100,dataIndex:'fysl',
		                          summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:function(value, summaryData, dataIndex) {
					              	 return value;
					            }},
		      {header: '含税单价',width: 70,dataIndex:'fydj_hx'},
		      {header: '含税金额',width: 100,dataIndex:'fyje_hx',
		                          summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }},
			  {header: '税率',width:50,dataIndex: 'zzsl_hx',field:{
			   	  	  			xtype:'numberfield',
			   	  	  			maxValue:1,
			   	  	  			decimalPrecision:2},
			   	  	  		 renderer : Ext.util.Format.percentRenderer},		            
			  {header: '除税单价',width:80,dataIndex: 'csdj_hx'},		            
			  {header: '除税金额',width:80,dataIndex: 'csje_hx',
			                      summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }},		            
			  {header: '税额',width:70,dataIndex: 'zzse_hx',
			                      summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }},		            
		      {header: '币种',width: 50,dataIndex:'wbdh'},
		      {header: '汇率',width: 50,dataIndex:'wbhl',field:{}},
		      {header: '外币单价',width: 70,dataIndex:'wbdj'},
		      {header: '外币金额',width: 100,dataIndex:'wbje',
		                          summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }},
		      {header: '采购类别',width: 70,dataIndex:'cglb'},
		      {header: '供应厂商编号',width: 70,dataIndex:'csbh'},
		      {header: '供应厂商',width: 160,dataIndex:'csmc'},
		      {header: '计划号',width: 70,dataIndex:'jhh'},
		      {header: '合同号',width: 70,dataIndex:'hth'},
		      {header: '备注说明',width: 160,dataIndex:'bzsm'},
		      {header: '操作员',width: 70,dataIndex:'czym'},
		      {header: '操作时间',width: 80,dataIndex:'czsj',xtype:'datecolumn',format:'Y-m-d'},
		      {header: '锁定人',width: 70,dataIndex:'sdrm'},
		      {header: '锁定时间',width: 80,dataIndex:'sdsj',xtype:'datecolumn',format:'Y-m-d'},
		      {header: '被拆序号',width: 70,dataIndex:'cfxh'},
		      {header: '通知单号',width: 70,dataIndex:'tzdh'},
		      {header: '发票类别',width: 70,dataIndex:'fplb'},
		      {header: '发票号码',width: 70,dataIndex:'fphm'},
		      {header: '核销日期',width: 80,dataIndex:'hxrq',xtype:'datecolumn',format:'Y-m-d'}
		     ],store : me.fySelStore
				}]}] 
		         }]
				}]/*,
		    buttons:[{text:'确认',iconCls:'accept',itemId:'btn_confirm'},{text:'关闭',iconCls:'cancel',
				handler:function(){me.close();}}]*/
	    })
	     me.callParent(arguments); 
	},
	loadQueryRkImp : function(){
	   var me = this;
	   var value = me.down('#shdh').getValue();
	   if(Ext.isEmpty(value)){
			delete me.params.shdh;
		}else{
			me.params.shdh=value;
		}
		/*var rkrecss = me.down('#grd_sel_rkd').getAllRow();
	    var recDate = "[";
		      var a=false;
		      Ext.each(rkrecss, function(rec) {
		          if(a){
		         	recDate += ",";
		          }
		          recDate += Ext.encode(rec.data);
		                a=true;
		          })
		      recDate += "]";
	   erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=beforeloadJsRkdbImpsx',{
		           recDate : recDate,tablename : me.tablename
	   })	*/
	   var supcanGrid=me.down('#grd_rkd');
	   var strWhere ='';
	   strWhere += " and ( left(shdh,len('"+value+"'))= '"+value+"')";
	   if(strWhere==''){
			supcanGrid.querywin='';
	   }else{
		    supcanGrid.querywin=strWhere;
	   }
	   supcanGrid.filterOnAll();
	   /*supcanGrid.load(me.params);*/
	}
	,BeforeLoadFY : function(){
	    var me =  this;
	    var rkrecs = me.fySelStore.data.items;
	    var recordData = "[";
		      var a=false;
		      Ext.each(rkrecs, function(rec) {
		          if(a){
		         	recordData += ",";
		          }
		          recordData += Ext.encode(rec.data);
		                a=true;
		          })
		recordData += "]";
		erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=beforeloadFydbImp',{
		           recordData : recordData
		})
	}
})