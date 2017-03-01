Ext.define('erp.view.purchaseOrder.store.SalesOrderImp', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseOrder.model.SalesOrderImp'],
	model: 'erp.view.purchaseOrder.model.SalesOrderImp',
	pageSize: 200,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{usePaging:true},
		api: {
			read: 'purchaseorder/purchaseorderdetail.act?method=getSalesOrderImpList'
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
