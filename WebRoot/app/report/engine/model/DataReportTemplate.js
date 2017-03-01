Ext.define('erp.report.engine.model.DataReportTemplate', {
	extend: 'Ext.data.Model',
	idProperty: 'tpl_id',
	fields: [
		{ name: 'tpl_id', type: 'int' },
		{ name: 'name' },
		{ name: 'code' },
		{ name: 'b_code' },
		{ name: 'description' },
		{ name: 'ou_code' },
		{ name: 'd_code' },
		{ name: 'type' },
		{ name: 'tpl_xml'},
		{ name: 'creator' },
		{ name: 'create_date', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'valid' },
		{ name: 'list_id',type:'int' }
	]
});
