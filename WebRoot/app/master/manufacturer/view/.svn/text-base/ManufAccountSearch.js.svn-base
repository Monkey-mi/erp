Ext.define('erp.master.manufacturer.view.ManufAccountSearch', {
	extend: 'erp.ux.Window',
	alias: 'widget.manufAccount_Search',
	iconCls: 'page_find',
	title: '厂商应付总账筛选条件',
	frame: true,
	modal: true,
	width: 400,
	prefix: 'csxxb.',
	requires: ['erp.common.basic.view.field.HelpField', 
	           'erp.ux.CommonTrigger', 
	           'erp.ux.SearchCombobox', 
	           'erp.master.prematerial.store.Companyname', 
	           'erp.master.manufacturer.store.Viewcsyf'
	           ],
	height: 300,
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
					text: '基础筛选',
					columnWidth: 1
				},
				//全部记录
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
								me.down('#checkbox_csbh').setValue(false);
								me.down('#checkbox_hsbm').setValue(false);
								me.down('#checkbox_wbbh').setValue(false);
								me.down('#checkbox_cslb').setValue(false);
							}
						}
					}
				},
				//厂商名称
				{
					name: 'checkbox_csbh',
					itemId: 'checkbox_csbh',
					xtype: 'checkbox',
					columnWidth: 0.1
				},
				{
					fieldLabel: '厂商名称',
					xtype: 'tps_searchcbo',
					name: 'csbh',
					itemId: 'search',
					store: me.csStore,
					displayField: 'csmc',
					valueField: 'csbh',
					columnWidth: 0.9,
					listeners: {
						'change': function(obj, value) {
							if (!Ext.isEmpty(value)) {
								me.down('#checkbox_csbh').setValue(true);
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
				},
				//扩展筛选
				{
					xtype: 'tbtext',
					text: '扩展筛选',
					columnWidth: 1
				},
				//核算部门
				{
					name: 'checkbox_hsbm',
					itemId: 'checkbox_hsbm',
					xtype: 'checkbox',
					columnWidth: 0.1
				},
				{
					fieldLabel: '核算部门',
					name: 'hsbm',
					itemId: 'hsbm',
					xtype: 'comboxTree',
					queryMode: 'local',
					store: Ext.create('erp.view.master.perchasepriceadjust.store.AccountDeptTree'),
					displayField: 'text',
					valueField: 'nodeId',
					columnWidth: .9,
					listeners: {
						'select': function(obj, value) {
							if (!Ext.isEmpty(value)) {
								me.down('#checkbox_hsbm').setValue(true);
							}
						},
						specialkey: function(field, e) {
							if (e.getKey() == e.ENTER) {
								me.doQuery();
							}
						}
					}
				},
				//币种
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
				},
				//厂商类别
				{
					name: 'checkbox_cslb',
					itemId: 'checkbox_cslb',
					xtype: 'checkbox',
					columnWidth: 0.1
				},
				{
					fieldLabel: '厂商类别',
					itemId: 'cslb',
					name: 'cslb',
					columnWidth: .9,
					xtype: 'combo',
					store: Ext.create('erp.master.manufacturer.store.Cslb'),
					displayField: 'cslb',
					valueField: 'cslb',
					listeners: {
						'change': function(obj, value) {
							if (!Ext.isEmpty(value)) {
								me.down('#checkbox_cslb').setValue(true);
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
					handler:function(){
						me.doQuery();
					}
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
		var me = this;
		Ext.apply(me.mainstore.proxy.extraParams, 
     			{
			        gdbj:gdbj,
     				condition:me.getQueryCondition()
     			 }
     		);
     	me.mainstore.reload();
//		me.mainstore.load({params:{gdbj:gdbj,condition:me.getQueryCondition()}});
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
					if (x == 'csbh' && obj['checkbox_csbh']) {
						arr.push(me.prefix + "csbh = '" + obj[x] + "' ");
					} else if (x == 'hsbm' && obj['checkbox_hsbm']) {
						arr.push("a.hsbm ='" + obj[x] + "'");
					} else if (x == 'wbbh' && obj['checkbox_wbbh']) {
						arr.push(me.prefix + "wbbh ='" + obj[x] + "'");
					} else if (x == 'cslb' && obj['checkbox_cslb']) {
						arr.push(me.prefix + "cslb ='" + obj[x] + "'");
					}
				}
			}
			condition = arr.join(' and ');
		}
		return condition;
	}
});