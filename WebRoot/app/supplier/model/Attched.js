Ext.define('erp.supplier.model.Attched', {
	extend: 'erp.basic.model.Model',
	idProperty: 'id',
	identifier:'negative',
	fields: [
		{ name: 'id', type: 'int' },
		{ name: 'company_id', type: 'int' },
		{ name: 'file_name' },
		{ name: 'file_path' },
		{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'file_format' },
		{ name: 'ismust', type:'boolean' },
		{ name: 'remark' },
		{name:'iscustom',type:'boolean'}
	]
});
