Ext.define('erp.purchaseInspectionManage.model.PurchaseInspectionPono', {
	extend: 'Ext.data.Model',
	idProperty: '',
	fields: [
		{ name: 'sjly' },
		{ name: 'ddbh', type: 'float' },
		{ name: 'ddxh', type: 'float' },
		{ name: 'pono' },
		{ name: 'fach' },
		{ name: 'khxh' },
		{ name: 'ywms' },
		{ name: 'pono_bj', type: 'int' },
		{ name: 'fach_bj', type: 'int' },
		{ name: 'khxh_bj', type: 'int' },
		{ name: 'ywms_bj', type: 'int' }
	]
});
