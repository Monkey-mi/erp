Ext.define('erp.master.vendorFiles.model.VendorAttachment', {
	extend: 'Ext.data.Model',
	idProperty: 'csbh',
	fields: [
		{ name: 'csbh' },
		{ name: 'wjbh', type: 'float' },
		{ name: 'wjmc' },
		{ name: 'wjlj' },
		{ name: 'wjrq', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'cjrm' }
	]
});
