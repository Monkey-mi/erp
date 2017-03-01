Ext.define('erp.basicdata.industryClass.model.IndustryClass', {
	extend: 'Ext.data.Model',
	identifier:'negative',
	idProperty: 'industry_id',
	fields: [
		{ name: 'industry_id', type: 'int' },
		{ name: 'industry_name' }
	]
});
