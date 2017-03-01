Ext.define('erp.view.purchaseOrder.store.OrderAttachmentBack', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseOrder.model.OrderAttachmentBack'],
	model: 'erp.view.purchaseOrder.model.OrderAttachmentBack',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchaseorder/ordertowsservice.act?method=getOrderAttachmentBack'
		},
		//extraParams:{usePaging:true},
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
		property: 'clhh',
		direction: 'ASC'
	}]
});
