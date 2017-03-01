/**
 * 平台子账户窗口
 */
Ext.define('erp.common.basic.view.SubAccoutHelp', {
	extend : 'erp.common.basic.view.helpwin.BaseHelpWin',
	alias : 'widget.subAccout_help',
	title : '平台账户帮助窗口',
	requires : ['erp.master.operator.store.SubAccout'],
	width : 500,
	height : 0.6 * window.screen.height,
	resizable : false,
	modal : true,
	doInit : function() {
	},
	initComponent : function() {
		var me = this;
		if(me.store==null){
			me.store = Ext.create('erp.master.operator.store.SubAccout');
		}
		Ext.apply(me.store.getProxy().extraParams,me.winParam);
		me.store.load();
		Ext.apply(this, {
					items : [{
								xtype : 'panel',
								layout : 'fit',
								items : [{
											xtype : 'grid',
											store : me.store,
											tbar : ['关键字', {
														xtype : 'textfield',
														itemId : 'searchfield',
														emptyText:'请输入用户名或姓名..',
														hiddenLabel : true,
														enableKeyEvents : true,
														listeners : {
															keyup : me.onKeyup
														}
													}, {
														xtype : 'button',
														text : '搜索',
														iconCls:'query',
														itemId : 'search',
														listeners : {
															click : me.searchClick
														}
													}, {
														xtype : 'button',
														text : '刷新',
														iconCls:'arrow_refresh',
														listeners : {
															click : me.refreshClick
														}
													}],
											columns : [{
														text : '账户名',
														dataIndex : 'sa_name',
														flex : 1
													}, {
														text : '用户名称',
														dataIndex : 'username',
														flex : 1
													}, {
													    text:'电话',
													    dataIndex:'phone',
													    flex:1
													}],
											dockedItems : [{
														xtype : 'pagingtoolbar',
														store : me.store,
														dock : 'bottom',
														displayInfo : true
													}]

										}]
							}]
				});
		this.callParent(arguments);
	}
});