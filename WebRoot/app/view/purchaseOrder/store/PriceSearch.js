Ext.define('erp.view.purchaseOrder.store.PriceSearch', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseOrder.model.PriceSearch'],
	model: 'erp.view.purchaseOrder.model.PriceSearch',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{usePaging:true},
		api: {
			read: 'purchaseorder/purchaseorderdetail.act?method=getPriceSearchList'
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
		property: 'htbh,htxh',
		direction: 'ASC'
	}]
});
