Ext.define('erp.express.model.City', {
	extend: 'erp.common.basic.model.Model',
	idProperty: 'id',
	fields: [
		{ name: 'id' },
		{ name: 'code' },
		{ name: 'name' },
		{ name: 'provincecode' }
	]
});
