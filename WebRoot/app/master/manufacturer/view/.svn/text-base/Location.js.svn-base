Ext.define('erp.master.manufacturer.view.Location', {
	extend: 'erp.ux.Window',
	alias: 'widget.mng_location',
	iconCls: 'page_find',
	title: '厂商选择',
	frame: true,
	modal: true,
	prefix: 'csxxb.',
	width: 500,
	requires: ['erp.common.basic.view.field.HelpField', 
	           'erp.ux.CommonTrigger', 
	           'erp.ux.SearchCombobox', 
	           'erp.master.prematerial.store.Companyname', 
	           'erp.master.manufacturer.store.Viewcsyf'
	           ],
	height: 120,
	frame: true,
	resizable: false,
	initComponent: function() {
		var me = this;
		gdbj = me.gdbj;
		me.csStore = Ext.create('erp.master.prematerial.store.Companyname');
		Ext.apply(me, {
			layout: 'fit',
			overflowY: 'auto',
			items: [{
				xtype: 'form',
				frame: true,
				heigth: 50,
				layout: 'column',
				defaults: {
					padding: 5,
					xtype: 'textfield',
					labelWidth: 60,
					selectOnFocus: true,
					listeners: {
						specialkey: function(field, e) {
							if (e.getKey() == e.ENTER) {
								me.doQuery();
							}
						}
					}
				},
				//基础筛选
				items: [{
					xtype: 'tbtext',
					columnWidth: 1
				},
				//厂商名称
				{
					fieldLabel: '厂商名称',
					xtype: 'tps_searchcbo',
					name: 'csbh',
					itemId: 'search',
					/*hideTrigger:true,*/
					store: me.csStore,
					displayField: 'csmc',
					valueField: 'csbh',
					columnWidth: 1,
					listeners: {
						'change': function(obj, value) {
							if (!Ext.isEmpty(value)) {
								me.store = Ext.create('erp.master.prematerial.store.Companyname');
								me.store.loadPage(1, {
									params: {
										usePaging: true,
										search: me.down('#search').getValue()
									}
								});
							}
						},
						specialkey: function(field, e) {
							if (e.getKey() == e.ENTER) {
								me.doQuery();
							}
						}
					}
				}],
				buttons: [{
					text: '确认',
					glyph: 0xf058,
					itemId: 'btn_confirm',
					handler: me.doQuery
				},
				'->', {
					text: '关闭',
					glyph: 0xf057,
					handler: function() {
						me.close();
					}
				}]
			}]
		});
		this.callParent(arguments);
		me.down('form').loadRecord(me.rec);
	},
	doQuery: function() {
		var me = this;
		Ext.apply(me.mainstore.proxy.extraParams, 
     			{
			        gdbj:gdbj,
     				condition:me.getQueryCondition()
     			 }
     		);
     	me.mainstore.reload();
//		Ext.apply(me.mainstore.proxy.extraParams, {
//			gdbj:me.gdbj,
//			condition: me.getQueryCondition()
//		});
//		me.mainview.loadMain();
		me.close();
	},
	getQueryCondition: function() {
		var me = this;
		var condition = null;
		var form = me.down('form');
		if (form.getForm().isDirty()) {
			var rec = form.getRecord();
			form.updateRecord(rec);
			var obj = rec.getChanges();
			var arr = [];
			for (var x in obj) {
				if (!Ext.isEmpty(obj[x])) {
					if (x == 'csbh') {
						arr.push(me.prefix + "csbh = '" + obj[x] + "' ");
					}
				}
			}
			condition = arr.join(' and ');
		}
		return condition;
	}
});