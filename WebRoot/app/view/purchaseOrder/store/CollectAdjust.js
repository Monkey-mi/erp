Ext.define('erp.view.purchaseOrder.store.CollectAdjust', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseOrder.model.CollectAdjust'],
	model: 'erp.view.purchaseOrder.model.CollectAdjust',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchaseorder/purchaseorderdetail.act?method=getCollectAdjustList'
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
		property: '',
		direction: 'ASC'
	}]
});
