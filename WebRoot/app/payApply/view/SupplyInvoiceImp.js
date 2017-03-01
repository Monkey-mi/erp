Ext.define('erp.payApply.view.SupplyInvoiceImp', {
	extend : 'erp.ux.Window',
	alias : 'widget.Imp_SupplyInvoice',
	width : 1200,
	title : '供应发票导入',
	iconCls : 'page_go',
	height : 600,
	modal: true,
	initComponent : function() {
		var me = this;
		me.store = Ext.create('erp.payApply.store.SupplyInvoiceImp');
		me.dstore = Ext.create('erp.payApply.store.SupplyInvoiceImpDetail');
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
						itemId : 'SupplyInvoice',
						flex : 1,
						overflowY : 'auto',
						overflowX : 'auto',
						selModel : Ext.create('Ext.selection.CheckboxModel',{checkOnly:true}),
						features : [{
									ftype : 'summary',
									summaryType : 'count',
									dock : 'bottom'
								}],
						columns : [ {
							dataIndex : 'ycbj',
							header : '已传',
							renderer : erp.Util.Staterenderer,
							width : 50,
							sumaryType : 'count',
							summaryRenderer : function(value, summaryData,
									dataIndex) {
								return '合计';
							}
						}, {
							dataIndex : 'fplb',
							header : '发票类别',
							width : 120
						}, {
							dataIndex : 'fphm',
							header : '发票号码',
							width : 100
						}, {
							dataIndex : 'kprq',
							header : '开票日期',
							width : 100,
							xtype : 'datecolumn',
							format : 'Y-m-d'
						}, {
							dataIndex : 'jzrq',
							header : '记账日期',
							width : 100,
							xtype : 'datecolumn',
							format : 'Y-m-d'
						}, {
							dataIndex : 'cglb',
							header : '采购类别',
							width : 100
						}, {
							dataIndex : 'csmc',
							header : '厂商名称',
							width : 200
						}, {
							dataIndex : 'cgym',
							header : '采购员',
							width : 80
						}, {
							dataIndex : 'fpje',
							header : '发票金额',
							width : 100,
							summaryType : 'sum',
							summaryRenderer : function(value, summaryData,
									dataIndex) {
								return Ext.util.Format
										.number(value, '0,000.00');
							}
						}, {
							dataIndex : 'yfkje',
							header : '-预付金额',
							width : 100,
							summaryType : 'sum',
							summaryRenderer : function(value, summaryData,
									dataIndex) {
								return Ext.util.Format
										.number(value, '0,000.00');
							}
						}, {
							dataIndex : 'sqje',
							header : '-已申请金额',
							width : 100,
							summaryType : 'sum',
							summaryRenderer : function(value, summaryData,
									dataIndex) {
								return Ext.util.Format
										.number(value, '0,000.00');
							}
						}, {
							dataIndex : 'wqje',
							header : '=未申请金额',
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
							width : 100
						}, {
							dataIndex : 'wbhl',
							header : '汇率',
							width : 100
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
							dataIndex : 'yfwb',
							header : '-预付外币',
							width : 100,
							summaryType : 'sum',
							summaryRenderer : function(value, summaryData,
									dataIndex) {
								return Ext.util.Format
										.number(value, '0,000.00');
							}
						}, {
							dataIndex : 'wbsq',
							header : '-外币已申请',
							width : 100,
							summaryType : 'sum',
							summaryRenderer : function(value, summaryData,
									dataIndex) {
								return Ext.util.Format
										.number(value, '0,000.00');
							}
						}, {
							dataIndex : 'wqwb',
							header : '=外币未申请',
							width : 100,
							summaryType : 'sum',
							summaryRenderer : function(value, summaryData,
									dataIndex) {
								return Ext.util.Format
										.number(value, '0,000.00');
							}
						}, {
							dataIndex : 'ztmc',
							header : '主体单位',
							width : 200
						}, {
							dataIndex : 'fptt',
							header : '发票抬头',
							width : 200
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
												fieldLabel : '发票号码',
												enableKeyEvents : true,
												itemId : 'fphm',
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
					}, {
						region : 'south',
						split : true,
						height : 200,
						xtype : 'grid',
						overflowY : 'auto',
						overflowX : 'auto',
//						selModel : Ext.create('Ext.selection.CheckboxModel'),
						itemId : 'SupplyInvoiceDetail',
						features : [{
											ftype : 'summary',
											summaryType : 'count',
											dock : 'bottom'
										}],
								columns : [{
									header : '核算部门',
									width : 120,
									dataIndex : 'bmmc',
									sumaryType : 'count',
									summaryRenderer : function(value, summaryData,
										dataIndex) {
									return '合计';
							}
								}, {
									header : '发票金额',
									width : 100,
									dataIndex : 'rkje',
									summaryType : 'sum',
									summaryRenderer : function(value, summaryData,dataIndex) {
										return Ext.util.Format.number(value, '0,000.00');
									}
								}, {
									header : '-已申请金额',
									width : 100,
									dataIndex : 'sqje'
								}, {
									header : '-预付金额',
									width : 100,
									dataIndex : 'yfkje'
								}, {
									header : '=未申请金额',
									width : 100,
									dataIndex : 'wqje',
									summaryType : 'sum',
									summaryRenderer : function(value, summaryData,dataIndex) {
										return Ext.util.Format.number(value, '0,000.00');
									}
								}, {
									header : '外币金额',
									width : 100,
									dataIndex : 'wbje',
									summaryType : 'sum',
									summaryRenderer : function(value, summaryData,dataIndex) {
										return Ext.util.Format.number(value, '0,000.00');
									}
								}, {
									header : '-外币已申请',
									width : 100,
									dataIndex : 'wbsq'
								}, {
									header : '-预付外币',
									width : 100,
									dataIndex : 'yfwb'
								}, {
									header : '=外币未申请',
									width : 100,
									dataIndex : 'wqwb'
								}],
								store : me.dstore								
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
		var fphm = me.down('#fphm').getValue();
		if (fphm) {
			me.store.proxy.extraParams.fphm = fphm;
		} else {
			delete me.store.proxy.extraParams.fphm;
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