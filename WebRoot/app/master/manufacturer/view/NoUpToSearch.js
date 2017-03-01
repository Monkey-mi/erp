Ext.define('erp.master.manufacturer.view.NoUpToSearch', {
	extend: 'erp.ux.Window',
	alias: 'widget.NoUpTo_Search',
	iconCls: 'page_find',
	title: '筛选条件',
	frame: true,
	modal: true,
	width: 500,
	requires: ['erp.common.basic.view.field.HelpField', 
	           'erp.ux.CommonTrigger', 
	           'erp.ux.SearchCombobox', 
	           'erp.master.prematerial.store.Companyname', 
	           'erp.master.manufacturer.store.NoUpInStorage', 
	           'erp.master.manufacturer.store.NoUpPayment', 
	           'erp.master.manufacturer.store.Ckmcb_yl'],
	height: 400,
	frame: true,
	resizable: false,
	initComponent: function() {
		var me = this;
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
				items: [{
					xtype: 'tbtext',
					text: '基础筛选',
					columnWidth: 1
				},
				{
					boxLabel: '全部记录',
					name: 'checkbox_qbjl',
					inputValue: '1',
					padding: '0 0 0 5',
					itemId: 'checkbox_qbjl',
					xtype: 'checkbox',
					columnWidth: 1,
					listeners: {
						change: function(form, newValue, oldValue, eOpts) {
							if (newValue == true) {
								me.down('#checkbox_rkdh').setValue(false);
								me.down('#checkbox_rkrq').setValue(false);
								me.down('#checkbox_clmc').setValue(false);
								me.down('#checkbox_wwbj').setValue(false);
								me.down('#checkbox_ckbh').setValue(false);
								me.down('#checkbox_wbbh').setValue(false);
							}
						}
					}
				},
				{
					name: 'checkbox_rkdh',
					itemId: 'checkbox_rkdh',
					xtype: 'checkbox',
					columnWidth: 0.1
				},
				{
					fieldLabel: '入库单号',
					name: 'rkdh1',
					xtype: 'numberfield',
					columnWidth: 0.52,
					listeners: {
						'change': function(obj, value) {
							me.down('#rkdh2').setValue(value);
							if (!Ext.isEmpty(value)) {
								me.down('#checkbox_rkdh').setValue(true);
							}
						},
						specialkey: function(field, e) {
							if (e.getKey() == e.ENTER) {
								me.doQuery();
							}
						}
					}
				},
				{
					itemId: 'rkdh2',
					name: 'rkdh2',
					xtype: 'numberfield',
					fieldLabel: '至',
					labelWidth: 20,
					columnWidth: 0.38,
					listeners: {
						specialkey: function(field, e) {
							if (e.getKey() == e.ENTER) {
								me.doQuery();
							}
						}
					}
				},
				{
					name: 'checkbox_rkrq',
					itemId: 'checkbox_rkrq',
					xtype: 'checkbox',
					columnWidth: .1
				},
				{
					fieldLabel: '入库日期',
					name: 'rkrq1',
					xtype: 'datefield',
					columnWidth: .52,
					listeners: {
						'change': function(obj, value) {
							if (!Ext.isEmpty(value)) {
								me.down('#checkbox_rkrq').setValue(true);
							}
						},
						specialkey: function(field, e) {
							if (e.getKey() == e.ENTER) {
								me.doQuery();
							}
						}
					}
				},
				{
					fieldLabel: '至',
					name: 'rkrq2',
					labelWidth: 20,
					xtype: 'datefield',
					columnWidth: .38
				},
				{
					name: 'checkbox_clmc',
					itemId: 'checkbox_clmc',
					xtype: 'checkbox',
					columnWidth: 0.1
				},
				{
					xtype: 'tbtext',
					text: '扩展筛选',
					columnWidth: 1
				},
				{
					name: 'checkbox_wwbj',
					itemId: 'checkbox_wwbj',
					xtype: 'checkbox',
					columnWidth: 0.1
				},
				{
					fieldLabel: '核销未完',
					xtype: 'fieldcontainer',
					columnWidth: 0.9,
					defaultType: 'radiofield',
					defaults: {
						flex: 1
					},
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [{
						checked: true,
						name: 'wwbj',
						boxLabel: '是',
						inputValue: 1,
						listeners: {
							'change': function(obj, value) {
								if (!Ext.isEmpty(value)) {
									me.down('#checkbox_wwbj').setValue(true);
								}
							},
							specialkey: function(field, e) {
								if (e.getKey() == e.ENTER) {
									me.doQuery();
								}
							}
						}
					},
					{
						columnWidth: .45,
						name: 'wbbj',
						boxLabel: '否',
						inputValue: 0,
						listeners: {
							'change': function(obj, value) {
								if (!Ext.isEmpty(value)) {
									me.down('#checkbox_wwbj').setValue(true);
								}
							},
							specialkey: function(field, e) {
								if (e.getKey() == e.ENTER) {
									me.doQuery();
								}
							}
						}
					}
					
					]
					
				},
				{
					name: 'checkbox_ckbh',
					itemId: 'checkbox_ckbh',
					xtype: 'checkbox',
					columnWidth: 0.1
				},
				{
					fieldLabel: '仓库名称',
					itemId: 'ckbh',
					name: 'ckbh',
					columnWidth: .9,
					xtype: 'combo',
					store: Ext.create('erp.master.manufacturer.store.Ckmcb_yl', {
						autoLoad: true
					}),
					displayField: 'ckmc',
					valueField: 'ckbh',
					listeners: {
						'select': function(obj, value) {
							if (!Ext.isEmpty(value)) {
								me.down('#checkbox_ckbh').setValue(true);
							}
						},
						specialkey: function(field, e) {
							if (e.getKey() == e.ENTER) {
								me.doQuery();
							}
						}
					}
				},
				{
					name: 'checkbox_wbbh',
					itemId: 'checkbox_wbbh',
					xtype: 'checkbox',
					columnWidth: 0.1
				},
				{
					fieldLabel: '币种',
					name: 'wbbh',
					xtype: 'combo',
					store: [['10', 'RMB'], ['20', 'USD'], ['30', 'EUR'], ['40', 'JPY'], ['50', 'HKD'], ['60', 'GBP'], ['70', 'CAD'], ['80', 'AUD']],
					columnWidth: .9,
					listeners: {
						'change': function(obj, value) {
							if (!Ext.isEmpty(value)) {
								me.down('#checkbox_wbbh').setValue(true);
							}
						},
						specialkey: function(field, e) {
							if (e.getKey() == e.ENTER) {
								me.doQuery();
							}
						}
					}
				}
				],
				buttons: [{
					text: '重置',
					glyph: 0xf112,
					itemId: 'btn_reset',
					handler: function(btn) {
						var form = me.down('form');
						form.form.reset();
						var rec = form.getRecord();
						form.updateRecord(rec);
					}
				},
				'->', {
					text: '确认',
					glyph: 0xf058,
					itemId: 'btn_confirm',
					handler: me.doQuery
				},
				{
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
		Ext.apply(me.wdrStore.proxy.extraParams, {
			condition: me.getQueryCondition1()
		});
		me.wdrStore.reload();
		Ext.apply(me.wdfStore.proxy.extraParams, {
			condition: me.getQueryCondition2()
		});
		me.wdfStore.reload();
		me.close();
	},
	getQueryCondition1: function() {
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
					if (x == 'rkdh1' && obj['checkbox_rkdh']) {
						arr.push("rkdb_yl.rkdh >= '" + obj[x] + "' ");
					} else if (x == 'rkdh2' && obj['checkbox_rkdh']) {
						arr.push("rkdb_yl.rkdh <= '" + obj[x] + "' ");
					} else if (x == 'rkrq1' && obj['checkbox_rkrq']) {
						arr.push("rkdb_yl.rkrq >= '" + Ext.Date.format(obj[x], 'Y-m-d') + "' ");
					} else if (x == 'rkrq2' && obj['checkbox_rkrq']) {
						arr.push("rkdb_yl.rkrq <= '" + Ext.Date.format(obj[x], 'Y-m-d') + "' ");
					} else if (x == 'clmc' && obj['checkbox_clmc']) {
						arr.push("clbmb.clmc like '%" + obj[x] + "%'");
					} else if (x == 'ckbh' && obj['checkbox_ckbh']) {
						arr.push("rkdb_yl.ckbh = '" + obj[x] + "' ");
					} else if (x == 'wbbh' && obj['checkbox_wbbh']) {
						arr.push("rkdb_yl.wbbh = '" + obj[x] + "' ");
					}
				}
			}
			condition = arr.join(' and ');
		}
		return condition;
	},

	getQueryCondition2: function() {
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
					if (x == 'rkdh1' && obj['checkbox_rkdh']) {
						arr.push("cgfyb.fydh >= '" + obj[x] + "' ");
					} else if (x == 'rkdh2' && obj['checkbox_rkdh']) {
						arr.push("cgfyb.fydh <= '" + obj[x] + "' ");
					} else if (x == 'rkrq1' && obj['checkbox_rkrq']) {
						arr.push("cgfyb.fyrq >= '" + Ext.Date.format(obj[x], 'Y-m-d') + "' ");
					} else if (x == 'rkrq2' && obj['checkbox_rkrq']) {
						arr.push("cgfyb.fyrq <= '" + Ext.Date.format(obj[x], 'Y-m-d') + "' ");
					} else if (x == 'ckbh' && obj['checkbox_ckbh']) {
						arr.push("cgfyb.ckbh = '" + obj[x] + "' ");
					} else if (x == 'wbbh' && obj['checkbox_wbbh']) {
						arr.push("cgfyb.wbbh = '" + obj[x] + "' ");
					}
				}
			}
			condition = arr.join(' and ');
		}
		return condition;
	}
});