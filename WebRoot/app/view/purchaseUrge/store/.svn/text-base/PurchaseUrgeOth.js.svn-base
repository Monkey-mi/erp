Ext.define('erp.view.purchaseUrge.store.PurchaseUrgeOth', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseUrge.model.PurchaseUrgeOth'],
	model: 'erp.view.purchaseUrge.model.PurchaseUrgeOth',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchaseurge/purchaseurge.act?method=getPurchaseUrgeOthList'
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
		property: 'qldh',
		direction: 'ASC'
	}]
});
