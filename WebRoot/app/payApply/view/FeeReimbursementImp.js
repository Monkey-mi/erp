Ext.define('erp.payApply.view.FeeReimbursementImp', {
	extend : 'erp.ux.Window',
	alias : 'widget.Imp_FeeReimbursement',
	width : 1200,
	title : '费用报销单导入',
	iconCls : 'page_go',
	height : 600,
	modal: true,
	initComponent : function() {
		var me = this;
		me.store = Ext.create('erp.payApply.store.FeeReimbursementImp');
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
						itemId : 'FeeReimbursement',
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
							dataIndex : 'jlh',
							header : '报销号',
							width : 100,
							sumaryType : 'count',
							summaryRenderer : function(value, summaryData,
									dataIndex) {
								return '合计';
							}
						}, {
							dataIndex : 'bxrq',
							header : '制单日期',
							width : 100,
							xtype : 'datecolumn',
							format : 'Y-m-d'
						}, {
							dataIndex : 'zgxm',
							header : '报销人',
							width : 100
						}, {
							dataIndex : 'bmmc1',
							header : '报销部门',
							width : 100
						}, {
							dataIndex : 'lbmc2',
							header : '上级支付类别',
							width : 100
						}, {
							dataIndex : 'lbmc1',
							header : '支付类别',
							width : 100
						}, {
							dataIndex : 'bmmc2',
							header : '受益部门',
							width : 100
						}, {
							dataIndex : 'bmmc3',
							header : '核算部门',
							width : 100
						}, {
							dataIndex : 'qsrq',
							header : '起始日期',
							width : 100,
							xtype : 'datecolumn',
							format : 'Y-m-d'
						}, {
							dataIndex : 'jzrq',
							header : '截止日期',
							width : 100,
							xtype : 'datecolumn',
							format : 'Y-m-d'
						}, {
							dataIndex : 'pjhm',
							header : '票据号',
							width : 100
						}, {
							dataIndex : 'wbdh',
							header : '币种',
							width : 60
						}, {
							dataIndex : 'pjje',
							header : '金额',
							width : 100,
							summaryType : 'sum',
							summaryRenderer : function(value, summaryData,
									dataIndex) {
								return Ext.util.Format
										.number(value, '0,000.00');
							}
						}, {
							dataIndex : 'qtje',
							header : '其他',
							width : 100,
							summaryType : 'sum',
							summaryRenderer : function(value, summaryData,
									dataIndex) {
								return Ext.util.Format
										.number(value, '0,000.00');
							}
						}, {
							dataIndex : 'hjje',
							header : '合计金额',
							width : 100,
							summaryType : 'sum',
							summaryRenderer : function(value, summaryData,
									dataIndex) {
								return Ext.util.Format
										.number(value, '0,000.00');
							}
						}, {
							dataIndex : 'bxsy',
							header : '报销事由',
							width : 200
						}, {
							dataIndex : 'bzsm',
							header : '备注说明',
							width : 200
						}, {
							dataIndex : 'qrrm',
							header : '复核人名',
							width : 100
						}, {
							dataIndex : 'qrrq',
							header : '复核日期',
							width : 100,
							xtype : 'datecolumn',
							format : 'Y-m-d'
						}, {
							dataIndex : 'tjdx',
							header : '提交审批',
							width : 100
						}, {
							dataIndex : 'tjrm',
							header : '提交人',
							width : 100
						}, {
							dataIndex : 'tjsj',
							header : '提交时间',
							width : 100,
							xtype : 'datecolumn',
							format : 'Y-m-d'
						}, {
							dataIndex : 'sprm',
							header : '审批人',
							width : 100
						}, {
							dataIndex : 'spsj',
							header : '审批时间',
							width : 100,
							xtype : 'datecolumn',
							format : 'Y-m-d'
						}, {
							dataIndex : 'yfsj',
							header : '已付时间',
							width : 100,
							xtype : 'datecolumn',
							format : 'Y-m-d'
						}, {
							dataIndex : 'dyrm',
							header : '打印人名',
							width : 100
						}, {
							dataIndex : 'czym',
							header : '操作员',
							width : 100
						}, {
							dataIndex : 'czsj',
							header : '操作时间',
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
												fieldLabel : '报销号',
												enableKeyEvents : true,
												itemId : 'jlh',
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
		var jlh = me.down('#jlh').getValue();
		if (jlh) {
			me.store.proxy.extraParams.jlh = jlh;
		} else {
			delete me.store.proxy.extraParams.jlh;
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