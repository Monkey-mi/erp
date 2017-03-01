Ext.define('erp.master.vendorFiles.store.VendorAttachment', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.vendorFiles.model.VendorAttachment'],
	model: 'erp.master.vendorFiles.model.VendorAttachment',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {read : 'POST'},
		api: {
		read: 'vendorfiles/vendorfiles.act?method=getVendorAttachmentList'
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		},
		writer: {
			type: 'json',
			rootProperty: 'data',
			encode: true,
			writeAllFields:true,
			allowSingle: false
		}
	},
	sorter: [{
		property: 'csbh',
		direction: 'ASC'
	}]
});
