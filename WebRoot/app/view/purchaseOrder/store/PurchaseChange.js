Ext.define('erp.view.purchaseOrder.store.PurchaseChange', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseOrder.model.PurchaseChange'],
	model: 'erp.view.purchaseOrder.model.PurchaseChange',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchaseorder/purchaseorderdetail.act?method=getPurchaseChangeList'
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
