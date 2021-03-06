Ext.define('erp.view.purchaseOrder.model.OutSourceImp', {
	extend: 'Ext.data.Model',
	idProperty: 'jhh',
	fields: [
		{ name: 'ddbh', type: 'int' },
		{ name: 'ddxh', type: 'int' },
		{ name: 'jhbh', type: 'int' },
		{ name: 'jhxh', type: 'int' },
		{ name: 'jhh' },
		{ name: 'cpbh' },
		{ name: 'jldw' },
		{ name: 'cpbz' },
		{ name: 'jhsl', type: 'float' },
		{ name: 'tcsl', type: 'float' },
		{ name: 'wtsl', type: 'float' },
		{ name: 'bctc', type: 'float' },
		{ name: 'fdbl', type: 'float' },
		{ name: 'jgsl', type: 'float' },
		{ name: 'sxrq', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'wcrq', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'qfbj', type: 'int' },
		{ name: 'cpmc' },
		{ name: 'clhh' },
		{ name: 'clmc' },
		{ name: 'jhbz' },
		{ name: 'scyq' },
		{ name: 'jhlb' },
		{ name: 'xzbj', type: 'int' },
		{ name: 'kjbj', type: 'int' },
		{ name: 'plmth' },
		{ name: 'plmtx' },
		{ name:'jhlbmc'}
	]
});
