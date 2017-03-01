Ext.define('erp.express.model.ExpressRyf', {
	extend: 'erp.common.basic.model.Model',
	idProperty: 'id',
	fields: [
		{ name:'tablename',defaultValue:'kd_ryf'},
		{ name: 'id', type: 'int' },
		{ name: 'csbh' },
		{ name: 'csmc' },
		{ name: 'nf', type: 'int' },
		{ name: 'yf', type: 'int' },
		{ name: 'ryf', type: 'float' }
		,{ name: 'oo'}
	]
});
