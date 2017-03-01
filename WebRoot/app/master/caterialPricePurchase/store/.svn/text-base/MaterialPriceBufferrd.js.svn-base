Ext.define('erp.master.caterialPricePurchase.store.MaterialPriceBufferrd', {
	extend: 'Ext.data.BufferedStore',
	reqiures: ['erp.master.caterialPricePurchase.model.MaterialPrice'],
	model: 'erp.master.caterialPricePurchase.model.MaterialPrice',
	pageSize: 50,
	leadingBufferZone: 100,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{usePaging:true},
		api: {
		create: 'caterialpricepurchase/caterialpricepurchase.act?method=addVendorPriceCtl',
			update: 'caterialpricepurchase/caterialpricepurchase.act?method=updateVendorPriceCtl',
			read: 'caterialpricepurchase/caterialpricepurchase.act?method=getVendorPriceCtlList',
			destroy: 'caterialpricepurchase/caterialpricepurchase.act?method=deleteVendorPriceCtl'
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
		property: 'clhh',
		direction: 'ASC'
	}]
});
