Ext.define('erp.express.controller.ProvinceCityCtrl', {
	extend : 'Ext.app.Controller',
	requires : [
				'erp.ux.PagingBar',
				'erp.ux.QueryPanel',
				'erp.express.store.Province',
				'erp.express.store.City'
				],
	views:[
			'erp.express.view.ProvinceCityManager'
		],
	refs:[
			{ref:'provinceCity',selector:'mng_ProvinceCity'}
			
			],
	init : function() {
		// controller只初始化一次
		var me = this;
		if (me.isInited)
			return;
		me.control({
			
		});
		me.isInited=true;
	}
})