Ext.define('erp.prepayAdjustment.view.PrepayAdjustmentImp', {
	extend : 'erp.ux.Window',
	alias : 'widget.Imp_PrepayAdjustment',
	width : 1200,
	title : '合同预付款状态查询导入',
	iconCls : 'page_go',
	height : 600,
	initComponent : function() {
		var me = this;
		me.store = Ext.create('erp.prepayAdjustment.store.PrepayAdjustmentImp');
		me.store.proxy.extraParams.hxfp = 1;
		me.store.load();
		Ext.apply(me, {
			layout : {
				type : 'border',
				align : 'stretch'
			},
			items : [{
						region : 'center',
						xtype : 'grid',
						itemId : 'proDetailData',
						flex : 1,
						columns : [{
									dataIndex : 'sqbh',
									header : '申请序号',
									width : 80
								}, {
									dataIndex : 'sqxh',
									header : '序号',
									width : 60
								}, {
									dataIndex : 'bmmc',
									header : '核算部门',
									width : 120
								}, {
									dataIndex : 'csbh',
									header : '供应厂商',
									width : 200
								}, {
									dataIndex : 'htbh',
									header : '预付合同号',
									width : 90
								}, {
									dataIndex : 'fydh',
									header : '预付费用号',
									width : 90
								}, {
									dataIndex : 'htje',
									header : '合同/费用金额',
									width : 100
								}, {
									dataIndex : 'sqje',
									header : '申请金额',
									width : 100
								}, {
									dataIndex : 'hxje',
									header : '核销金额',
									width : 100
								}, {
									dataIndex : 'whxje',
									header : '未分配金额',
									width : 100
								}, {
									dataIndex : 'wbze',
									header : '外币总额',
									width : 100
								}, {
									dataIndex : 'wbje',
									header : '外币金额',
									width : 100
								}, {
									dataIndex : 'whxje_wb',
									header : '外币未分配',
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
						itemId : 'btn_confirm'
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

});