Ext.define('erp.view.purchaseUrge.model.ConfirmTime', {
	extend: 'Ext.data.Model',
	idProperty: 'hth',
	fields: [
		{ name: 'htbh', type: 'int' },
		{ name: 'htxh', type: 'int' },
		{ name: 'hth' },
		{ name: 'clmc' },
		{ name: 'cltx1' },
		{ name: 'cgsl', type: 'float' },
		{ name: 'wkjq', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'csbh' },
		{ name: 'sxrq', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'qrjq', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'zczy' },
		{ name:'zxqrrm'},
		{ name:'csmc'}
	]
});
