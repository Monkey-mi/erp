Ext.define('erp.payApply.view.PurchaseAgreementImp', {
	extend : 'erp.ux.Window',
	alias : 'widget.Imp_PurchaseAgreement',
	width : 1200,
	title : '采购合同导入',
	iconCls : 'page_go',
	height : 600,
	modal: true,
	initComponent : function() {
		var me = this;
		me.store = Ext.create('erp.payApply.store.PurchaseAgreementImp');
		me.store.proxy.extraParams.csbh=me.csbh;
		me.store.load();
		Ext.apply(me, {
					layout : {
						type : 'border',
						align : 'stretch'
					},
					items : [{
						region : 'center',
						xtype : 'grid',
						itemId : 'PurchaseAgreement',
						flex : 1,
						overflowY : 'auto',
						overflowX : 'auto',
						selModel : Ext.create('Ext.selection.CheckboxModel'),
						features : [{
									ftype : 'summary',
									summaryType : 'count',
									dock : 'bottom'
								}],
						columns : [{
							dataIndex : 'htbh',
							header : '合同编号',
							width : 100,
							sumaryType : 'count',
							summaryRenderer : function(value, summaryData,
									dataIndex) {
								return '合计';
							}
						}, {
							dataIndex : 'yhbh',
							header : '所属用户',
							width : 100
						}, {
							dataIndex : 'lbmc',
							header : '采购类别',
							width : 100
						}, {
							dataIndex : 'csmc',
							header : '厂商名称',
							width : 200
						}, {
							dataIndex : 'bmmc',
							header : '核算部门',
							width : 120
						}, {
							dataIndex : 'ztmc',
							header : '主体单位',
							width : 120
						}, {
							dataIndex : 'htze',
							header : '本币总额',
							width : 100,
							summaryType : 'sum',
							summaryRenderer : function(value, summaryData,
									dataIndex) {
								return Ext.util.Format
										.number(value, '0,000.00');
							}
						}, {
							dataIndex : 'yrje',
							header : '已入金额',
							width : 100,
							summaryType : 'sum',
							summaryRenderer : function(value, summaryData,
									dataIndex) {
								return Ext.util.Format
										.number(value, '0,000.00');
							}
						}, {
							dataIndex : 'wrje',
							header : '未入金额',
							width : 100,
							summaryType : 'sum',
							summaryRenderer : function(value, summaryData,
									dataIndex) {
								return Ext.util.Format
										.number(value, '0,000.00');
							}
						}, {
							dataIndex : 'wbze',
							header : '外币总额',
							width : 100,
							summaryType : 'sum',
							summaryRenderer : function(value, summaryData,
									dataIndex) {
								return Ext.util.Format
										.number(value, '0,000.00');
							}
						}, {
							dataIndex : 'yrwb',
							header : '已入外币',
							width : 100,
							summaryType : 'sum',
							summaryRenderer : function(value, summaryData,
									dataIndex) {
								return Ext.util.Format
										.number(value, '0,000.00');
							}
						}, {
							dataIndex : 'wrwb',
							header : '未入外币',
							width : 100,
							summaryType : 'sum',
							summaryRenderer : function(value, summaryData,
									dataIndex) {
								return Ext.util.Format
										.number(value, '0,000.00');
							}
						}, {
							dataIndex : 'cgrq',
							header : '采购日期',
							width : 100,
							xtype : 'datecolumn',
							format : 'Y-m-d'
						}],
						store : me.store,
						dockedItems : [{
									xtype : 'toolbar',
									dock : 'top',
									defaults : {
										padding : '0 5 0 0',
										labelWidth : 60,
										width : 180
									},
									items : [{
												xtype : 'textfield',
												fieldLabel : '合同编号',
												enableKeyEvents : true,
												itemId : 'htbh',
												listeners : {
													keyup : me.onKeyup
												}
											}, {
												xtype : 'button',
												iconCls : 'query',
												text : '查询',
												width : 80,
												itemId : 'btn_query',
												handler : function() {
													me.doSearch();
												}
											}]
								}, {
									xtype : 'pagingbar',
									stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
									store : me.store,
									dock : 'bottom',
									displayInfo : true
								}]
					}],
					buttons : [{
								text : '确认',
								iconCls : 'accept',
								itemId : 'btn_confirm'
//								handler : function() {
//									me.doSave();
//								}
							}, {
								text : '关闭',
								iconCls : 'cancel',
								handler : function() {
									me.close();
								}
							}]
				});
		me.callParent(arguments);
	},
	doSearch : function() {
		var me = this;
		var htbh = me.down('#htbh').getValue();
		if (htbh) {
			me.store.proxy.extraParams.htbh = htbh;
		} else {
			delete me.store.proxy.extraParams.htbh;
		}
		me.store.loadPage(1);
	},
	onKeyup : function(field, e) {
		if (e.getKey() == e.ENTER) {
			var me = this.up('window');
			me.doSearch();
		}
	}
	/*doSave : function() {
		var me = this.up('window');
		var grid = me.down('#SupplyInvoice');
		var rec = grid.getSelectionModel().getSelection()[0];
		var r = Ext.create('erp.payApply.model.PayApply',
								{
									csbh : rec.get('csbh'),
									fktj : rec.get('fktj'),
									fkts : rec.get('fkts'),
									skdw : rec.get('fptt'),
									mrdw : rec.get('fptt'),
									ztdw : rec.get('ztdw'),
									bzsm : rec.get('bzsm'),
									wbbh : rec.get('wbbh'),
									wbhl : rec.get('wbhl'),
									cszh : rec.get('cszh'),
									khyh : rec.get('khyh')
								});
	}*/
	
});