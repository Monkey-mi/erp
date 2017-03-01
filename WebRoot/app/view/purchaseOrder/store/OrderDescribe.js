Ext.define('erp.view.purchaseOrder.store.OrderDescribe', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseOrder.model.OrderDescribe'],
	model: 'erp.view.purchaseOrder.model.OrderDescribe',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchaseorder/purchaseorderdetail.act?method=getOrderDescribeList'
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
		property: 'clhh',
		direction: 'ASC'
	}]
});
