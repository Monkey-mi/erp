Ext.define('erp.master.caterialPricePurchase.store.VendorPriceCtl', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.caterialPricePurchase.model.VendorPriceCtl'],
	model: 'erp.master.caterialPricePurchase.model.VendorPriceCtl',
	pageSize: 200,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
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
		property: 'clhh'+'csbh',
		direction: 'ASC'
	}]
});
