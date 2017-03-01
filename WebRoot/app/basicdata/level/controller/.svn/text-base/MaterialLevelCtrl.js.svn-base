Ext.define('erp.basicdata.level.controller.MaterialLevelCtrl', {
	extend : 'Ext.app.Controller',
	requires : [
				'erp.ux.PagingBar',
				'erp.basicdata.level.store.MaterialLevel'
				],
	views:[
			'erp.basicdata.level.view.MaterialLevelManager'
		],
	refs:[
		{ref:'materialLevelManager',selector:'materialLevelManager'},
		{ref:'grid_materialLevel',selector:'materialLevelManager #grid_materialLevel'}
		],
	init : function() {
		// controller只初始化一次
		var me = this;
		if (me.isInited)
			return;
		me.control({
			'materialLevelManager':{
				afterrender:function(cmp){
					me.store=cmp.store;
					me.store.load();
				},
				beforedestroy:function(){
					
				}
			}
		});
		me.isInited=true;
	}
});