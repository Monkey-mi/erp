Ext.define('erp.master.vendorFiles.store.UseVendorFiles', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.vendorFiles.model.UseVendorFiles'],
	model: 'erp.master.vendorFiles.model.UseVendorFiles',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {read : 'POST'},
		api: {
			read: 'vendorfiles/vendorfiles.act?method=getUseConsumerList'
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
