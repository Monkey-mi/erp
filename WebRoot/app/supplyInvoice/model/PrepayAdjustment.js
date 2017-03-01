Ext.define('erp.supplyInvoice.model.PrepayAdjustment', {
	extend: 'Ext.data.Model',
	idProperty: '',
	fields: [
		{ name: 'sdbj', type: 'int'  },
		{ name: 'tzdh', type: 'float' },
		{ name: 'tzrq', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'tzlx'},
		{ name: 'tzxh', type: 'float' },
		{ name: 'yfhtbh', type: 'float' },
		{ name: 'yffydh'},
		{ name: 'tzfplb'},
		{ name: 'tzfphm'},
		{ name: 'tzje', type: 'float' },
		{ name: 'tzyy'},
		{ name: 'bzsm'},
		{ name: 'sdrm'},
		{ name: 'sdsj', type: 'date', dateFormat: 'Y-m-d H:i:s' }
	]
});