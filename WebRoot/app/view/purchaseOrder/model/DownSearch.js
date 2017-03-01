Ext.define('erp.view.purchaseOrder.model.DownSearch', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'clmc' },
		{ name: 'ddh' },
		{ name: 'jhh' },
		{ name: 'cgh' },
		{ name: 'topping5' ,type: 'boolean', defaultValue: false},
		{ name: 'topping1' ,type: 'boolean', defaultValue: false},
		{ name: 'topping2' ,type: 'boolean', defaultValue: false},
		{ name: 'topping3' ,type: 'boolean', defaultValue: false},
		{ name: 'topping4' ,type: 'boolean', defaultValue: false}
	]
});
