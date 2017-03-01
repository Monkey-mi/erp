Ext.define('erp.master.manufacturer.view.InvoiceDetail', {
	extend: 'erp.ux.Window',
	alias: 'widget.invoiceDetail',
	title: '厂商往来明细账',
	width: 980,
	height: 800,
	modal: true,
	requires: ['erp.common.basic.view.field.HelpField', 
	           'erp.ux.CommonTrigger', 
	           'erp.ux.SearchCombobox'],
	initComponent: function() {
		var me = this;
		me.idStore = Ext.create('erp.master.manufacturer.store.InvoiceDetail');
		Ext.apply(me, {
			layout: {
				type: 'border',
				padding: 2
			},
			items: [{
				flex: 1,
				region: 'center',
				xtype: 'grid',
				itemId: 'gridID',
				overflowY: 'auto',
				overflowX: 'auto',
				dockedItems: [{
					xtype: 'pagingbar',
					stateId : "pagingbar"+Ext.id(),
					store: me.idStore,
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
					header: '单据编号',
					dataIndex: 'pzh',
					width: 140
				},
				{
					header: '发票金额',
					dataIndex: 'fpje',
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
					header: '支付金额',
					dataIndex: 'zfje',
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
					header: '汇率调整',
					dataIndex: 'hldz',
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
					header: '发票应付',
					dataIndex: 'fpyf',
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
				store: me.idStore
			}]
		});
		me.callParent(arguments);
	},

	loadGridData: function(rec) {
		var me = this;
		me.idStore.load({
			params: {
				hsbm: rec.get('hsbm'),
				csbh: rec.get('csbh'),
				nf: rec.get('nf'),
				rq: rec.get('rq'),
				wbbj: rec.get('wbbj'),
				tjlb: rec.get('tjlb')
			}
		});
	}
});