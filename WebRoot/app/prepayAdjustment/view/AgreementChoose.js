Ext.define('erp.prepayAdjustment.view.AgreementChoose', {
	extend : 'erp.ux.Window',
	alias : 'widget.AgreementChoose',
	width : 1200,
	title : '合同选择',
	iconCls : 'page_go',
	height : 600,
	initComponent : function() {
		var me = this;
		me.store = Ext.create('erp.prepayAdjustment.store.AgreementChoose');
		var cusConfig = me.field.cusConfig;
		var tzhtbh = me.field.up('panel').getSelectionModel().getSelection()[0].get('tzhtbh');
		me.store.proxy.extraParams.tzhtbh = tzhtbh;
		me.store.load();
		Ext.apply(me, {
			layout : {
				type : 'border',
				align : 'stretch'
			},
			items : [{
						region : 'center',
						xtype : 'grid',
						itemId : 'AgreementData',
						listeners : {
							itemdblclick : function(th, rec, item) {
								me.onSubmit(rec);
							}
						},
						flex : 1,
						columns : [{
									dataIndex : 'cglb',
									header : '采购类别',
									width : 120
								}, {
									dataIndex : 'cgrq',
									header : '采购日期',
									width : 100,
									xtype : 'datecolumn',
									format : 'Y-m-d'
								}, {
									dataIndex : 'htbh',
									header : '合同编号',
									width : 120
								}, {
									dataIndex : 'csbh',
									header : '厂商名称',
									width : 200
								}, {
									dataIndex : 'htzs',
									header : '采购总数',
									width : 90
								}, {
									dataIndex : 'htze',
									header : '本币总额',
									width : 100
								}, {
									dataIndex : 'wbze',
									header : '外币总额',
									width : 100
								}, {
									dataIndex : 'sqje',
									header : '申请金额',
									width : 100
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
						itemId : 'btn_confirm',
						handler : function() {
							var editor = me.field.editor;
							var cusConfig = me.field.cusConfig;
							var grid = me.down('#AgreementData');
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
			me.field.setValue(rec.get('htbh'));
		}
		me.close();
	}
});