Ext.define('erp.payApply.view.PurchaseFeeImp', {
	extend : 'erp.ux.Window',
	alias : 'widget.Imp_PurchaseFee',
	width : 1200,
	title : '采购费用单导入',
	iconCls : 'page_go',
	height : 600,
	modal: true,
	initComponent : function() {
		var me = this;
		me.store = Ext.create('erp.payApply.store.PurchaseFeeImp');
		me.store.proxy.extraParams.csbh=me.csbh;
//		me.store.proxy.extraParams.usePaging = true;
		me.store.load();
		Ext.apply(me, {
					layout : {
						type : 'border',
						align : 'stretch'
					},
					items : [{
						region : 'center',
						xtype : 'grid',
						itemId : 'PurchaseFee',
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
							dataIndex : 'fylx',
							header : '费用类型',
							width : 100,
							sumaryType : 'count',
							summaryRenderer : function(value, summaryData,
									dataIndex) {
								return '合计';
							}
						}, {
							dataIndex : 'fydh',
							header : '费用单号',
							width : 100
						}, {
							dataIndex : 'fyxh',
							header : '序号',
							width : 60
						}, {
							dataIndex : 'cybh',
							header : '出货编号',
							width : 100
						}, {
							dataIndex : 'fyje',
							header : '费用金额',
							width : 100,
							summaryType : 'sum',
							summaryRenderer : function(value, summaryData,
									dataIndex) {
								return Ext.util.Format
										.number(value, '0,000.00');
							}
						}, {
							dataIndex : 'sqje',
							header : '申请金额',
							width : 100,
							summaryType : 'sum',
							summaryRenderer : function(value, summaryData,
									dataIndex) {
								return Ext.util.Format
										.number(value, '0,000.00');
							}
						}, {
							dataIndex : 'wqje',
							header : '未申请金额',
							width : 100,
							summaryType : 'sum',
							summaryRenderer : function(value, summaryData,
									dataIndex) {
								return Ext.util.Format
										.number(value, '0,000.00');
							}
						}, {
							dataIndex : 'wbdh',
							header : '币种',
							width : 60
						}, {
							dataIndex : 'wbhl',
							header : '汇率',
							width : 80
						}, {
							dataIndex : 'wbje',
							header : '外币金额',
							width : 100,
							summaryType : 'sum',
							summaryRenderer : function(value, summaryData,
									dataIndex) {
								return Ext.util.Format
										.number(value, '0,000.00');
							}
						}, {
							dataIndex : 'wbsq',
							header : '申请外币',
							width : 100,
							summaryType : 'sum',
							summaryRenderer : function(value, summaryData,
									dataIndex) {
								return Ext.util.Format
										.number(value, '0,000.00');
							}
						}, {
							dataIndex : 'wqwb',
							header : '未申请外币',
							width : 100,
							summaryType : 'sum',
							summaryRenderer : function(value, summaryData,
									dataIndex) {
								return Ext.util.Format
										.number(value, '0,000.00');
							}
						}, {
							dataIndex : 'fyrq',
							header : '费用日期',
							width : 100,
							xtype : 'datecolumn',
							format : 'Y-m-d'
						}, {
							dataIndex : 'yhbh',
							header : '所属用户',
							width : 100
						}, {
							dataIndex : 'bmmc',
							header : '核算部门',
							width : 120
						}, {
							dataIndex : 'csmc',
							header : '供应厂商/业务对象',
							width : 200
						}, {
							dataIndex : 'fyzy',
							header : '费用摘要',
							width : 200
						}, {
							dataIndex : 'jhh',
							header : '计划号',
							width : 100
						}, {
							dataIndex : 'hth',
							header : '合同号',
							width : 100
						}, {
							dataIndex : 'hsh',
							header : '回收号',
							width : 100
						}, {
							dataIndex : 'wxh',
							header : '外协号',
							width : 100
						}, {
							dataIndex : 'bzsm',
							header : '备注说明',
							width : 250
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
												fieldLabel : '费用单号',
												enableKeyEvents : true,
												itemId : 'fydh',
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
									usePaging : true,
									dock : 'bottom',
									displayInfo : true,
									defaultPageSize : 50
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
		var fydh = me.down('#fydh').getValue();
		if (fydh) {
			me.store.proxy.extraParams.fydh = fydh;
		} else {
			delete me.store.proxy.extraParams.fydh;
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