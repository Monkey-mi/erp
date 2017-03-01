Ext.define('erp.basicdata.companyClass.controller.CompanyClassCtrl', {
	extend : 'Ext.app.Controller',
	requires : [
				'erp.ux.PagingBar',
				'erp.basicdata.companyClass.store.CompanyClass'
				],
	views:[
			'erp.basicdata.companyClass.view.CompanyClassManager'
		],
	refs:[
		{ref:'companyClassManager',selector:'companyClassManager'},
		{ref:'grid_companyclass',selector:'companyClassManager #grid_companyclass'}
		],
	init : function() {
		// controller只初始化一次
		var me = this;
		if (me.isInited)
			return;
		me.control({
			'companyClassManager':{
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