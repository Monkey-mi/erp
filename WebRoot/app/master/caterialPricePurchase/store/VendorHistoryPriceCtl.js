Ext.define('erp.master.caterialPricePurchase.store.VendorHistoryPriceCtl', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.caterialPricePurchase.model.VendorHistoryPriceCtl'],
	model: 'erp.master.caterialPricePurchase.model.VendorHistoryPriceCtl',
	pageSize: 200,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'caterialpricepurchase/caterialpricepurchase.act?method=getVendorHistoryPriceCtlList'
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
		property: 'jlxh',
		direction: 'ASC'
	}]
});
