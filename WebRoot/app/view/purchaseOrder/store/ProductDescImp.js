Ext.define('erp.view.purchaseOrder.store.ProductDescImp', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseOrder.model.ProductDescImp'],
	model: 'erp.view.purchaseOrder.model.ProductDescImp',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchaseorder/purchaseorder.act?method=getProductDescImpList'
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
		property: 'ddbh,ddxh',
		direction: 'ASC'
	}]
});
