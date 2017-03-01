/**
 * 采购员信息帮助窗口
 */
Ext.define('erp.common.basic.view.PurGroupManHelp', {
	extend : 'erp.common.basic.view.helpwin.BaseHelpWin',
	alias : 'widget.PurGroupMan_help',
	title : '采购员信息帮助窗口',
	width : 600,
	height : 0.6 * window.screen.height,
	resizable : false,
	modal : true,
	initComponent : function() {
		var me = this;
		Ext.apply(me.store.getProxy().extraParams,me.winParam);
		me.store.load();
		Ext.apply(this, {
					items : [{
								xtype : 'panel',
								layout : 'fit',
								tbar:[
								      '采购员名', 
					                  {
								    	  xtype : 'textfield',
											itemId : 'searchfield',	
											hiddenLabel : true,
											enableKeyEvents :true,
											width:220,
											emptyText:'采购员名..' ,
											listeners:{
												keyup:me.onKeyup
											}
										}, {
											xtype : 'button',
											text : '搜索',
											iconCls:'query',
											itemId:'search',
											handler:me.searchClick
										}, {
											xtype : 'button',
											iconCls:'arrow_refresh',
											text : '刷新',
											handler:me.refreshClick
										}, {
											xtype : 'checkbox',
											boxLabel : '结果中搜索',
											itemId:'resultsearch'
										}, {
											xtype : 'checkbox',
											boxLabel : '显示过滤行',
											itemId:'showFilter'
										}
								      ],
								items : [{
											xtype : 'grid',
											store : me.store,
											columns : [{
														text : '采购员编号',
														dataIndex : 'cgybh',
														width:100
													}, {
														text : '采购员姓名',
														dataIndex : 'cgyxm',
														width:100
													}, {
														text : '所属部门',
														dataIndex : 'ssbm',
														width:100
													}, {
														text : '备注说明',
														dataIndex : 'bzsm',
														flex:1
													}
													],
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