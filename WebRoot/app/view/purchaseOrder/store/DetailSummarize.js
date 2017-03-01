Ext.define('erp.view.purchaseOrder.store.DetailSummarize', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseOrder.model.DetailSummarize'],
	model: 'erp.view.purchaseOrder.model.DetailSummarize',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'purchaseorder/purchaseorderdetail.act?method=addDetailSummarize',
			update: 'purchaseorder/purchaseorderdetail.act?method=updateDetailSummarize',
			read: 'purchaseorder/purchaseorderdetail.act?method=getDetailSummarizeList',
			destroy: 'purchaseorder/purchaseorderdetail.act?method=deleteDetailSummarize'
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
