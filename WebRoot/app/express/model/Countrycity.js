Ext.define('erp.express.model.Countrycity', {
	extend: 'erp.common.basic.model.Model',
	idProperty: 'country_id,city_id',
	fields: [
		{ name:'tablename',defaultValue:'countrycity'},
		{ name: 'country_id', type: 'int' },
		{ name: 'city_id', type: 'int' },
		{ name: 'name'},
		{ name:'oo'}
	]
});
