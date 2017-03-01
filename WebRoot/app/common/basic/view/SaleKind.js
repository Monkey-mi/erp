/**
 * 销售区域帮助窗口
 */
Ext.define('erp.common.basic.view.SaleKind', {
	extend : 'erp.common.basic.view.helpwin.BaseHelpWin',
	alias : 'widget.sellKind_help',
	title : '销售区域帮助窗口',
	iconCls:'box',
	requires : ['erp.express.store.Sellkind'],
	width : 400,
	height : 500,
	resizable : false,
	modal : true,
	initComponent : function() {
		var me=this;
		me.store=Ext.create('erp.express.store.Sellkind')
//		.load({
//			params:{mjbz:'1'}
//		});
		if (!erp.Util.currentUser.isAdmin)
				me.store.getProxy().setExtraParam('czy_gh',erp.Util.currentUser.accountMap[0].ref_u_id);
		me.store.getProxy().setExtraParam('mjbz',1);
		me.store.load();
		Ext.apply(this, {
						layout:'fit',
						items : [{
								xtype : 'panel',
								layout : 'fit',
								items : [{
											xtype : 'grid',
											store : me.store,
											tbar : [{
														xtype : 'button',
														text : '刷新',
														iconCls:'arrow_refresh',
														listeners : {
															click : me.refreshClick
														}
													}],
											columns : [{
														text : '类别编号',
														dataIndex : 'lbbh',
														flex : 1
													}, {
														text : '类别名称',
														dataIndex : 'lbmc',
														flex : 1
													}, {
													    text:'备注说明',
													    dataIndex:'bzsm',
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