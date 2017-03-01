Ext.define('erp.materialConfirmation.model.MaterialCheckAccessory', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'company_id', type: 'int' },
		{ name: 'wjbh', type: 'float' },
		{ name: 'wjmc' },
		{ name: 'wjlj' },
		{ name: 'cjrm' },
		{ name: 'bzsm' },
		{ name: 'fjlx', type: 'int' },
		{ name: 'ptsc', type: 'int' },
		{ name: 'fjzt', type: 'int' },
		{ name: 'scrq', type: 'date', dateFormat: 'Y-m-d H:i:s'}
	]
});