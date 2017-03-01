/*新供应商准入评估模板表*/
Ext.define('erp.supplierAccess.model.AccessBasetable', {
	extend: 'Ext.data.Model',
	idProperty: 'item_id',
	identifier:'negative',
	fields: [
		{ name: 'item_id', type: 'int' },
		{ name: 'item_name' },
		{ name: 'f_id', type: 'int' },
		{ name: 'Activity_status', type: 'int' }
	]
});
