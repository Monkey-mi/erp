Ext.define('erp.supplier.model.Competitor', {
	extend: 'erp.basic.model.Model',
	idProperty: 'competitor_id',
	identifier:'negative',
	fields: [
		{ name: 'competitor_id', type: 'int' },
		{ name: 'competitor_name' },
		{ name: 'company_id', type: 'int' }
	]
});
