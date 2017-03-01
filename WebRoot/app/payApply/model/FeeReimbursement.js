Ext.define('erp.payApply.model.FeeReimbursement', {
	extend: 'Ext.data.Model',
	idProperty: 'sqbh'+'sqxh',
	fields: [
		{ name: 'sqbh', type: 'float' },
		{ name: 'sqxh', type: 'float' },
		{ name: 'hsbm' },
		{ name: 'bmmc' },
		{ name: 'jlbh', type: 'float' },
		{ name: 'jlxh', type: 'float' },
		{ name: 'bxh' },
		{ name: 'bxje', type: 'float' },
		{ name: 'sqje', type: 'float' },
		{ name: 'yfje', type: 'float' },
		{ name: 'wbbh' },
		{ name: 'wbdh' },
		{ name: 'wbhl', type: 'float' },
		{ name: 'wbje', type: 'float' },
		{ name: 'wbsq', type: 'float' }
	]
});
