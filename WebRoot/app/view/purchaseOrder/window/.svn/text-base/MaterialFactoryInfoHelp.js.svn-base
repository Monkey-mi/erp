/**
 * 材料厂商信息帮助窗口
 */
Ext.define('erp.view.purchaseOrder.window.MaterialFactoryInfoHelp', {
	extend : 'erp.ux.Window',
	alias : 'widget.MaterialfactoryInfo_help',
	title : '材料厂商信息帮助窗口',
	requires : ['erp.view.master.company.store.CompanyShow'],
	width : 600,
	height : 0.6 * window.screen.height,
	frame:true,
	modal : true,
	initComponent : function() {
		var me = this;		
		me.store = Ext.create('erp.view.master.company.store.CompanyShow');
		console.log(me.callSearch);
		if(me.callSearch.t_clhh && me.callSearch.t_clhh!=''&&me.callSearch.storeType){
			me.store.getProxy().extraParams.storeType=me.callSearch.storeType;	
			me.store.getProxy().extraParams.clhh=me.callSearch.t_clhh;
		}else{
			delete me.store.getProxy().extraParams.storeType;
			delete me.store.getProxy().extraParams.clhh;
		}			
//		Ext.apply(me.store.getProxy().extraParams,me.winParam);
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
											handler:function(){
												me.store.loadPage(1);
											}
										}
								      ],
								items : [{
											xtype : 'grid',
											store : me.store,
											itemId : 'grd_MaterialFac',
											selModel:Ext.create('Ext.selection.CheckboxModel'),
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
										}],
					buttons:[{text:'确认',iconCls:'accept',itemId:'btn_confirm'},
                	{text:'关闭',iconCls:'cancel',
					 handler:function(){me.close();}}]
					}]
				});
		this.callParent(arguments);
	},
	searchClick:function(){
		var condition = this.up('window').down('#searchfield').getValue();
		me.store.getProxy().extraParams.condition=condition;
		me.store.load();
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