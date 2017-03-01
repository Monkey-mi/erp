Ext.define('erp.master.purchaseCost.view.LossImp',{
     extend : 'erp.ux.Window',
     alias : 'widget.Imp_Loss',
     modal:true,
     width : 0.75 * window.screen.width,
	 height:0.8 * window.screen.height,
     initComponent : function(){
        var me =this;
        me.selStore = Ext.create('erp.master.purchaseCost.store.OutMaterial');
        me.store.load({
        	params : {
        	   year : me.year,
        	   month : me.month
        	}
        });
        Ext.apply(me.store.proxy.extraParams,{
	                 year : me.year,
        	         month : me.month
	    })
        Ext.apply(me,{
            layout:{type:'vbox',align: 'stretch'},
            items :[{
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
						me.store.remove(rec);
					  }
			    },
			    features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock: 'bottom'
					    }],
			    columns : [
			      {header: '损耗单号', width  :100 ,dataIndex: 'shdh',
					           sumaryType: 'count',
					           summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }},
			      {header: '序号', width  : 60,dataIndex: 'shxh'},
			      {header: '记录日期', width  : 100,dataIndex: 'jlrq',xtype:'datecolumn',format:'Y-m-d'},
			      {header: '材料货号', width  : 100,dataIndex: 'clhh'},
			      {header: '材料名称', width  : 200,dataIndex: 'clmc'},
			      {header: '单位', width  : 60,dataIndex: 'jldw'},
			      {header: '损耗数量', width  : 100,dataIndex: 'shsl',
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            }},
			      {header: '已入数量', width  : 100,dataIndex: 'yrsl',
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            }},
			      {header: '未入数量', width  : 100,dataIndex: 'wrsl',
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            }},
			      {header: '损耗类别', width  : 100,dataIndex: 'shlb'},
			      {header: '厂商名称', width  : 200,dataIndex: 'csmc'},
			      {header: '厂商编号', width  : 200,dataIndex: 'csbh',hidden : true},
			      {header: '备注说明', width  : 200,dataIndex: 'bzsm'}
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
              features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock: 'bottom'
					    }],
			  columns : [
			  {header: '损耗单号', width  :100 ,dataIndex: 'shdh',
					           sumaryType: 'count',
					           summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }},
			      {header: '序号', width  : 60,dataIndex: 'shxh'},
			      {header: '记录日期', width  : 100,dataIndex: 'jlrq',xtype:'datecolumn',format:'Y-m-d'},
			      {header: '材料货号', width  : 100,dataIndex: 'clhh'},
			      {header: '材料名称', width  : 200,dataIndex: 'clmc'},
			      {header: '单位', width  : 60,dataIndex: 'jldw'},
			      {header: '损耗数量', width  : 100,dataIndex: 'shsl',
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            }},
			      {header: '已入数量', width  : 100,dataIndex: 'yrsl',
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            }},
			      {header: '未入数量', width  : 100,dataIndex: 'wrsl',
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.000') ;
					            }},
			      {header: '损耗类别', width  : 100,dataIndex: 'shlb'},
			      {header: '厂商名称', width  : 200,dataIndex: 'csmc'},
			      {header: '厂商编号', width  : 200,dataIndex: 'csbh',hidden : true},
			      {header: '备注说明', width  : 200,dataIndex: 'bzsm'}
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