Ext.define('erp.master.purchaseCost.store.ProductEntrustImp', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.purchaseCost.model.ProductEntrustImp'],
	model: 'erp.master.purchaseCost.model.ProductEntrustImp',
	pageSize: 25,
	proxy: {
		type: 'ajax',
				actionMethods : {read : 'POST'},
		extraParams :{usePaging : true},
		api: {
			read: 'purchasecost/purchasecost.act?method=getProductEntrustImpList'
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
		property: 'bmbh',
		direction: 'ASC'
	}]
});
