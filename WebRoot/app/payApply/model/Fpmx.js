Ext.define('erp.payApply.model.Fpmx', {
	extend: 'Ext.data.Model',
	idProperty: '',
	fields: [
		{ name: 'fplx' },
		{ name: 'fplb' },
		{ name: 'fphm' },
		{ name: 'kprq', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'jzrq', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'fpsl', type: 'float' },
		{ name: 'fpje', type: 'float' },
		{ name: 'yfkje', type: 'float' },
		{ name: 'sqje', type: 'float' },
		{ name: 'yhbh' },
		{ name: 'wsqe', type: 'float' }
	]
});
