Ext.define('erp.view.purchaseUrge.store.PurchaseUrgeDetail', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseUrge.model.PurchaseUrgeDetail'],
	model: 'erp.view.purchaseUrge.model.PurchaseUrgeDetail',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchaseurge/purchaseurge.act?method=getPurchaseUrgeDetailList'
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
			allowSingle: false,
			writeAllFields:true
		}
	},
	sorter: [{
		property: 'jlxh',
		direction: 'ASC'
	}]
});
