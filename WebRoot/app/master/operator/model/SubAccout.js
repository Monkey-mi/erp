Ext.define('erp.master.operator.model.SubAccout', {
    extend: 'erp.common.basic.model.Model',
	identifier:'negative',
	idProperty: 'sa_id',
	fields: [
		{ name: 'sa_id' },
		{ name: 'org_id', type: 'int' },
		{ name: 'role_id', type: 'int' },
		{ name: 'reg_id', type: 'int' },
		{ name: 'sa_name' },
		{ name: 'sa_password' },
		{ name: 'enabled', type: 'int' },
		{ name: 'create_date', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'username' },
		{ name: 'phone' },
		{ name: 'role_name' },
		{ name: 'last_login_ip' }
	]
});
