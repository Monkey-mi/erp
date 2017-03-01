Ext.define('erp.view.purchaseUrge.store.ConfirmTime', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseUrge.model.ConfirmTime'],
	model: 'erp.view.purchaseUrge.model.ConfirmTime',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		timeout:900000,
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchaseurge/purchaseurge.act?method=getConfirmTimeList',
			update: 'purchaseurge/purchaseurge.act?method=updateConfirmTime'
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
		property: 'hth',
		direction: 'ASC'
	}]
});
