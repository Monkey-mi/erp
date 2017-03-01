Ext.define('erp.basicdata.companyClass.model.CompanyClass', {
	extend: 'erp.basic.model.Model',
	identifier:'negative',
	idProperty: 'nature_id',
	fields: [
		{ name: 'nature_id', type: 'int' },
		{ name: 'nature_name' },
		{ name: 'f_id', type: 'int' },
		{ name:'oo'}
	]
});
