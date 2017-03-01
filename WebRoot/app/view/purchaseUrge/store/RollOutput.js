Ext.define('erp.view.purchaseUrge.store.RollOutput', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseUrge.model.RollOutput'],
	model: 'erp.view.purchaseUrge.model.RollOutput',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchaseurge/purchaseurge.act?method=getRollOutputOneList'
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
			allowSingle: false
		}
	},
	sorter: [{
		property: 'hth',
		direction: 'ASC'
	}]
});
