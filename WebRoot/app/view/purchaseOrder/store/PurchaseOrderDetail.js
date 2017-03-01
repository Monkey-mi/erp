Ext.define('erp.view.purchaseOrder.store.PurchaseOrderDetail', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseOrder.model.PurchaseOrderDetail'],
	model: 'erp.view.purchaseOrder.model.PurchaseOrderDetail',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		timeout:900000,
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
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
	remoteFilter: true,
	remoteSort:true,
	sorter: [{
		property: 'htxh',
		direction: 'ASC'
	}]
});
