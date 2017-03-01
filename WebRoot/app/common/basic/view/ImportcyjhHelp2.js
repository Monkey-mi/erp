/**
 * 出货编号导入
 */
Ext.define('erp.common.basic.view.ImportcyjhHelp2', {
	extend : 'erp.common.basic.view.helpwin.BaseHelpWin',
	alias : 'widget.Importcyjh2_help',
	title : '出货编号导入',
	iconCls:'box',
	requires : ['erp.express.store.ShipmentForHelp'],
	width : 800,
	height : 0.6 * window.screen.height,
	resizable : false,
	modal : true,
	initComponent : function() {
		var me = this;				
		me.store = Ext.create('erp.express.store.ShipmentForHelp');
		delete me.store.proxy.extraParams.gdbj;
		me.store.proxy.extraParams.usePaging=true;
		me.store.load();
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
											emptyText:'请输入出运编号' ,
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
														text : '出运编号',
														dataIndex : 'cybh',
														width :60
													}, {
														text : '销售类别',
														dataIndex : 'xslbmc',
														width :60
													}, {
													    text:'运输类型',
													    dataIndex:'yslx',
													    width :60
													}, {
													    text:'客户名称',
													    dataIndex:'khmc',
													    width :200
													}, {header:'提单号',
														width:80,
														dataIndex:'tdhm'
													}, {
														header: '出货日期',dataIndex: 'chsj',width:100,renderer:function(value){
															if(value!=null){
																return Ext.Date.format(value, 'Y-m-d');  
															}
														}
													},{
													    text:'业务员',
													    dataIndex:'ywymc',
													    width :100
													}, {
														header: '拖柜日期',dataIndex: 'cysj',width:100,renderer:function(value){
															if(value!=null){
																return Ext.Date.format(value, 'Y-m-d');  
															}
														}
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