Ext.define('erp.view.purchaseUrge.store.OrderDeliveryNoticedetails', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseUrge.model.OrderDeliveryNoticedetails'],
	model: 'erp.view.purchaseUrge.model.OrderDeliveryNoticedetails',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchaseurge/purchaseurgews.act?method=getOrderDeliveryNoticedetailsList'
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		}
	},
	sorter: [{
		property: 'details_id',
		direction: 'ASC'
	}]
});
