Ext.define('erp.basicdata.accessEvaluateOptions.model.AccessEvaluterOption', {
	extend: 'erp.basic.model.Model',
	idProperty: 'item_id',
	identifier:'negative',
	fields: [
		{ name: 'item_id', type: 'int' },
		{ name: 'item_name' },
		{ name: 'f_id', type: 'int' },
		{ name: 'activity_status', type: 'int'},
		{ name: 'weightValue',type:'float'},
		{ name:'oo'}
	]
});
