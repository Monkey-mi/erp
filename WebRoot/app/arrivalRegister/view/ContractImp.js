Ext.define('erp.arrivalRegister.view.ContractImp',{
     extend : 'erp.ux.Window',
     alias : 'widget.Imp_Contract',
     requires:[],
     /*title : '合同导入'*/
     modal:true,
     width:1050,
     height: 0.7 * window.screen.height,
     listeners:{
		   'close':function(cmp){
			cmp.destroy();
		   }
	     },
     initComponent : function(){
         var me =this;
         /*me.htStore = Ext.create('erp.PurchaseClearing.store.htStore')*/
         me.selStore = Ext.create('erp.arrivalRegister.store.ContractImp');
         me.htStore.load({
         	  params:{hsbm : me.hsbm,
         	          csbh : me.csbh
         	  }})
         var sec_bar=Ext.create('Ext.toolbar.Toolbar',{dock:'top',items:[{
            itemId : 'Queryjhh', fieldLabel :'计划号 :',labelWidth : 60,
            xtype :'textfield'
         },{
            itemId: 'Queryhth',fieldLabel : '合同号 :',labelWidth : 60,
            xtype : 'textfield'
         },{
            itemId: 'Queryclmc',fieldLabel : '材料名称 :',labelWidth : 80,
            xtype : 'textfield'
         },{
            text:'查询',iconCls:'query',
             handler: function(btn){
                me.htStore.loadPage(1,{
                 params:{
                 	hth : me.down('#Queryhth').getValue(),
                 	jhh : me.down('#Queryjhh').getValue(),
                 	search : me.down('#Queryclmc').getValue(),
                 	hsbm : me.hsbm,
         	        csbh : me.csbh
                 } 
                })
             }
         },{
           text:'重置',
   	  	   iconCls:'refresh_backwards',
   	  	   handler:function(){
   	  	      me.down('#Queryhth').setValue("");
   	  	      me.down('#Queryjhh').setValue("");
   	  	      me.down('#Queryclmc').setValue("");
   	  	      me.htStore.reload({
         	  params:{hsbm : me.hsbm,
         	          csbh : me.csbh
         	  }})
   	  	   }
         }
         ]}); 	  
         Ext.apply(me,{
            layout:{type:'vbox',align: 'stretch'},
            tbar:[
            
            {text: '汇总入库',itemId:'btn_sum'},sec_bar
            ],
                   items:[{
                   xtype : 'grid',
                   itemId : 'grdUnSelData',
                   flex:1,
                   overflowY:'auto',
			       overflowX:'auto',
			       height : 400,
                   selModel:Ext.create('Ext.selection.CheckboxModel'),
                   listeners:{
					'itemdblclick':function(view,rec){
						me.selStore.insert(me.selStore.getCount(),rec);
						me.htStore.remove(rec);
					  }
				   },
				   features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock: 'bottom'
					    }], 
				   columns : [
				     {header: '计划号',dataIndex: 'jhh',width:65,
					           sumaryType: 'count',
					           summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }},
				     {header: '主计划号',dataIndex: 'zjhh',width:65},
				     {header: '上线日期',dataIndex: 'sxrq',width:80,xtype:'datecolumn',format:'Y-m-d'},
				     {header: '物控交期',dataIndex: 'wkjq',width:80,xtype:'datecolumn',format:'Y-m-d'},
				     {header: '合同号',dataIndex: 'hth',width:80},
				     {header: '供应厂商',dataIndex: 'csmc',width:200},
				     {header: '厂商编号',dataIndex: 'csbh',width:200,hidden:true},
				     {header: '材料货号',dataIndex: 'clhh',width:65},
				     {header: '材料名称',dataIndex: 'clmc',width:200},
				     {header: '材料特性1',dataIndex: 'cltx1',width:100},
				     {header: '单位',dataIndex: 'jldw',width:50},
				     {header: '采购数量',dataIndex: 'cgsl',width:80,
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            }},
				     {header: '已到数量',dataIndex: 'dhrk',width:80,
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            }},
				     {header: '未到数量',dataIndex: 'wdsl',width:80,
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }},
				     {header: '产品名称',dataIndex: 'cpmc',width:200},
				     {header: '主产品名称',dataIndex: 'zcpmc',width:130},
				     {header: '客户型号',dataIndex: 'khxh',width:100},
				     {header: '生产单号',dataIndex: 'jhbz',width:100},
				     {header: '备注说明',dataIndex: 'bzsm',width:200}
				   ],store:me.htStore,
				   	dockedItems:[{
				    xtype : 'pagingbar',
		            stateId : '8081d1236f3-9ddsadb7-470d-b764-dbb70c5e81b1',
				   	dock:'bottom',
				    displayInfo:true,
				    defaultPageSize : 50,
				    store:me.htStore
				}]
                },{
                   xtype:'container',
		           width : 400,
		           align : 'center',  
		           layout:{type:'hbox',align:'stretch',pack:'center',defaultMargins:5},
                   items:[{
                   	  itemIditemId:'btn_sel',
					  xtype:'button',
					  tooltip:'选择',
					  text:'选择',
					  iconCls:'control-270',
					  listeners:{
					     click:function(but,  e,  eOpts){
							recs=me.down('#grdUnSelData').getSelectionModel().getSelection();
							if(recs.length!=1){
							for(var i=0;i<recs.length-1;i++){
							  if(recs[i].get('csbh')!=recs[i+1].get('csbh')){
							      Ext.Msg.alert('提示','必须选中相同厂商的合同！');
							      return
							  }
							}
							}
							me.selStore.add(recs);
					        me.htStore.remove(recs);
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
							recs=me.htStore.getRange();
							for(var i=0;i<recs.length-1;i++){
							  if(recs[i].get('csbh')!=recs[i+1].get('csbh')){
							      Ext.Msg.alert('提示','必须选中相同厂商的合同！');
							      return
							  }
							}
							me.selStore.add(recs);
					        me.htStore.remove(recs);
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
							recs=me.down('#proofimelData').getSelectionModel().getSelection();
							    me.htStore.insert(me.htStore.getCount(),recs);
								me.selStore.remove(recs);
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
							recs=me.selStore.getRange();
							me.htStore.insert(me.htStore.getCount(),recs);
							me.selStore.removeAll();
						}
					} 
                   }]
		           },{
		              xtype : 'grid',
		              itemId : 'proofimelData',
		              overflowY:'auto',
				      overflowX:'auto',
				      flex : 1,
				      selModel:Ext.create('Ext.selection.CheckboxModel'),
				       listeners:{
					  'itemdblclick':function(view,rec){
						me.selStore.remove(rec);
						me.htStore.insert(me.htStore.getCount(),rec);
					   }
				     }, 
				      features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock: 'bottom'
					    }], 
				     columns:[
				     {header: '计划号',dataIndex: 'jhh',width:65,
					           sumaryType: 'count',
					           summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }},
				     {header: '主计划号',dataIndex: 'zjhh',width:65},
				     {header: '上线日期',dataIndex: 'sxrq',width:80,xtype:'datecolumn',format:'Y-m-d'},
				     {header: '物控交期',dataIndex: 'wkjq',width:80,xtype:'datecolumn',format:'Y-m-d'},
				     {header: '合同号',dataIndex: 'hth',width:80},
				     {header: '供应厂商',dataIndex: 'csmc',width:200},
				     {header: '厂商编号',dataIndex: 'csbh',width:200,hidden:true},
				     {header: '材料货号',dataIndex: 'clhh',width:65},
				     {header: '材料名称',dataIndex: 'clmc',width:200},
				     {header: '材料特性1',dataIndex: 'cltx1',width:100},
				     {header: '单位',dataIndex: 'jldw',width:50},
				     {header: '采购数量',dataIndex: 'cgsl',width:80,
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            }},
				     {header: '已到数量',dataIndex: 'dhrk',width:80,
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            }},
				     {header: '未到数量',dataIndex: 'wdsl',width:80,
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }},
				     {header: '产品名称',dataIndex: 'cpmc',width:200},
				     {header: '主产品名称',dataIndex: 'zcpmc',width:130},
				     {header: '客户型号',dataIndex: 'khxh',width:100},
				     {header: '生产单号',dataIndex: 'jhbz',width:100},
				     {header: '备注说明',dataIndex: 'bzsm',width:200}
				     ],store : me.selStore
		           }
                ],
                buttons:[{text:'确认',iconCls:'accept',itemId:'btn_confirm'},
                	{text:'关闭',iconCls:'cancel',
				handler:function(){me.close();}}]
         })
          me.callParent(arguments); 
     }
})