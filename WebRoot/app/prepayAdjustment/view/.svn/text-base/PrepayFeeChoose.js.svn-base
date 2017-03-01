Ext.define('erp.prepayAdjustment.view.PrepayFeeChoose', {
	extend : 'erp.ux.Window',
	alias : 'widget.PrepayFeeChoose',
	width : 1200,
	title : '预付费用单选择',
	iconCls : 'page_go',
	height : 600,
	initComponent : function() {
		var me = this;
		me.store = Ext.create('erp.prepayAdjustment.store.PrepayFeeChoose');
		me.store.load();
		Ext.apply(me, {
			layout : {
				type : 'border',
				align : 'stretch'
			},
			items : [{
						region : 'center',
						xtype : 'grid',
						itemId : 'PrepayFeeData',
						listeners : {
							itemdblclick : function(th, rec, item) {
								me.onSubmit(rec);
							}
						},
						flex : 1,
						columns : [{
									dataIndex : 'fydh',
									header : '费用单号',
									width : 120
								}, {
									dataIndex : 'fyxh',
									header : '序号',
									width : 60
								}, {
									dataIndex : 'fyrq',
									header : '费用日期',
									width : 120,
									xtype : 'datecolumn',
									format : 'Y-m-d'
								}, {
									dataIndex : 'fysl',
									header : '数量',
									width : 120
								}, {
									dataIndex : 'fydj',
									header : '含税单价',
									width : 120
								}, {
									dataIndex : 'fyje',
									header : '含税金额',
									width : 120
								}, {
									dataIndex : 'yfje',
									header : '核销金额',
									width : 120
								}, {
									dataIndex : 'sqje',
									header : '申请金额',
									width : 100
								}, {
									dataIndex : 'wyfje',
									header : '未核销金额',
									width : 120
								}, {
									dataIndex : 'wyfje_wb',
									header : '未分配外币',
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
							var grid = me.down('#PrepayFeeData');
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
			me.field.setValue(rec.get('fydh'));
		}
		me.close();
	}
});