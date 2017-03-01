Ext.define('erp.payApply.model.AgreementInfo', {
	extend: 'Ext.data.Model',
	idProperty: 'htbh',
	fields: [
		{ name: 'htbh', type: 'float' },
		{ name: 'csbh' },
		{ name: 'csmc' },
		{ name: 'htze', type: 'float' },
		{ name: 'sqze', type: 'float' },
		{ name: 'kspzq', type: 'float' }
	]
});
