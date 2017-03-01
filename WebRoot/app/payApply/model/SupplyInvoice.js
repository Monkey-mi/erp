Ext.define('erp.payApply.model.SupplyInvoice', {
	extend: 'Ext.data.Model',
	idProperty: 'sqbh'+'sqxh',
	fields: [
		{ name: 'sqbh', type: 'float' },
		{ name: 'sqxh', type: 'float' },
		{ name: 'fplb'},
		{ name: 'fphm'},
		{ name: 'hsbm'},
		{ name: 'bmmc'},
		{ name: 'jzrq', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'fpje', type: 'float' },
		{ name: 'sqje', type: 'float' },
		{ name: 'wbbh'},
		{ name: 'wbdh'},
		{ name: 'wbhl', type: 'float' },
		{ name: 'wbje', type: 'float' },
		{ name: 'wbsq', type: 'float' },
		{ name: 'kprq', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'ycbj', type: 'int' }
	]
});