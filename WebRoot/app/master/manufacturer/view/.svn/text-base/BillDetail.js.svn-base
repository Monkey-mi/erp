Ext.define('erp.master.manufacturer.view.BillDetail', {
	extend: 'erp.ux.Window',
	alias: 'widget.billDetail',
	title: '票据明细',
	width: 980,
	height: 800,
	modal: true,
	requires: ['erp.common.basic.view.field.HelpField', 
	           'erp.ux.CommonTrigger', 
	           'erp.ux.SearchCombobox'],
	initComponent: function() {
		var me = this;
		me.bdStore = Ext.create('erp.master.manufacturer.store.BillDetail');
		Ext.apply(me, {
			layout: {
				type: 'border',
				padding: 2
			},
			items: [{
				flex: 1,
				region: 'center',
				xtype: 'grid',
				itemId: 'gridBD',
				overflowY: 'auto',
				overflowX: 'auto',
				dockedItems: [{
					xtype: 'pagingbar',
					stateId : "pagingbar"+Ext.id(),
					store: me.bdStore,
					dock: 'bottom',
					defaultPageSize: 50,
					displayInfo: true
				}],
				features: [{
					ftype: 'summary',
					summaryType: 'count',
					dock: 'bottom'
				},
				{
					ftype: 'groupingsummary',
					summaryType: 'count',
					dock: 'bottom',
					groupHeaderTpl: '月份: {name}'
				}],
				columns: [{
					header: '日期',
					dataIndex: 'rq',
					width: 140,
					sumaryType: 'count',
					summaryRenderer: function(value) {
						return '小计';
					},
					summaryRenderer: function(value, summaryData, dataIndex) {
						return '合计';
					}
				},
				{
					header: '核算部门',
					dataIndex: 'hsbm',
					width: 140
				},
				{
					header: '票据单号',
					dataIndex: 'pzh',
					width: 140
				},
				{
					header: '开出票据',
					dataIndex: 'kcpj',
					width: 140,
					renderer: function(v) {
						return Ext.util.Format.number(v, '0,000.00');
					},
					summaryType: 'sum',
					summaryRenderer: function(value) {
						return Ext.util.Format.number(value, '0,000.00');
					},
					summaryRenderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					},
					renderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					}
				},
				{
					header: '已付票据',
					dataIndex: 'yfpj',
					width: 140,
					renderer: function(v) {
						return Ext.util.Format.number(v, '0,000.00');
					},
					summaryType: 'sum',
					summaryRenderer: function(value) {
						return Ext.util.Format.number(value, '0,000.00');
					},
					summaryRenderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					},
					renderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					}
				},
				{
					header: '票据应付',
					dataIndex: 'pjyf',
					width: 140,
					renderer: function(v) {
						return Ext.util.Format.number(v, '0,000.00');
					},
					summaryType: 'sum',
					summaryRenderer: function(value) {
						return Ext.util.Format.number(value, '0,000.00');
					},
					summaryRenderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					},
					renderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					}
				},
				{
					header: '备注摘要',
					dataIndex: 'bzsm',
					width: 140
				}],
				store: me.bdStore
			}]
		});
		me.callParent(arguments);
	},

	loadGridData: function(rec) {
		var me = this;
		me.bdStore.load({
			params: {
				hsbm: rec.get('hsbm'),
				csbh: rec.get('csbh'),
				nf: rec.get('nf'),
				rq: rec.get('rq')
			}
		});
	}
});