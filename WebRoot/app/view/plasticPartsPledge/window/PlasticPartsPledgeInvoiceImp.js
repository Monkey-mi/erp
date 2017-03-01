Ext.define('erp.view.plasticPartsPledge.window.PlasticPartsPledgeInvoiceImp',{
	extend:'erp.ux.Window',
	alias:'widget.imp_PlasticPartsPledgeInvoice',
	width:800,
	title:'发票导入',
	iconCls:'page_go',
	modal:true,
	height:600,
	requires: [
		'erp.view.plasticPartsPledge.store.PlasticPartsPledgeInvoiceImp'
	],
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.view.plasticPartsPledge.store.PlasticPartsPledgeInvoiceImp');
		me.store.proxy.extraParams.csbh=me.csbh;
		if(me.fplbhms.length>0){
			me.store.proxy.extraParams.fplbhm=me.fplbhms.join(',');
		}
		me.store.load();
		me.selStore=Ext.create('erp.view.plasticPartsPledge.store.PlasticPartsPledgeInvoiceImp');
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
						me.selStore.insert(me.selStore.getCount(),rec);
						me.fplbhms.push("'"+rec.get('fplbhm')+"'");
						me.store.proxy.extraParams.fplbhm=me.fplbhms.join(',');
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
						{xtype:'textfield',fieldLabel:'发票号码',enableKeyEvents :true,itemId:'fphm',listeners:{keypress:me.onKeyup}},
						{xtype:'textfield',fieldLabel:'发票代码',enableKeyEvents :true,itemId:'fplb',listeners:{keypress:me.onKeyup}},
						{width:80,xtype:'button',iconCls:'query',text:'查询',itemId:'btn_query',handler:me.doQueryAction}
					]
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
							Ext.each(recs,function(rec){
								me.selStore.insert(me.selStore.getCount(),rec);
								me.fplbhms.push("'"+rec.get('fplbhm')+"'");
								me.store.remove(rec);
							})
							me.store.proxy.extraParams.fplbhm=me.fplbhms.join(',');
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
								me.fplbhms.push("'"+rec.get('fplbhm')+"'");
								me.store.remove(rec);
							})
							if(me.fplbhms.length>0){
								me.store.proxy.extraParams.fplbhm=me.fplbhms.join(',');
							}else{
								delete me.store.proxy.extraParams.fplbhm;
							}
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
							Ext.each(recs,function(rec){
								me.fplbhms.pop("'"+rec.get('fplbhm')+"'");
							})
							if(me.fplbhms.length>0){
								me.store.proxy.extraParams.fplbhm=me.fplbhms.join(',');
							}else{
								delete me.store.proxy.extraParams.fplbhm;
							}
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
							me.selStore.removeAll();
							me.store.add(me.selStore.getRange());
							Ext.each(me.selStore.getRange(),function(rec){
								me.fplbhms.pop("'"+rec.get('fplbhm')+"'");
							})
							if(me.fplbhms.length>0){
								me.store.proxy.extraParams.fplbhm=me.fplbhms.join(',');
							}else{
								delete me.store.proxy.extraParams.fplbhm;
							}
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
						me.fplbhms.pop("'"+rec.get('fplbhm')+"'");
						if(me.fplbhms.length>0){
							me.store.proxy.extraParams.fplbhm=me.fplbhms.join(',');
						}else{
							delete me.store.proxy.extraParams.fplbhm;
						}
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
		var fphm=me.down('#fphm').getValue();
		var fplb=me.down('#fplb').getValue();
		var search='';
		if (ddh&&ddh!=''){
			search+=" and gyfpb.fphm like '%"+fphm+"%'";
		}
		if (jhh&&jhh!=''){
			search+=" and gyfpb.fplb like '%"+fplb+"%'";
		}
		if(search==''){
			delete me.store.proxy.extraParams.search;
		}
		me.store.proxy.extraParams.search=search;
		me.store.loadPage(1);
	}
})