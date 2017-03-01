Ext.define('erp.payApply.model.LinkedInvoice', {
	extend: 'Ext.data.Model',
	idProperty: 'fplb'+'fphm',
	fields: [
		{ name: 'fplb' },
		{ name: 'fphm' },
		{ name: 'kprq', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'jzrq', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'fpje', type: 'float' },
		{ name: 'sqje', type: 'float' },
		{ name: 'yfkje', type: 'float' },
		{ name: 'yfkwb', type: 'float' }
	]
});
