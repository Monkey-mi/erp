Ext.define('erp.view.master.caterialPriceApproval.window.CompanyImp',{
	extend:'erp.ux.Window',
	alias:'widget.imp_Company',
	width:600,
	title:'厂商导入',
	iconCls:'page_go',
	height:600,
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.view.master.company.store.CompanyShow');
		me.store.load();
		me.companyColumns=erp.Util.getColumns(me.store.getModel());
		me.selStore=Ext.create('erp.view.master.company.store.CompanyShow');
		Ext.apply(me,{
			layout:{type:'vbox',align: 'stretch'},
			items:[{
				xtype:'grid',
				itemId:'grdUnSelData',
				flex:1,
				selModel:Ext.create('Ext.selection.CheckboxModel'),
				listeners:{
					'itemdblclick':function(view,rec){
						me.selStore.insert(me.selStore.getCount(),rec);
						me.store.remove(rec);
					}
				},
				columns:me.companyColumns,
				store:me.store,
				dockedItems:[
					{
					xtype:'toolbar',
					dock:'top',
					defaults:{padding:'0 5 0 0',labelWidth:60,flex:1},
					items:[{flex:2,xtype:'textfield',fieldLabel:'厂商名称',enableKeyEvents :true,itemId:'query',listeners:{keyup:me.onKeyup}},
					'->',{xtype:'button',iconCls:'query',text:'查询',width:80,itemId:'btn_query',height:25
						,handler:function(){
							me.doSearch();
						}
					}]
					},{
			    		xtype : 'pagingbar',
                        stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
			    		store:me.store,
			    		dock:'bottom',
			    		displayInfo:true
			    	  }]
			},{
				xtype:'container',
				width:40,
				layout:{type:'hbox',align:'stretch',pack:'center'},
				defaults:{
					margin:'0 5 0 5'
				},
				items:[{
					itemId:'btn_sel',
					xtype:'button',
					tooltip:'选择',
					text:'选择',
					iconCls:'control-270',
					listeners:{
						click:function(but,  e,  eOpts){
							recs=me.down('#grdUnSelData').getSelectionModel().getSelection();
							Ext.each(recs,function(rec){
								me.selStore.insert(me.selStore.getCount(),rec);
								me.store.remove(rec);
							})
							
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
							Ext.each(recs,function(rec){
								me.selStore.insert(me.selStore.getCount(),rec);
								me.store.remove(rec);
							})
							
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
							var recs=me.selStore.getRange();
							me.selStore.removeAll();
							me.store.add(recs);
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
				columns:me.companyColumns,
				store:me.selStore
			}],
			buttons:[{text:'确认',iconCls:'accept',itemId:'btn_confirm'},{text:'关闭',iconCls:'cancel',
				handler:function(){me.close();}
			}]
		});
		me.callParent(arguments);
	},
	doSearch:function(){
		var mr=this;
		var query=me.down('#query').getValue();
		if (query){
			me.store.proxy.extraParams.query=query;
		}else{
			delete me.store.proxy.extraParams.query
		}
		me.store.loadPage(1);
	},
	onKeyup:function(field,e){
			if(e.getKey()==e.ENTER){
				var me=this.up('window');
				me.doSearch();
			}
	}
})