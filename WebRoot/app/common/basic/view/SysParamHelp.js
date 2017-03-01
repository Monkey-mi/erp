/**
 *CRM系统枚举窗口
 */
Ext.define('erp.common.basic.view.SysParamHelp', {
	extend : 'erp.common.basic.view.helpwin.BaseHelpWin',
	alias : 'widget.sys_help',
	title : '系统枚举窗口',
	iconCls:'box',
	requires : ['erp.express.store.EnumType'],
	width : 500,
	height : 0.6 * window.screen.height,
	resizable : false,
	modal : true,
	initComponent : function() {
		var me = this;
		me.store = Ext.create('erp.express.store.EnumType');
		Ext.apply(me.store.getProxy().extraParams,me.winParam);
		Ext.apply(me.store.proxy.extraParams, {usePaging:false});//不分页
		me.store.load({callback:function(recs){
			me.store.sort('mjms','ASC');
		}});
		Ext.apply(this, {
					items : [{
								xtype : 'panel',
								layout : 'fit',
								tbar:[
								      '关键字', 
					                  {
								    	  xtype : 'textfield',
											itemId : 'searchfield',	
											hiddenLabel : true,
											enableKeyEvents :true,
											width:220,
											emptyText:'请输入名称..' ,
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
														text : '编号',
														dataIndex : 'mjxl',
														flex : 1
													}, {
														text : '名称',
														dataIndex : 'mjms',
														flex : 1
													}, {
													    text:'备注',
													    dataIndex:'mjbz',
													    flex:1
													}
													]
//											,dockedItems : [{
//														xtype : 'pagingtoolbar',
//														store : me.store,
//														dock : 'bottom',
//														displayInfo : true
//													}]

										}]
							}]
				});
		this.callParent(arguments);
	}
});