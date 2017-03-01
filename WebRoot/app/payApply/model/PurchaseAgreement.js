Ext.define('erp.payApply.model.PurchaseAgreement', {
	extend: 'Ext.data.Model',
	idProperty: 'sqbh'+'sqxh',
	fields: [
		{ name: 'sqbh', type: 'float' },
		{ name: 'sqxh', type: 'float' },
		{ name: 'hsbm'},
		{ name: 'bmmc'},
		{ name: 'htbh', type: 'float' },
		{ name: 'htze', type: 'float' },
		{ name: 'wbje', type: 'float' },
		{ name: 'sqje', type: 'float' },
		{ name: 'yfje', type: 'float' },
		{ name: 'wbze', type: 'float' },
		{ name: 'yfwb', type: 'float' },
		{ name: 'yfkbj', type: 'int'}
	]
});