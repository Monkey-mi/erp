Ext.define('erp.master.purchaseCost.view.LoadingCostsImp',{
     extend : 'erp.ux.Window',
     alias : 'widget.Imp_LoadingCosts',
     modal:true,
    width : 0.75 * window.screen.width,
	height:0.8 * window.screen.height,
     initComponent : function(){
        var me =this;
        me.selStore = Ext.create('erp.master.purchaseCost.store.LoadingCostsImp');
        me.store.load();
        var sec_bar=Ext.create('Ext.toolbar.Toolbar',{dock:'top',items: [{
        	itemId : 'queryzgh', fieldLabel : '装柜号:',labelWidth : 60,xtype :'textfield'
        },{
            itemId : 'queryzyrq',fieldLabel : '装运日期:',labelWidth : 80,xtype :'datefield'
        },{
            itemId : 'queryjzrq',fieldLabel : '至:',labelWidth : 60,xtype :'datefield'
        },{
             text:'查询',iconCls:'query',
             handler: function(btn){
             	Ext.apply(me.store.proxy.extraParams,
        		{
        			      zgh : me.down('#queryzgh').getValue(),
                          qsrq : me.down('#queryzyrq').getValue(),
                          jzrq : me.down('#queryjzrq').getValue()
        		})
        		me.store.load();
                   }
        },{
           text:'重置',
   	  	    iconCls:'refresh_backwards',
   	  	    handler:function(){
   	  	       me.down('#queryzgh').setValue("");
   	  	       me.down('#queryzyrq').setValue("");
   	  	       me.down('#queryjzrq').setValue("");
   	  	       delete me.store.proxy.extraParams.zgh;
   	  	       delete me.store.proxy.extraParams.qsrq;
   	  	       delete me.store.proxy.extraParams.jzrq;
   	  	       me.store.reload();
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
			      {header: '装柜号', width  :100 ,dataIndex: 'zgh',
					           sumaryType: 'count',
					           summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }},
			      {header: '序号', width  :100 ,dataIndex: 'fyxh'},
			      {header: '装运日期', width  :100 ,dataIndex: 'zysj',xtype:'datecolumn',format:'Y-m-d'},
			      {header: '装柜方式', width  :100 ,dataIndex: 'zgfs'},
			      {header: '集装箱型', width  :100 ,dataIndex: 'jzxx'},
			      {header: '拖柜日期', width  :100 ,dataIndex: 'tgrq',xtype:'datecolumn',format:'Y-m-d'},
			      {header: '装柜车队', width  :200 ,dataIndex: 'csmc'},
			      {header: '装柜体积', width  :100 ,dataIndex: 'zgtj',
		                        summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:function(value, summaryData, dataIndex) {
					              	 return value;
					            }},
			      {header: '已导体积', width  :100 ,dataIndex: 'ydtj',
		                        summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:function(value, summaryData, dataIndex) {
					              	 return value;
					            }},
			      {header: '未导体积', width  :100 ,dataIndex: 'wdtj',
		                        summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:function(value, summaryData, dataIndex) {
					              	 return value;
					            }},
			      {header: '装柜费用', width  :100 ,dataIndex: 'zgfy',
		                        summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:function(value, summaryData, dataIndex) {
					              	 return value;
					            }},
			      {header: '已导费用', width  :100 ,dataIndex: 'ydfy',
		                        summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:function(value, summaryData, dataIndex) {
					              	 return value;
					            }},
			      {header: '未导费用', width  :100 ,dataIndex: 'wdfy',
		                        summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:function(value, summaryData, dataIndex) {
					              	 return value;
					            }}
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
               flex : 1,
		       itemId : 'proofimelData',
		       overflowY:'auto',
			   overflowX:'auto',
			   selModel:Ext.create('Ext.selection.CheckboxModel'),
				 listeners:{
					  'itemdblclick':function(view,rec){
						me.selStore.remove(rec);
						me.store.insert(me.store.getCount(),rec);
				 }
				}, 
 
			  columns : [
			   {header: '装柜号', width  :100 ,dataIndex: 'zgh',
					           sumaryType: 'count',
					           summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }},
			      {header: '序号', width  :100 ,dataIndex: 'fyxh'},
			      {header: '装运日期', width  :100 ,dataIndex: 'zysj',xtype:'datecolumn',format:'Y-m-d'},
			      {header: '装柜方式', width  :100 ,dataIndex: 'zgfs'},
			      {header: '集装箱型', width  :100 ,dataIndex: 'jzxx'},
			      {header: '拖柜日期', width  :100 ,dataIndex: 'tgrq',xtype:'datecolumn',format:'Y-m-d'},
			      {header: '装柜车队', width  :200 ,dataIndex: 'csmc'},
			      {header: '装柜体积', width  :100 ,dataIndex: 'zgtj',
		                        summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:function(value, summaryData, dataIndex) {
					              	 return value;
					            }},
			      {header: '已导体积', width  :100 ,dataIndex: 'ydtj',
		                        summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:function(value, summaryData, dataIndex) {
					              	 return value;
					            }},
			      {header: '未导体积', width  :100 ,dataIndex: 'wdtj',
		                        summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:function(value, summaryData, dataIndex) {
					              	 return value;
					            }},
			      {header: '装柜费用', width  :100 ,dataIndex: 'zgfy',
		                        summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:function(value, summaryData, dataIndex) {
					              	 return value;
					            }},
			      {header: '已导费用', width  :100 ,dataIndex: 'ydfy',
		                        summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:function(value, summaryData, dataIndex) {
					              	 return value;
					            }},
			      {header: '未导费用', width  :100 ,dataIndex: 'wdfy',
		                        summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:function(value, summaryData, dataIndex) {
					              	 return value;
					            }}
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