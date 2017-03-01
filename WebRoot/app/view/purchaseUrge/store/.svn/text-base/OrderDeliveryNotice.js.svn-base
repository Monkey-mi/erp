Ext.define('erp.view.purchaseUrge.store.OrderDeliveryNotice', {
	extend: 'Ext.data.BufferedStore',
	reqiures: ['erp.view.purchaseUrge.model.OrderDeliveryNotice'],
	model: 'erp.view.purchaseUrge.model.OrderDeliveryNotice',
	pageSize: 25,
	leadingBufferZone: 50,
	proxy: {
		type: 'ajax',
		extraParams:{usePaging:true,notice_status:0,pur_company_id:erp.Const.companyId},
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchaseurge/purchaseurgews.act?method=getOrderDeliveryNoticeList'
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		}
	},
	sorter: [{
		property: 'delivery_notice_id',
		direction: 'ASC'
	}]
});
