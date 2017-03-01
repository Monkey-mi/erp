Ext.define('erp.payApply.model.AdjustmentDetail', {
	extend: 'Ext.data.Model',
	idProperty: 'tzdh'+'tzxh',
	fields: [
		{ name: 'tzdh', type: 'float' },
		{ name: 'tzxh', type: 'float' },
		{ name: 'tzrq', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'tzlx' },
		{ name: 'sqbh', type: 'float' },
		{ name: 'tzhtbh', type: 'float' },
		{ name: 'mbhtbh', type: 'float' },
		{ name: 'tzfydh' },
		{ name: 'mbfydh' },
		{ name: 'tzhsbm' },
		{ name: 'mbhsbm' },
		{ name: 'tzje', type: 'float' },
		{ name: 'tzfplb' },
		{ name: 'tzfphm' },
		{ name: 'yfhtbh', type: 'float' },
		{ name: 'tzyy' },
		{ name: 'bzsm' },
		{ name: 'sdbj', type: 'int' },
		{ name: 'sdrm' },
		{ name: 'sdsj', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'czrm' },
		{ name: 'czsj', type: 'date', dateFormat: 'Y-m-d H:i:s' }
	]
});
