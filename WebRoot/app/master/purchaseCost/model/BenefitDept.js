Ext.define('erp.master.purchaseCost.model.BenefitDept', {
	extend: 'Ext.data.Model',
	idProperty: 'bmbh',
	fields: [
		{ name: 'bmbh' },
		{ name: 'bmmc' },
		{ name: 'bmjc', type: 'int' },
		{ name: 'mjbz', type: 'int' },
		{ name: 'tybj', type: 'int' },
		{ name: 'hsbm' }
	]
});
