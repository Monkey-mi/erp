Ext.define('erp.view.purchaseOrder.store.PurchaseOrderDetailBuffered', {
	extend: 'Ext.data.BufferedStore',
	reqiures: ['erp.view.purchaseOrder.model.PurchaseOrderDetail'],
	model: 'erp.view.purchaseOrder.model.PurchaseOrderDetail',
	pageSize: 50,
	leadingBufferZone: 100,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{usePaging:true},
		api: {
			create: 'purchaseorder/purchaseorderdetail.act?method=addPurchaseOrderDetail',
			update: 'purchaseorder/purchaseorderdetail.act?method=updatePurchaseOrderDetail',
			read: 'purchaseorder/purchaseorderdetail.act?method=getPurchaseOrderDetailList',
			destroy: 'purchaseorder/purchaseorderdetail.act?method=deletePurchaseOrderDetail'
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
		property: 'htxh',
		direction: 'ASC'
	}]
});
