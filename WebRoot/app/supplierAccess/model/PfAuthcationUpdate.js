Ext.define('erp.supplierAccess.model.PfAuthcationUpdate', {
	extend: 'Ext.data.Model',
	idProperty: 'auth_update_id',
	fields: [
		{ name: 'auth_update_id', type: 'int' },
		{ name: 'company_id', type: 'int' },
		{ name: 'class_id' },
		{ name: 'nature_id' },
		{ name: 'cpyname_cn' },
		{ name: 'contact_addr_code', type: 'int' },
		{ name: 'contact_addr' },
		{ name: 'industry_id', type: 'int' },
		{ name: 'f_phone' },
		{ name: 'corporation' },
		{ name: 'reg_fund', type: 'float' },
		{ name: 'currency_id', type: 'int' },
		{ name: 'establish_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'created_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'state', type: 'int' },
		{ name: 'nature_name' },
		{ name: 'industry_name' },
		{ name: 'class_name' },
		{ name: 'currency_name' },
		{ name: 'bus_license' },
		{ name: 'tax_certificate' },
		{ name: 'org_code' },
		{ name: 'rat_certificate' }
	]
});
