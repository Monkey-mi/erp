Ext.define('erp.PurchaseClearing.store.JsRkdbImpBufferrd', {
	extend: 'Ext.data.BufferedStore',
	reqiures: ['erp.PurchaseClearing.model.JsRkdbImp'],
	model: 'erp.PurchaseClearing.model.JsRkdbImp',
	pageSize: 100,
	leadingBufferZone: 200,
	proxy: {
		timeout:900000,
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update: 'POST',destroy : 'POST'},
	    extraParams:{usePaging:true},
		api: {
			create: 'purchaseclearing/purchaseclearing.act?method=addJsRkdbImp',
			read: 'purchaseclearing/purchaseclearing.act?method=getJsRkdbImp',
			update:'purchaseclearing/purchaseclearing.act?method=updateJsRkdbImp',
		    destroy:'purchaseclearing/purchaseclearing.act?method=deleteJsRkdbImp'
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
		property: 'rkdh,rkxh',
		direction: 'ASC'
	}]
});
