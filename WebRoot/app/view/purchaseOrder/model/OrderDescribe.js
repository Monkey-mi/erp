Ext.define('erp.view.purchaseOrder.model.OrderDescribe', {
	extend: 'Ext.data.Model',
	idProperty: 'clhh',
	fields: [
		{ name: 'ddbh', type: 'int' },
		{ name: 'ddxh', type: 'int' },
		{ name: 'mbbh', type: 'int' },
		{ name: 'msxh', type: 'int' },
		{ name: 'xmmc' },
		{ name: 'xmms' },
		{ name: 'bj', type: 'int' },
		{ name: 'pxxh', type: 'int' },
		{ name: 'zycd', type: 'int' },
		{ name: 'xmms_yf' },
		{ name: 'qrbj', type: 'int' },
		{ name: 'wcbj', type: 'int' },
		{ name: 'wcrm' },
		{ name: 'wcsj', type: 'date', dateFormat: 'Y-m-d H:i:s' }
	]
});
