Ext.define('erp.PurchaseClearing.store.JsFydbImpBufferrd', {
	extend: 'Ext.data.BufferedStore',
	reqiures: ['erp.PurchaseClearing.model.JsFydbImp'],
	model: 'erp.PurchaseClearing.model.JsFydbImp',
	pageSize: 25,
	leadingBufferZone: 100,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update: 'POST',destroy : 'POST'},
	    extraParams:{usePaging:true},
		api: {
			create: 'purchasecost/purchasecost.act?method=addPurchaseCost',
			read: 'purchaseclearing/purchaseclearing.act?method=getJsFydbImp',
			update: 'purchasecost/purchasecost.act?method=updatePurchaseCost',
			destroy: 'purchasecost/purchasecost.act?method=deletePurchaseCost'
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
	remoteFilter:true,
	sorter: [{
		property: 'fydh,fyxh',
		direction: 'ASC'
	}]
});
