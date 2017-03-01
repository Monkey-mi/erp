Ext.define('erp.view.purchaseOrder.store.PurchaseFile', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseOrder.model.PurchaseFile'],
	model: 'erp.view.purchaseOrder.model.PurchaseFile',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'purchaseorder/purchasefile.act?method=addPurchaseFile',
			update: 'purchaseorder/purchasefile.act?method=updatePurchaseFile',
			read: 'purchaseorder/purchasefile.act?method=getPurchaseFileList',
			destroy: 'purchaseorder/purchasefile.act?method=deletePurchaseFile'
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
		property: 'wjbh',
		direction: 'ASC'
	}]
});
