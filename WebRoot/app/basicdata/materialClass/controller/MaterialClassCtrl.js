Ext.define('erp.basicdata.materialClass.controller.MaterialClassCtrl', {
	extend : 'Ext.app.Controller',
	requires : [
				'erp.ux.PagingBar'
				,'erp.basicdata.materialClass.store.MaterialClassTree'
				,'erp.basicdata.materialClass.store.MaterialClass'
				,'erp.master.caterialPricePurchase.store.MaterialClass'
				,'erp.basicdata.level.store.MaterialLevel'
				],
	views:[
	        'erp.ux.ComboxTree',
			'erp.basicdata.materialClass.view.MaterialClassManager'
		],
	refs:[
		{ref:'materialClassManager',selector:'materialClassManager'},
		{ref:'grid_materialClass',selector:'materialClassManager #grid_materialClass'},
		{ref:'treepanel',selector:'materialClassManager treepanel'}
		],
	init : function() {
		// controller只初始化一次
		var me = this;
		if (me.isInited)
			return;
		me.control({
			'materialClassManager':{
				afterrender:function(cmp){
					me.store=cmp.store;
					me.treeStore=cmp.treeStore;
					me.store.load();
					me.treeStore.load();
				},
				beforedestroy:function(){
					delete me.store.proxy.extraParams.nodeIdForGrid;
				}
			},
			'materialClassManager  tool':{
			 	click : function(tool, e, eOpts) {
					if (tool.type == 'refresh') {
						me.treeStore.load();
					}
				}
			},
			'materialClassManager treepanel':{
				select :me.onSelectModule
			}
		});
		me.isInited=true;
	},
	onSelectModule:function(){
		var me=this;
		var treepanel=me.getTreepanel();
		var rec=treepanel.getSelectionModel().getSelection()[0];
		var nodeIdForGrid=rec.get('id');
		Ext.apply(me.store.proxy.extraParams, {'nodeIdForGrid':nodeIdForGrid});//----关闭时，要删除
		me.store.loadPage(1);
	}
});