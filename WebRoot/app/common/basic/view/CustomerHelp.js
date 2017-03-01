/**
 * 客户帮助窗口
 */
Ext.define('erp.common.basic.view.CustomerHelp', {
	extend : 'erp.common.basic.view.helpwin.BaseHelpWin',
	alias : 'widget.customer_help',
	title : '客户帮助窗口',
	iconCls:'box',
	requires : ['erp.master.customer.store.CustomersForHelp'],
	width : 500,
	height : 0.6 * window.screen.height,
	resizable : false,
	modal : true,
	initComponent : function() {
		var me = this;
		me.store = Ext.create('erp.master.customer.store.CustomersForHelp');
		me.store.proxy.extraParams.usePaging=true;
		me.winParam={spbj:1,khzt:1};
		me.store.proxy.extraParams.spbj=1;
		me.store.proxy.extraParams.khzt=1;
		me.store.load();
		this.on('beforedestroy',function(){
 			delete me.store.proxy.extraParams.condition;
 		});
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
											width:140,
											emptyText:'请输入..' ,
											listeners:{
												keyup:function(field,e,o){	
													var searchText = me.down('#searchfield');
													Ext.apply(me.store.proxy.extraParams,{
														condition_2:searchText.getValue(),
														bykhmc:me.down('#bykhmc').getValue()?1:0,
														bykhbh:me.down('#bykhbh').getValue()?1:0
													});
													var selModel=me.down('grid').getSelectionModel();
													if(e.getKey()==e.ENTER){
														me.store.loadPage(1,{ 
															callback:function(recs){
																if(recs.length>0){
																	selModel.select(0);
																}
															}
														});
													}
												}
											}
										}, {
											xtype : 'button',
											text : '搜索',
											iconCls:'query',
											itemId:'search',
											handler:function() {
												var searchText = me.down('#searchfield');
												Ext.apply(me.store.proxy.extraParams,{
													condition_2:searchText.getValue(),
													bykhmc:me.down('#bykhmc').getValue()?1:0,
													bykhbh:me.down('#bykhbh').getValue()?1:0
												});
												var grid = me.down('grid');
												var columns = grid.columns;		
												var selModel = grid.getSelectionModel();
												me.store.loadPage(1,{
															callback : function(recs) {
																if (recs.length > 0) {
																	selModel.select(0);
																}
															}
														});
											}
										}, {
											xtype : 'button',
											iconCls:'arrow_refresh',
											text : '刷新',
											handler:me.refreshClick
										}, {
											xtype : 'checkbox',
											boxLabel : '按客户搜',
											itemId:'bykhmc',
											checked :true
										}, {
											xtype : 'checkbox',
											boxLabel : '按编号搜',
											itemId:'bykhbh'
										}
								      ],
								items : [{
											xtype : 'grid',
											store : me.store,
											columns : [{
														text : '客户编号',
														dataIndex : 'khbh',
														flex : 1
													}, {
														text : '客户名称',
														dataIndex : 'khmc',
														flex : 1
													}, {
													    text:'客户简称',
													    dataIndex:'khjc',
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