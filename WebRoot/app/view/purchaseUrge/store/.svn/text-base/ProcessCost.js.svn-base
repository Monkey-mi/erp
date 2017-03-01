Ext.define('erp.view.purchaseUrge.store.ProcessCost', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseUrge.model.ProcessCost'],
	model: 'erp.view.purchaseUrge.model.ProcessCost',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchaseurge/purchaseurge.act?method=getProcessCostList'
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
		property: 'clhh',
		direction: 'ASC'
	}]
});
