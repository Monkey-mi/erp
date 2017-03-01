Ext.define('erp.master.vendorFiles.model.historyVendorFiles', {
	extend: 'Ext.data.Model',
	idProperty: 'csbh',
	fields: [
		{ name: 'csbh' },
		{ name: 'jlxh', type: 'float' },
		{ name: 'csmc' },
		{ name: 'czsj', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'czym' }
	]
});
