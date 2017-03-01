Ext.define('erp.express.model.ExpressMoney', {
	extend: 'erp.common.basic.model.Model',
	idProperty: 'id',
	fields: [
		{ name:'tablename',defaultValue:'kd_money'},
		{ name: 'id', type: 'int' },
		{ name: 'country_id', type: 'int' },
		{ name: 'city_id', type: 'int' },
		{ name: 'csbh' },
		{ name: 'csmc' },
		{ name: 'special',type:'int'},//快递类型
		{ name: 'zl', type: 'float' },
		{ name: 'fy', type: 'float' },
		{ name: 'zfy', type: 'float' }//辅助
	]
});
