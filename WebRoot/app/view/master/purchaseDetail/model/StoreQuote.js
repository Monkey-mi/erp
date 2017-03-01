Ext.define('erp.view.master.purchaseDetail.model.StoreQuote', {
	extend: 'Ext.data.Model',
	idProperty: 'ckbh',
	fields: [
		{ name: 'ckbh' },
		{ name: 'ckmc' },
		{ name: 'tybj', type: 'int' },
		{ name: 'bpbj', type: 'int' },
		{ name: 'bcpbj', type: 'int' },
		{ name: 'qynf', type: 'int' },
		{ name: 'yhbh' },
		{ name: 'hsbm' },
		{ name: 'fscbj', type: 'int' },
		{ name: 'hsjc', type: 'int' }
	]
});
