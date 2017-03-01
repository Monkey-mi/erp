Ext.define('erp.purchaseInspectionManage.view.DistributeObjectMaintain', {
	extend : 'erp.ux.Window',
	alias : 'widget.win_DistributeObjectMaintain',
	width : 450,
	title : '操作员选择',
	iconCls : 'page_go',
	height : 300,
	modal : true,
	initComponent : function() {
		var me = this;
		me.store = Ext.create('erp.payApply.store.Operator');
		me.store.load();
		Ext.apply(me, {
			layout : {
				type : 'border',
				align : 'stretch'
			},
			items : [{
						region : 'center',
						xtype : 'grid',
						itemId : 'DistributeObjectMatianGrid',
						flex : 1,
						overflowY : 'auto',
						overflowX : 'auto',
						columns : [{
									dataIndex : 'czy_gh',
									header : '工号',
									width : 80
								}, {
									dataIndex : 'czy_xm',
									header : '姓名',
									width : 80
								}, {
									dataIndex : 'lbmc',
									header : '所属部门',
									width : 120
								}, {
									dataIndex : 'gzgw',
									header : '工作岗位',
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
												xtype : 'button',
												iconCls : 'accept',
												text : '确认',
												width : 80,
												itemId : 'btn_confirm'
											}, {
												xtype : 'button',
												iconCls : 'cancel',
												text : '退出',
												width : 80,
												itemId : 'btn_del',
												handler : function() {
													me.close();
												}
											}, {
												xtype : 'textfield',
												fieldLabel : '操作员',
												enableKeyEvents : true,
												itemId : 'submitobject',
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
					}]
		});
		me.callParent(arguments);
	},
	doSearch : function() {
		var me = this;
		var submitobject = me.down('#submitobject').getValue();
		if (submitobject) {
			me.store.proxy.extraParams.czy = submitobject;
		} else {
			delete me.store.proxy.extraParams.czy;
		}
		me.store.loadPage(1);
	},
	onKeyup : function(field, e) {
		if (e.getKey() == e.ENTER) {
			var me = this.up('window');
			me.doSearch();
		}
	}

});