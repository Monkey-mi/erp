Ext.define('erp.view.purchaseOrder.window.SalesOrderImp',{
	extend:'erp.ux.Window',
	alias:'widget.imp_SalesOrder',
//	plugins : {
//		ptype : 'FormKey'
//	},
	width:1200,
	title:'销售订单选择',
	iconCls:'page_go',
	modal:true,
	height:600,
	requires: [
		'erp.view.purchaseOrder.store.SalesOrderImp'
	],
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.view.purchaseOrder.store.SalesOrderImp');
		me.store.proxy.extraParams.csbh=me.csbh;
		me.store.load();
		me.selStore=Ext.create('erp.view.purchaseOrder.store.SalesOrderImp');
		me.on('beforeclose',function(){
			delete me.store.proxy.extraParams.search;
		})
		me.MainColumns=erp.Util.getColumns(me.store.getModel());
		Ext.apply(me,{
			layout:{type:'vbox',align: 'stretch'},
			items:[{
				xtype:'grid',
				itemId:'grdUnSelData',
				flex:1,
				selModel:Ext.create('Ext.selection.CheckboxModel'),
				listeners:{
					'itemdblclick':function(view,rec){
						me.selStore.add(rec);
						me.store.remove(rec);
					}
				},
				columns:me.MainColumns,
				store:me.store,
				dockedItems:[
					{ xtype:'toolbar',
					dock:'top',
					defaults:{labelWidth:60,xtype:'textfield'},
					items:[
						{xtype:'textfield',fieldLabel:'订单号',Width:'160',enableKeyEvents :true,itemId:'ddh',listeners:{keypress:me.onKeyup}},
						{xtype:'textfield',fieldLabel:'生产单号',Width:'160',enableKeyEvents :true,itemId:'scdh',listeners:{keypress:me.onKeyup}},
							{maxWidth:80,xtype:'button',iconCls:'query',text:'查询',itemId:'btn_query',handler:me.doQueryAction}
					]
					},{
			    		xtype : 'pagingbar',
                        stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
			    		store:me.store,
			    		dock:'bottom',
			    		defaultPageSize:200,
			    		displayInfo:true
			    	  }]
			},{
				xtype:'container',
				width:40,
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
				},
				{
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
				},
				{
					itemId:'btn_unSel',
					tooltip:'取消选择',
					text:'取消选择',
					xtype:'button',
					iconCls:'control-090',
					listeners:{
						click:function(but,  e,  eOpts){
							recs=me.down('#grdSelData').getSelectionModel().getSelection();
							me.selStore.remove(recs);
							me.store.add(recs);
						}
					}
				},
				{
					itemId:'btn_unSelAll',
					tooltip:'全不选',
					text:'全不选',
					xtype:'button',
					iconCls:'control-double-090',
					listeners:{
						click:function(but,  e,  eOpts){
							recs=me.selStore.removeAll();
							me.store.add(me.selStore.getRange());
						}
					}
					
				}]
			},{
				xtype:'grid',
				itemId:'grdSelData',
				flex:1,
				selModel:Ext.create('Ext.selection.CheckboxModel'),
				listeners:{
					'itemdblclick':function(view,rec){
						me.selStore.remove(rec);
						me.store.add(rec);
					}
				},
				columns:me.MainColumns,
				store:me.selStore
			}],
			buttons:[{text:'确认',iconCls:'accept',itemId:'btn_confirm'},{text:'关闭',iconCls:'cancel',
				handler:function(){me.close();}
			}]
		});
		me.callParent(arguments);
	},
	onKeyup:function(field,e){
		var me=this.up('window');
			if(e.getKey()==e.ENTER){
				me.doQueryAction();
			}
	},
	doQueryAction:function(){
		var me=this.up('window');
		if(me==null){
			me=this;
		}
		var ddh=me.down('#ddh').getValue();
		var scdh=me.down('#scdh').getValue();
		var search='';
		if (ddh&&ddh!=''){
			search+=" and ltrim(rtrim(ddmxb.ddbh))+'-'+ltrim(rtrim(ddmxb.ddxh)) like '%"+ddh+"%'";
		}
		if (scdh&&scdh!=''){
			search+=" and xsddb.htbz like '%"+scdh+"%'";
		}
		if(search==''){
			delete me.store.proxy.extraParams.search;
		}
		me.store.proxy.extraParams.search=search;
		me.store.loadPage(1);
	}
})