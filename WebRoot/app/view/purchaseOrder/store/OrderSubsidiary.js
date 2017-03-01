Ext.define('erp.view.purchaseOrder.store.OrderSubsidiary', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseOrder.model.OrderSubsidiary'],
	model: 'erp.view.purchaseOrder.model.OrderSubsidiary',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'purchaseorder/purchaseorderdetail.act?method=addOrderSubsidiary',
			update: 'purchaseorder/purchaseorderdetail.act?method=updateOrderSubsidiary',
			read: 'purchaseorder/purchaseorderdetail.act?method=getOrderSubsidiaryList',
			destroy: 'purchaseorder/purchaseorderdetail.act?method=deleteOrderSubsidiary'
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
