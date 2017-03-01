/**
 * 厂商信息帮助窗口
 */
Ext.define('erp.common.basic.view.FactoryInfo', {
	extend : 'erp.common.basic.view.helpwin.BaseHelpWin',
	alias : 'widget.factoryInfo_help',
	title : '厂商信息帮助窗口',
	requires : ['erp.view.master.company.store.CompanyShow'],
	width : 600,
	height : 0.6 * window.screen.height,
	initComponent : function() {
		var me = this;
		if(me.store==null){
			me.store = Ext.create('erp.view.master.company.store.CompanyShow');
		}
		Ext.apply(me.store.getProxy().extraParams,me.winParam);
		me.store.load();
		Ext.apply(this, {
					items : [{
								xtype : 'panel',
								layout : 'fit',
								tbar:[
								      '厂商名称', 
					                  {
								    	  xtype : 'textfield',
											itemId : 'searchfield',	
											hiddenLabel : true,
											enableKeyEvents :true,
											width:220,
											emptyText:'厂商名称、简称..' ,
											listeners:{
												keyup:me.newonKeyup
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
														text : '厂商编号',
														dataIndex : 'csbh',
														width:80
													}, {
														text : '厂商名称',
														dataIndex : 'csmc',
														flex:1
													}, {
														text : '厂商简称',
														dataIndex : 'csjc',
														width:80
													}, {
													    text:'厂商类型',
													    dataIndex:'cslx',
													    width:80
													}, {
													    text:'厂商类别',
													    dataIndex:'cslb',
													    width:120
													}
													],
											dockedItems:[{
									    		xtype : 'pagingbar',
							                    stateId : '8081d6fdasd3-9db7-470d-b764-dbb70c5e81b1',
									    		dock:'bottom',
									    		displayInfo:true,
									    		defaultPageSize : 20,
									    		store:me.store
									    	}]
										}]
							}]
				});
		this.callParent(arguments);
	},
	newonKeyup:function(field,e,o){//重写父类的方法，将load改为loadPage方法，因为如果不是在第一页筛选，就会将取出的store，不从第一页显示 王志国
		var selModel=this.up('window').down('grid').getSelectionModel();
		if(e.getKey()==e.ENTER){
			this.up('window').store.loadPage(1,{ 
				params:{
					mode:'allSearch',
					condition:field.getValue()
				},
				callback:function(recs){
					if(recs.length>0){
					selModel.select(0);
					}
				}
			});
		}
	}
});