Ext.define('erp.basicdata.level.model.MaterialLevel', {
	extend: 'erp.basic.model.Model',
	idProperty: 'level_id',
	identifier:'negative',
	fields: [
		{ name: 'level_id', type: 'int' },
		{ name: 'level_name' },
		
		{ name:'oo'}
	]
});
