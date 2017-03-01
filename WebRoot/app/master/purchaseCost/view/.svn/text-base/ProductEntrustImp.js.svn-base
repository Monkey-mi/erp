Ext.define('erp.master.purchaseCost.view.ProductEntrustImp',{
     extend : 'erp.ux.Window',
     alias : 'widget.Imp_ProductEntrust',
     modal:true,
     width : 0.75 * window.screen.width,
	 height:0.8 * window.screen.height,
     initComponent : function(){
        var me =this;
        me.selStore = Ext.create('erp.master.purchaseCost.store.ProductEntrustImp');
        me.store.load({
                params : {
                    qsrq : me.qsrq,
                    jzrq : me.jzrq
                 }
         })
        var sec_bar=Ext.create('Ext.toolbar.Toolbar',{dock:'top',items: [{
            itemId : 'querywth',fieldLabel :'委托号:',labelWidth : 60,xtype :'textfield'
        },{
            itemId : 'querycpmc',fieldLabel : '材料名称',labelWidth : 60,xtype :'textfield'
        },{
            text:'查询',iconCls:'query',
             handler: function(btn){
                 	Ext.apply(me.store.proxy.extraParams,
        		     {
                          wth : me.down('#querywth').getValue(),
                          cpmc : me.down('#querycpmc').getValue() 
                      })
                      me.store.load();
             }
        },{
           text:'重置',
   	  	   iconCls:'refresh_backwards',
   	  	   handler:function(){
   	  	      me.down('#querywth').setValue("");
   	  	      me.down('#querycpmc').setValue("");
   	  	      delete me.store.proxy.extraParams.wth;
   	  	      delete me.store.proxy.extraParams.cpmc;
   	  	      me.store.reload()
   	  	  }
        }]})
        Ext.apply(me.store.proxy.extraParams,{
	                 qsrq : me.qsrq,
                     jzrq : me.jzrq
	    })
        Ext.apply(me,{
            layout:{type:'vbox',align: 'stretch'},
            tbar : sec_bar,
            items :[{
               xtype : 'grid',
               itemId : 'grdUnSelData',
               flex : 1,
               overflowY:'auto',
			   overflowX:'auto',
			   height : 400,
               selModel:Ext.create('Ext.selection.CheckboxModel'),
               listeners:{
					'itemdblclick':function(view,rec){
						me.selStore.insert(me.selStore.getCount(),rec);
						me.store.remove(rec);
					  }
			    },
			    features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock: 'bottom'
					    }],
			    columns : [
			      {header: '委托号', width  :100 ,dataIndex: 'wth',
					           sumaryType: 'count',
					           summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }},
			      {header: '委托类别', width  :100 ,dataIndex: 'wtlb'},
			      {header: '委托人', width  :100 ,dataIndex: 'wtrm'},
			      {header: '委托日期', width  :100 ,dataIndex: 'wtrq',xtype:'datecolumn',format:'Y-m-d'},
			      {header: '客户名称', width  :180 ,dataIndex: 'khmc'},
			      {header: '测试机构', width  :150 ,dataIndex: 'csjg'},
			      {header: '产品编号', width  :100 ,dataIndex: 'cpbh'},
			      {header: '产品名称', width  :200 ,dataIndex: 'cpmc'},
			      {header: '送检数量', width  :100 ,dataIndex: 'sjsl',
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }},
			      {header: '委托单价', width  :100 ,dataIndex: 'wtdj'},
			      {header: '委托金额', width  :100 ,dataIndex: 'wtje',
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            }},
			      {header: '单位', width  :100 ,dataIndex: 'jldw'},
			      {header: '送检号', width  :100 ,dataIndex: 'sjh'},
			      {header: '订单号', width  :100 ,dataIndex: 'ddh'},
			      {header: '测试目的', width  :150 ,dataIndex: 'csmd'},
			      {header: '备注说明', width  :150 ,dataIndex: 'bzsm'}
			    ],store:me.store,
			   dockedItems:[{
				    xtype : 'pagingbar',
		            stateId : '8081d1236f3-9ddsadb7-470d-b764-dbb70c5e81b1',
				   	dock:'bottom',
				    displayInfo:true,
				    defaultPageSize : 50,
				    store:me.store
				}]
		     },{
              xtype:'container',
		      width : 400,
		      align : 'center',  
		      layout:{type:'hbox',align:'stretch',pack:'center',defaultMargins:5},
		          items:[{
		              itemId:'btn_sel',
					  xtype:'button',
					  tooltip:'选择',
					  text:'选择',
					  iconCls:'control-270',
					  listeners:{
					     click:function(but,  e,  eOpts){
					     	recs=me.down('#grdUnSelData').getSelectionModel().getSelection();
					        me.selStore.add(recs);
					        me.store.remove(recs);
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
							recs=me.store.getRange();
							me.selStore.add(recs);
					        me.store.remove(recs);
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
							    me.store.insert(me.store.getCount(),recs);
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
							me.store.insert(me.store.getCount(),recs);
							me.store.reload();
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
						me.store.insert(me.store.getCount(),rec);
				 }
				}, 

			  columns : [
			    	 {header: '委托号', width  :100 ,dataIndex: 'wth',
					           sumaryType: 'count',
					           summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }},
			      {header: '委托类别', width  :100 ,dataIndex: 'wtlb'},
			      {header: '委托人', width  :100 ,dataIndex: 'wtrm'},
			      {header: '委托日期', width  :100 ,dataIndex: 'wtrq',xtype:'datecolumn',format:'Y-m-d'},
			      {header: '客户名称', width  :180 ,dataIndex: 'khmc'},
			      {header: '测试机构', width  :150 ,dataIndex: 'csjg'},
			      {header: '产品编号', width  :100 ,dataIndex: 'cpbh'},
			      {header: '产品名称', width  :200 ,dataIndex: 'cpmc'},
			      {header: '送检数量', width  :100 ,dataIndex: 'sjsl',
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }},
			      {header: '委托单价', width  :100 ,dataIndex: 'wtdj'},
			      {header: '委托金额', width  :100 ,dataIndex: 'wtje',
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            }},
			      {header: '单位', width  :100 ,dataIndex: 'jldw'},
			      {header: '送检号', width  :100 ,dataIndex: 'sjh'},
			      {header: '订单号', width  :100 ,dataIndex: 'ddh'},
			      {header: '测试目的', width  :150 ,dataIndex: 'csmd'},
			      {header: '备注说明', width  :150 ,dataIndex: 'bzsm'}
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