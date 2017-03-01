Ext.define('erp.master.vendorFiles.store.VendorFiles', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.vendorFiles.model.VendorFiles'],
	model: 'erp.master.vendorFiles.model.VendorFiles',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'vendorfiles/vendorfiles.act?method=addVendorFiles',
			update: 'vendorfiles/vendorfiles.act?method=updateVendorFiles',
			read: 'vendorfiles/vendorfiles.act?method=getVendorFilesList',
			destroy: 'vendorfiles/vendorfiles.act?method=deleteVendorFiles'
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
