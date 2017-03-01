Ext.define('erp.basicdata.accessEvaluateOptions.controller.AccessEvaluteOptionCtrl', {
	extend : 'Ext.app.Controller',
	requires : [
				'erp.ux.PagingBar',
				'erp.supplierAccess.store.EvaluateItemTree'				
				],
	views:[
			'erp.basicdata.accessEvaluateOptions.view.AccessEvaluterOptionManager'
		],
	refs:[
		{ref:'accessEvaluterOptionManager',selector:'accessEvaluterOptionManager'},
		{ref:'treepanel',selector:'accessEvaluterOptionManager treepanel'}
		],
	init : function() {
		// controller只初始化一次
		var me = this;
		if (me.isInited)
			return;
		me.control({
			'accessEvaluterOptionManager':{
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
			'accessEvaluterOptionManager  tool':{
			 	click : function(tool, e, eOpts) {
					if (tool.type == 'refresh') {
						me.treeStore.load();
					}
				}
			},
			'accessEvaluterOptionManager treepanel':{
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