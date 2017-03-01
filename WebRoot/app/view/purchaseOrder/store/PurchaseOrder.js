Ext.define('erp.view.purchaseOrder.store.PurchaseOrder', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseOrder.model.PurchaseOrder'],
	model: 'erp.view.purchaseOrder.model.PurchaseOrder',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{gdbj:0,usePaging:true,czy_gh:erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id},
		api: {
			create: 'purchaseorder/purchaseorder.act?method=addPurchaseOrder',
			update: 'purchaseorder/purchaseorder.act?method=updatePurchaseOrder',
			read: 'purchaseorder/purchaseorder.act?method=getPurchaseOrderList',
			destroy: 'purchaseorder/purchaseorder.act?method=deletePurchaseOrder'
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
		property: 'htbh',
		direction: 'ASC'
	}]
});
