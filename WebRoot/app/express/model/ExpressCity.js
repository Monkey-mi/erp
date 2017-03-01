Ext.define('erp.express.model.ExpressCity', {
	extend: 'erp.common.basic.model.Model',
	idProperty: 'id',
	fields: [
		{ name:'tablename',defaultValue:'kd_city'},
		{ name: 'id', type: 'int' },
		{ name: 'name' },
		{ name: 'oo'}
	]
});
