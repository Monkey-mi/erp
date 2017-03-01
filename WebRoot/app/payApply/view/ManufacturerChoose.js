Ext.define('erp.payApply.view.ManufacturerChoose', {
	extend : 'erp.ux.Window',
	alias : 'widget.ManufacturerChoose',
	width : 1200,
	title : '厂商选择',
	iconCls : 'page_go',
	height : 600,
	initComponent : function() {
		var me = this;
		me.store = Ext.create('erp.payApply.store.ManufacturerChoose');
		var cusConfig = me.field.cusConfig;
		var myDate = new Date();
		var year = myDate.getYear()+1900;
		var month = myDate.getMonth()+1;
		me.store.proxy.extraParams.year = year;
		me.store.proxy.extraParams.month = month;
		me.store.load();
		Ext.apply(me, {
			layout : {
				type : 'border',
				align : 'stretch'
			},
			items : [{
						region : 'center',
						xtype : 'grid',
						itemId : 'ManufacturerData',
						listeners : {
							itemdblclick : function(th, rec, item) {
								me.onSubmit(rec);
							}
						},
						flex : 1,
						columns : [{
									dataIndex : 'csbh',
									header : '厂商编号',
									width : 100
								}, {
									dataIndex : 'csjc',
									header : '厂商简称',
									width : 100
								}, {
									dataIndex : 'csmc',
									header : '厂商名称',
									width : 200
								}, {
									dataIndex : 'zgrd',
									header : '资格认定',
									width : 100
								}, {
									dataIndex : 'tdrd',
									header : '提单认定',
									width : 100
								}, {
									dataIndex : 'wbdh',
									header : '外币名称',
									width : 80
								}, {
									dataIndex : 'cslx',
									header : '厂商类型',
									width : 100
								}, {
									dataIndex : 'cslb',
									header : '厂商类别',
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
												fieldLabel : '厂商名称',
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
							var cusConfig = me.field.cusConfig;
							var grid = me.down('#ManufacturerData');
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
		var csmc = me.down('#csmc').getValue();
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
			me.field.setValue(rec.get('csmc'));
		}
		me.close();
	}
});