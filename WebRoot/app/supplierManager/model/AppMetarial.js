/*公司产品主要用料表*/
Ext.define('erp.supplierManager.model.AppMetarial', {
	extend: 'Ext.data.Model',
	idProperty: 'material_id',
	identifier:'negative',
	fields: [
		{ name: 'material_id', type: 'int' },
		{ name: 'material_name' },
		{ name: 'material_brand' },
		{ name: 'company_id', type: 'int' }
	]
});
