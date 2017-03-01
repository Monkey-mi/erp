Ext.define('erp.express.model.Province', {
	extend: 'erp.common.basic.model.Model',
	idProperty: 'id',
	fields: [
		{ name:'tablename',defaultValue:'province'},
		{ name: 'id' },
		{ name: 'code' },
		{ name: 'name' },
		{ name: 'oo'}
	]
});
