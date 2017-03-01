Ext.define('erp.setup.model.SerialRule', {
	extend: 'Ext.data.Model',
	idProperty: 'sr_id',
	fields: [
		{ name: 'sr_id', type: 'int' },
		{ name: 'code' },
		{ name: 'name' },
		{ name: 'len', type: 'int' },
		{ name: 'status_flg' ,defaultValue:'false' },
		{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'creator' }
	]
});
