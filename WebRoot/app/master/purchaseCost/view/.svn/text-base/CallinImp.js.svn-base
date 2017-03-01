Ext.define('erp.master.purchaseCost.view.CallinImp',{
     extend : 'erp.ux.Window',
     alias : 'widget.Imp_Callin',
     modal:true,
    width : 0.8 * window.screen.width,
	height:0.8 * window.screen.height,
     initComponent : function(){
        var me =this;
        me.selStore = Ext.create('erp.master.purchaseCost.store.CallinImp');
        me.store.load();
         var sec_bar=Ext.create('Ext.toolbar.Toolbar',{dock:'top',items: [{
        	itemId : 'querydbdh', fieldLabel : '调拨单号:',labelWidth : 60,xtype :'textfield'
        },{
            itemId : 'querysgtzdh',fieldLabel : '手工通知单号:',labelWidth : 80,xtype :'textfield'
        },{
            itemId : 'querycpmc',fieldLabel : '产品名称:',labelWidth : 60,xtype :'textfield'
        },{
             text:'查询',iconCls:'query',
             handler: function(btn){
             	Ext.apply(me.store.proxy.extraParams,
        		{
        			      dbdh : me.down('#querydbdh').getValue(),
                          sgtzh : me.down('#querysgtzdh').getValue(),
                          cpmc : me.down('#querycpmc').getValue()
        		})
        		me.store.load();
                   }
        },{
           text:'重置',
   	  	    iconCls:'refresh_backwards',
   	  	    handler:function(){
   	  	       me.down('#querydbdh').setValue("");
   	  	       me.down('#querysgtzdh').setValue("");
   	  	       me.down('#querycpmc').setValue("");
   	  	       delete me.store.proxy.extraParams.dbdh;
   	  	       delete me.store.proxy.extraParams.sgtzh;
   	  	       delete me.store.proxy.extraParams.cpmc;
   	  	       me.store.reload()
   	  	     }
        }
        ]})
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
			      {header: '调出仓库', width  :100 ,dataIndex: 'dcckmc'},
			      {header: '调入仓库', width  :100 ,dataIndex: 'drckmc'},
			      {header: '调拨单号', width  :100 ,dataIndex: 'dbdh'},
			      {header: '调出日期', width  :100 ,dataIndex: 'dcrq',xtype:'datecolumn',format:'Y-m-d'},
			      {header: '序号', width  :60 ,dataIndex: 'dbxh'},
			      {header: '订单号', width  :100 ,dataIndex: 'ddh'},
			      {header: '生产单号', width  :100 ,dataIndex: 'htbz'},
			      {header: '产品名称', width  :200 ,dataIndex: 'cpmc'},
			      {header: '产品编号', width  :100 ,dataIndex: 'cpbh'},
			      {header: '事物特性', width  :100 ,dataIndex: 'plmth'},
			      {header: 'Cptx1', width  :100 ,dataIndex: 'cptx1'},
			      {header: '体积', width  :80 ,dataIndex: 'wdtj'},
			      {header: '运输单价', width  :100 ,dataIndex: 'ysdj'},
			      {header: '运输金额', width  :100 ,dataIndex: 'wdje'},
			      {header: '调拨数量', width  :100 ,dataIndex: 'dbsl'},
			      {header: '调拨箱数', width  :80 ,dataIndex: 'dbxs'},
			      {header: '通知号', width  :100 ,dataIndex: 'tzh'},
			      {header: '手工通知号', width  :100 ,dataIndex: 'sgtzh'},
			      {header: '转运人', width  :100 ,dataIndex: 'zyrm'},
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
			      {header: '调出仓库', width  :100 ,dataIndex: 'dcckmc'},
			      {header: '调入仓库', width  :100 ,dataIndex: 'drckmc'},
			      {header: '调拨单号', width  :100 ,dataIndex: 'dbdh'},
			      {header: '调出日期', width  :100 ,dataIndex: 'dcrq',xtype:'datecolumn',format:'Y-m-d'},
			      {header: '序号', width  :60 ,dataIndex: 'dbxh'},
			      {header: '订单号', width  :100 ,dataIndex: 'ddh'},
			      {header: '生产单号', width  :100 ,dataIndex: 'htbz'},
			      {header: '产品名称', width  :200 ,dataIndex: 'cpmc'},
			      {header: '产品编号', width  :100 ,dataIndex: 'cpbh'},
			      {header: '事物特性', width  :100 ,dataIndex: 'plmth'},
			      {header: 'Cptx1', width  :100 ,dataIndex: 'cptx1'},
			      {header: '体积', width  :80 ,dataIndex: 'wdtj'},
			      {header: '运输单价', width  :100 ,dataIndex: 'ysdj'},
			      {header: '运输金额', width  :100 ,dataIndex: 'wdje'},
			      {header: '调拨数量', width  :100 ,dataIndex: 'dbsl'},
			      {header: '调拨箱数', width  :80 ,dataIndex: 'dbxs'},
			      {header: '通知号', width  :100 ,dataIndex: 'tzh'},
			      {header: '手工通知号', width  :100 ,dataIndex: 'sgtzh'},
			      {header: '转运人', width  :100 ,dataIndex: 'zyrm'},
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