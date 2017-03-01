Ext.define('erp.master.caterialPricePurchase.store.PurchasePrice', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.caterialPricePurchase.model.PurchasePrice'],
	model: 'erp.master.caterialPricePurchase.model.PurchasePrice',
	pageSize: 200,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'caterialpricepurchase/caterialpricepurchase.act?method=getHistoryPurchasePriceList'
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
