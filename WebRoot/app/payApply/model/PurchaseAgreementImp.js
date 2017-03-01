Ext.define('erp.payApply.model.PurchaseAgreementImp', {
	extend: 'Ext.data.Model',
	idProperty: 'htbh',
	fields: [
		{ name: 'htbh', type: 'float' },
		{ name: 'cgrq', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'csbh' },
		{ name: 'hsbm' },
		{ name: 'bmmc' },
		{ name: 'htze', type: 'float' },
		{ name: 'yrje', type: 'float' },
		{ name: 'wrje', type: 'float' },
		{ name: 'wbze', type: 'float' },
		{ name: 'yrwb', type: 'float' },
		{ name: 'wrwb', type: 'float' },
		{ name: 'cglb' },
		{ name: 'lbmc' },
		{ name: 'ztdw' },
		{ name: 'ztmc' },
		{ name: 'yhbh' },
		{ name: 'csmc' },
		{ name: 'wbbh' },
		{ name: 'wbdh' },
		{ name: 'cghtb_wcbj', type: 'int' }
	]
});
