Ext.define('erp.master.purchaseCost.view.PatentImp',{
     extend : 'erp.ux.Window',
     alias : 'widget.Imp_Patent',
     modal:true,
     width : 0.75 * window.screen.width,
	 height:0.8 * window.screen.height,
     initComponent : function(){
        var me =this;
        me.store = Ext.create('erp.master.purchaseCost.store.PatentImp');
        me.selStore = Ext.create('erp.master.purchaseCost.store.PatentImp');
        me.store.load({params: {
             recordData : me.recordData
        }});
        Ext.apply(me.store.proxy.extraParams,{
	                 recordData : me.recordData
	    })
        Ext.apply(me,{
           layout:{type:'vbox',align: 'stretch'},
            items :[{
               xtype : 'grid',
               itemId : 'grdUnSelData',
               flex : 1,
               selModel:Ext.create('Ext.selection.CheckboxModel'),
               listeners:{
					'itemdblclick':function(view,rec){
						me.selStore.insert(me.selStore.getCount(),rec);
						me.store.remove(rec);
					  }
			    },
			    columns : [
			       {header : '入库日期',width : 100,dataIndex: 'rkrq',xtype:'datecolumn',format:'Y-m-d'},
			       {header : '入库号',width : 100,dataIndex: 'rkh'},
			       {header : '合同号',width : 100,dataIndex: 'hth'},
			       {header : '专利厂商编号',width : 100,dataIndex: 'zlcsbh',hidden:true},
			       {header : '专利厂商',width : 250,dataIndex: 'zlcsmc'},
			       {header : '币种',width : 80,dataIndex: 'wbdh'},
			       {header : '外币编号',width : 100,dataIndex: 'wbbh',hidden:true},
			       {header : '专利单价',width : 100,dataIndex: 'zldj'},
			       {header : '入库数量',width : 100,dataIndex: 'fzsl'},
			       {header : '专利金额',width : 100,dataIndex: 'zlje'}
			    ],store:me.store/*,
			   dockedItems:[{
				    xtype : 'pagingbar',
		            stateId : '8081d1236f3-9ddsadb7-470d-b764-dbb70c5e81b1',
				   	dock:'bottom',
				    displayInfo:true,
				    defaultPageSize : 50,
				    store:me.store
				}]*/
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
			   flex :1,
			   selModel:Ext.create('Ext.selection.CheckboxModel'),
				 listeners:{
					  'itemdblclick':function(view,rec){
						me.selStore.remove(rec);
						me.store.insert(me.store.getCount(),rec);
				 }
				}, 

			  columns : [
			       {header : '入库日期',width : 100,dataIndex: 'rkrq',xtype:'datecolumn',format:'Y-m-d'},
			       {header : '入库号',width : 100,dataIndex: 'rkh'},
			       {header : '合同号',width : 100,dataIndex: 'hth'},
			       {header : '专利厂商编号',width : 100,dataIndex: 'zlcsbh',hidden:true},
			       {header : '专利厂商',width : 250,dataIndex: 'zlcsmc'},
			       {header : '币种',width : 80,dataIndex: 'wbdh'},
			       {header : '外币编号',width : 100,dataIndex: 'wbbh',hidden:true},
			       {header : '专利单价',width : 100,dataIndex: 'zldj'},
			       {header : '入库数量',width : 100,dataIndex: 'fzsl'},
			       {header : '专利金额',width : 100,dataIndex: 'zlje'}
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