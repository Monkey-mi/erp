/**
 * 产品帮助窗口
 */
Ext.define('erp.common.basic.view.ProductionHelp', {
	extend : 'erp.common.basic.view.helpwin.BaseHelpWin',
	alias : 'widget.production_help',
	title : '产品帮助窗口',
	requires : ['erp.master.production.store.Production','erp.master.production.store.ProductionTypeTree'],
	width : 800,
	height : 0.6 * window.screen.height,
	resizable : false,
	modal : true,
	initComponent : function() {
		var me = this;
		me.typeStore = Ext.create('erp.master.production.store.ProductionTypeTree');
		Ext.apply(me.store.getProxy().extraParams,me.winParam);
		me.store.load();
		//修改：窗口关闭后清除筛选条件
		this.on('beforedestroy',function(){
 			delete me.store.proxy.extraParams.condition;
 		});
		Ext.apply(this, {
					layout:{type:'hbox',align: 'stretch',defaultMargins:{right:5}},
					items : [
						{xtype:'treepanel',
							flex:1,
							store:me.typeStore,
		    				useArrows: true,
							listeners:{
								select:function(panel,rec){me.doFilter(panel,rec)}
							}
					},
						{ 
								xtype : 'panel',
								layout : 'fit',
								flex:2,
								tbar:[
								      '关键字', 
					                  {
								    	  xtype : 'textfield',
											itemId : 'searchfield',	
											hiddenLabel : true,
											enableKeyEvents :true,
											width:300,
											emptyText:'请输入产品编号或产品名称..',
											//修改：相当于重写了onKeyup方法，解决翻页无效问题
											listeners:{
												keyup:function(field,e,o){
													var searchText = me.down('#searchfield');
													Ext.apply(me.store.proxy.extraParams,{
														condition:searchText.getValue()
													});
													var grid = me.down('grid');
													var columns = grid.columns;		
													var selModel = grid.getSelectionModel();
													if(e.getKey()==e.ENTER){
														me.store.loadPage(1,{
															callback : function(recs) {
																if (recs.length > 0) {
																	selModel.select(0);
																}
															}
														})
													}
												}
											}
										}, {
											xtype : 'button',
											text : '搜索',
											iconCls:'query',
											itemId:'search',
											//修改：相当于重写了searchClick方法，解决翻页无效问题
											handler:function(){
												var searchText = me.down('#searchfield');
												Ext.apply(me.store.proxy.extraParams,{
													condition:searchText.getValue()
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
												})
											}
										}, {
											xtype : 'button',
											iconCls:'arrow_refresh',
											text : '刷新',
											handler:me.refreshClick
										}
								      ],
								items : [{
											xtype : 'grid',
											store : me.store,
											selModel:Ext.create('Ext.selection.CheckboxModel'),
											columns : [{
														text : '半成品标记',
														dataIndex : 'bcpbj',
														xtype:'checkcolumn',
														width:100
													}, {
														text : '产品编号',
														dataIndex : 'cpbh',
														width:120
													}, {
														text : '产品图号',
														dataIndex : 'cpth',
														width:100
													},{
													    text:'产品名称',
													    dataIndex:'cpmc',
													    width:200
													},{
													    text:'单位',
													    dataIndex:'jldw',
													    width:80
													},
													{
													    text:'客户货号',
													    dataIndex:'khxh',
													    width:100
													},
													{
													    text:'原始编号',
													    dataIndex:'ysbh',
													    width:100
													},
													{
													    text:'原始名称',
													    dataIndex:'ysmc',
													    width:200
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
	},
	doFilter:function( panel,rec){
		Ext.apply(this.store.proxy.extraParams,{lbbh:rec.get('nodeId')});
		this.store.load();
	}
});