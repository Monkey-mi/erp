Ext.define('erp.report.engine.model.UserDefineReport', {
	extend: 'Ext.data.Model',
	idProperty: 'rpt_id',
	fields: [
		{ name: 'rpt_id', type: 'int' },
		{ name: 'report_name'},
		{ name: 'report_year',type:'int' },
		{ name: 'month',type:'int' },
		{ name: 'cycle_data'},
		{ name: 'remark' },
		{ name: 'create_dt',type:'date',dateFormat: 'Y-m-d H:i:s' },
		{ name: 'list_id',type:'int' },
		{ name: 'report_content' }
	]
});
