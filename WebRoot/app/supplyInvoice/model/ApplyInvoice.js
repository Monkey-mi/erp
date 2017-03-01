Ext.define('erp.supplyInvoice.model.ApplyInvoice', {
	extend: 'Ext.data.Model',
	idProperty: 'fplb'+'fphm',
	fields: [
		{ name: 'sqbh', type: 'float' },
		{ name: 'sqxh', type: 'float' },
		{ name: 'sqje', type: 'float' },
		{ name: 'yfje', type: 'float' },
		{ name: 'fplb'},
		{ name: 'fphm'}
	]
});