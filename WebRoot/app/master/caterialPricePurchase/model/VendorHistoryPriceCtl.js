Ext.define('erp.master.caterialPricePurchase.model.VendorHistoryPriceCtl', {
	extend: 'Ext.data.Model',
	idProperty: 'jlxh',
	fields: [
		{ name: 'jlxh', type: 'float' },
		{ name: 'clhh' },
		{ name: 'csbh' },
		{ name: 'zdcgl', type: 'float' },
		{ name: 'zxbzl', type: 'float'},
		{ name: 'ghzq', type: 'float' },
		{ name: 'kzdj', type: 'float' },
		{ name: 'csxh' },
		{ name: 'bzsm' },
		{ name: 'xgsj', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'csmc'},
		{ name: 'wbbh'},
		{ name: 'yhbh'},
		{ name: 'cglb'},
		{ name: 'wbdh'}
	]
});
