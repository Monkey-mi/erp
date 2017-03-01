Ext.define('erp.prepayAdjustment.view.InvoiceChoose', {
	extend : 'erp.ux.Window',
	alias : 'widget.InvoiceChoose',
	width : 1200,
	title : '发票选择',
	iconCls : 'page_go',
	height : 600,
	initComponent : function() {
		var me = this;
		me.store = Ext.create('erp.prepayAdjustment.store.InvoiceChoose');
		var cusConfig = me.field.cusConfig;
		var yfhtbh=me.field.up('panel').getSelectionModel().getSelection()[0].get('yfhtbh');
		if(yfhtbh!=null&&yfhtbh!=0&&yfhtbh!=''){
		me.store.proxy.extraParams.yfhtbh = yfhtbh;
		};
		me.store.load();
		Ext.apply(me, {
			layout : {
				type : 'border',
				align : 'stretch'
			},
			items : [{
						region : 'center',
						xtype : 'grid',
						itemId : 'InvoiceData',
						listeners : {
							itemdblclick : function(th, rec, item) {
								me.onSubmit(rec);
							}
						},
						flex : 1,
						columns : [{
									dataIndex : 'fplx',
									header : '发票类型',
									width : 120
								}, {
									dataIndex : 'fplb',
									header : '发票代码',
									width : 120
								}, {
									dataIndex : 'fphm',
									header : '发票号码',
									width : 120
								}, {
									dataIndex : 'kprq',
									header : '开票日期',
									width : 120,
									xtype : 'datecolumn',
									format : 'Y-m-d'
								}, {
									dataIndex : 'jzrq',
									header : '记账日期',
									width : 120,
									xtype : 'datecolumn',
									format : 'Y-m-d'
								}, {
									dataIndex : 'csmc',
									header : '厂商名称',
									width : 200
								}, {
									dataIndex : 'fpje',
									header : '发票金额',
									width : 120
								}, {
									dataIndex : 'csje',
									header : '除税金额',
									width : 120
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
									width : 120
								}, {
									dataIndex : 'yfkje',
									header : '已付款金额',
									width : 120
								}, {
									dataIndex : 'sqje',
									header : '已申请金额',
									width : 120
								}, {
									dataIndex : 'wqje',
									header : '未申请金额',
									width : 120
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
												xtype : 'textfield',
												fieldLabel : '供应厂商',
												enableKeyEvents : true,
												itemId : 'csmc',
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
						itemId : 'btn_confirm',
						handler : function() {
							var editor = me.field.editor;
							var cusConfig = me.field.cusConfig;
							var grid = me.down('#InvoiceData');
							var recs = grid.getSelectionModel().getSelection();
							var rec = recs[0];
							if (recs.length == 0) {
								Ext.Msg.alert('提示', '请至少选择一条记录');
								return;
							}
							me.onSubmit(rec, recs);
						}
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
		var csmc = me.down('#csmc').getValue();
		if (fphm) {
			me.store.proxy.extraParams.fphm = fphm;
		} else {
			delete me.store.proxy.extraParams.fphm;
		}
		if (csmc) {
			me.store.proxy.extraParams.csmc = csmc;
		} else {
			delete me.store.proxy.extraParams.csmc;
		}
		me.store.loadPage(1);
	},
	onKeyup : function(field, e) {
		if (e.getKey() == e.ENTER) {
			var me = this.up('window');
			me.doSearch();
		}
	},
	onSubmit : function(rec, recs) {
		var me = this;
		var cusConfig = me.field.cusConfig;
		if (cusConfig != null) {
			var field = cusConfig.field;
			var callback = cusConfig.callback;
			if (Ext.isFunction(callback)) {
				callback(this, rec, recs);
			}
			me.field.setValue(rec.get(field));
		} else {
			me.field.setValue(rec.get('fphm'));
		}
		me.close();
	}
});