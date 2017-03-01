Ext.define('erp.view.purchaseOrder.model.PriceSearch', {
	extend: 'Ext.data.Model',
	idProperty: 'htbh,htxh',
	fields: [
		{ name: 'htbh', type: 'int' },
		{ name: 'htxh', type: 'int' },
		{ name: 'hth' },
		{ name: 'clhh' },
		{ name: 'cltx1' },
		{ name: 'cltx2' },
		{ name: 'cltx3' },
		{ name: 'jldw' },
		{ name: 'cgsl', type: 'float' },
		{ name: 'kzdj', type: 'float' },
		{ name: 'fzkj', type: 'float' },
		{ name: 'fzdw' },
		{ name: 'fzsl', type: 'float' },
		{ name: 'cgdj', type: 'float' },
		{ name: 'fzdj', type: 'float' },
		{ name: 'cgje', type: 'float' },
		{ name: 'clmc' },
		{ name: 'fzzbj', type: 'int' }
	]
});
