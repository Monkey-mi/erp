Ext.define('erp.master.manufacturer.view.NoUpTo', {
	extend: 'erp.ux.Window',
	alias: 'widget.mng_NoUpTo',
	requires: ['erp.ux.SelectField'],
	title: '未达明细查询',
	width: 980,
	height: 800,
	modal: true,
	initComponent: function() {
		var me = this;
		me.wdrStore = Ext.create('erp.master.manufacturer.store.NoUpInStorage');
		me.wdfStore = Ext.create('erp.master.manufacturer.store.NoUpPayment');
		Ext.apply(me, {
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			tbar: [{
				text: '筛选',
				iconCls:'page_find',
				itemId: 'BTN_SEARCH'
			},
			{
				text: '退出',
				glyph: 0xf00d,
				handler: function() {
					me.close();
				}
			}],
			items: [{
				xtype: 'tabpanel',
				flex: 1,
				items: [
				//未达入库
				{
					xtype: 'grid',
					itemId: 'grdNoUpInStorage',
					title: '未达入库',
					selModel: Ext.create('Ext.selection.CheckboxModel'),
					features: [{
						ftype: 'summary',
						summaryType: 'count',
						dock: 'bottom'
					}],
					columns: [{
						header: '核销',
						width: 40,
						dataIndex: 'hxbj',
						renderer: erp.Util.Staterenderer,
						sumaryType: 'count',
						summaryRenderer: function(value, summaryData, dataIndex) {
							return '合计';
						}
					},
					{
						header: '仓库名称',
						dataIndex: 'ckmc',
						width: 100
					},
					{
						header: '入库单号',
						dataIndex: 'rkdh',
						width: 100
					},
					{
						header: '序号',
						dataIndex: 'rkxh',
						width: 50
					},
					{
						header: '入库日期',
						dataIndex: 'rkrq',
						width: 100,
						xtype: 'datecolumn',
						format: 'Y.m.d'
					},
					{
						header: '材料名称',
						dataIndex: 'clmc',
						width: 100
					},
					{
						header: '材料特性1',
						dataIndex: 'cltx1',
						width: 100,
						hideable: false,
						hidden: true
					},
					{
						header: '材料特性2',
						dataIndex: 'cltx2',
						width: 100,
						hideable: false,
						hidden: true
					},
					{
						header: '材料特性3',
						dataIndex: 'cltx3',
						width: 100,
						hideable: false,
						hidden: true
					},
					{
						header: '单位',
						dataIndex: 'jldw',
						width: 50
					},
					{
						header: '入库数量',
						dataIndex: 'rksl',
						width: 100,
						xtype: 'numbercolumn',
						summaryType: 'sum',
						summaryRenderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000');
						},
						renderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000');
						}
					},
					{
						header: '含税单价',
						dataIndex: 'rkdj',
						width: 100
					},
					{
						header: '含税金额',
						dataIndex: 'rkje',
						width: 100,
						xtype: 'numbercolumn',
						summaryType: 'sum',
						summaryRenderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					},
					{
						header: '税率',
						dataIndex: 'zzsl',
						width: 100,
						defaultValue: 0.17,
						field: {
							xtype: 'numberfield',
							maxValue: 1,
							decimalPrecision: 2
						},
						renderer: Ext.util.Format.percentRenderer
					},
					{
						header: '除税单价',
						dataIndex: 'csdj',
						width: 100,
						editor: {}
					},
					{
						header: '除税金额',
						dataIndex: 'csje',
						width: 110,
						xtype: 'numbercolumn',
						summaryType: 'sum',
						summaryRenderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					},
					{
						header: '税额',
						dataIndex: 'zzse',
						width: 80,
						renderer: function(value, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					},
					{
						header: '币种',
						dataIndex: 'wbbh',
						width: 60,
						hideable: false,
						hidden: true
					},
					{
						header: '汇率',
						dataIndex: 'wbhl',
						width: 50,
						field: {
							xtype: 'numberfield',
							maxValue: 1,
							decimalPrecision: 2
						},
						renderer: Ext.util.Format.percentRenderer
					},
					{
						header: '外币金额',
						dataIndex: 'wbje',
						width: 100,
						xtype: 'numbercolumn',
						summaryType: 'sum',
						summaryRenderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					},
					{
						header: '辅助单位',
						dataIndex: 'fzdw',
						width: 100
					},
					{
						header: '辅助数量',
						dataIndex: 'fzsl',
						width: 100,
						xtype: 'numbercolumn',
						summaryType: 'sum',
						summaryRenderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000');
						},
						renderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000');
						}
					},
					{
						header: '入库类别',
						dataIndex: 'rklb',
						width: 100,
						hideable: false,
						hidden: true
					}],
					store: me.wdrStore,
					plugins: Ext.create('Ext.grid.plugin.CellEditing', {
						clicksToEdit: 1,
						autoCancel: false,
						itemId: 'cellEditing'
					})
				},
				//未达费用
				{
					xtype: 'grid',
					itemId: 'grdNoUpPayment',
					title: '未达费用',
					features: [{
						ftype: 'summary',
						summaryType: 'count',
						dock: 'bottom'
					}],
					columns: [{
						header: '核销',
						width: 40,
						dataIndex: 'hxbj',
						renderer: erp.Util.Staterenderer,
						sumaryType: 'count',
						summaryRenderer: function(value, summaryData, dataIndex) {
							return '合计';
						}
					},
					{
						header: '锁定',
						width: 40,
						dataIndex: 'XXXXXXXXXXXXXXXXX',
						renderer: erp.Util.Staterenderer
					},
					{
						header: '费用单号',
						dataIndex: 'fydh',
						width: 100,
						editor: {}
					},
					{
						header: '序号',
						dataIndex: 'rkxh',
						width: 50
					},
					{
						header: '费用日期',
						dataIndex: 'fyrq',
						width: 100,
						xtype: 'datecolumn',
						format: 'Y.m.d'
					},
					{
						header: '所属用户',
						dataIndex: 'yhbh',
						width: 100,
						hideable: false,
						hidden: true
					},
					{
						header: '采购类别',
						dataIndex: 'lbmc',
						width: 100
					},
					{
						header: '供应厂商',
						dataIndex: 'csmc',
						width: 100
					},
					{
						header: '费用摘要',
						dataIndex: 'fyzy',
						width: 100
					},
					{
						header: '数量',
						dataIndex: 'fysl',
						width: 100,
						xtype: 'numbercolumn',
						summaryType: 'sum',
						summaryRenderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000');
						},
						renderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000');
						}
					},
					{
						header: '含税单价',
						dataIndex: 'fydj',
						width: 100
					},
					{
						header: '含税金额',
						dataIndex: 'fyje',
						width: 100,
						xtype: 'numbercolumn',
						summaryType: 'sum',
						summaryRenderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					},
					{
						header: '税率',
						dataIndex: 'zzsl',
						width: 100,
						defaultValue: 0.17,
						field: {
							xtype: 'numberfield',
							maxValue: 1,
							decimalPrecision: 2
						},
						renderer: Ext.util.Format.percentRenderer
					},
					{
						header: '除税单价',
						dataIndex: 'csdj',
						width: 100,
						editor: {}
					},
					{
						header: '除税金额',
						dataIndex: 'csje',
						width: 110,
						xtype: 'numbercolumn',
						summaryType: 'sum',
						summaryRenderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					},
					{
						header: '税额',
						dataIndex: 'zzse',
						width: 80,
						renderer: function(value, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					},
					{
						header: '计划号',
						dataIndex: 'jhh',
						width: 60
					},
					{
						header: '合同号',
						dataIndex: 'hth',
						width: 60
					},
					{
						header: '外币金额',
						dataIndex: 'wbje',
						width: 100,
						xtype: 'numbercolumn',
						summaryType: 'sum',
						summaryRenderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					},
					{
						header: '备注说明',
						dataIndex: 'bzsm',
						width: 100
					},
					{
						header: '操作员',
						dataIndex: 'czym',
						width: 100
					},
					{
						header: '操作时间',
						dataIndex: 'czsj',
						width: 100,
						xtype: 'datecolumn',
						format: 'Y.m.d'
					},
					{
						header: '锁定时间',
						dataIndex: 'sdsj',
						width: 100,
						xtype: 'datecolumn',
						format: 'Y.m.d'
					},
					{
						header: '锁定人',
						dataIndex: 'sdrm',
						width: 100
					},
					{
						header: '通知单号',
						dataIndex: 'tzdh',
						width: 100
					},
					{
						header: '发票类别',
						dataIndex: 'fplb',
						width: 100
					},
					{
						header: '发票号码',
						dataIndex: 'fphm',
						width: 100
					}
					],
					store: me.wdfStore,
					plugins: Ext.create('Ext.grid.plugin.CellEditing', {
						clicksToEdit: 1,
						autoCancel: false,
						itemId: 'cellEditing'
					})
				}]
			}]
		}),
		me.callParent(arguments);
	},

	loadData: function(rec) {
		var me = this;
		me.wdrStore.load({
			params: {
				csbh: rec.get('csbh'),
				hsbm: rec.get('hsbm'),
				jzrq: new Date()
			}
		});
		me.wdfStore.load({
			params: {
				csbh: rec.get('csbh'),
				hsbm: rec.get('hsbm'),
				jzrq: new Date()
			}
		});
	},
	loadMain: function() {
		var me = this;
		me.wdrStore.loadPage(1, {
			callback: function(records, operation, success) {}
		});
		me.wdfStore.loadPage(1, {
			callback: function(records, operation, success) {}
		});
	}
});