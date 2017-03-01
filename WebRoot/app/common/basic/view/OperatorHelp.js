/**
 * 操作员帮助窗口
 */
Ext.define('erp.common.basic.view.OperatorHelp', {
	extend : 'erp.common.basic.view.helpwin.BaseHelpWin',
	alias : 'widget.opt_help',
	title : '操作员帮助窗口',
	requires : ['erp.master.operator.store.Operator'],
	width : 500,
	height : 0.6 * window.screen.height,
	resizable : false,
	modal : true,
	doInit : function() {
	},
	initComponent : function() {
		var me = this;
		if(me.store==null){
			me.store = Ext.create('erp.master.operator.store.Operator');
		}
		Ext.apply(me.store.getProxy().extraParams,me.winParam);
		Ext.apply(me.store.proxy.extraParams,{tybj:0,usePaging:true});
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
														emptyText:'请输入员工工号或姓名..',
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
														text : '工号',
														dataIndex : 'czy_gh',
														flex : 1
													}, {
														text : '操作员',
														dataIndex : 'czy_xm',
														flex : 1
													}, {
													    text:'所属部门',
													    dataIndex:'bmmc',
													    flex:1
													}, {
													    text:'工作岗位',
													    dataIndex:'gzgw',
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