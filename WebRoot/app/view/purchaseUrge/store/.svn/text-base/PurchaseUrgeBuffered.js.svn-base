Ext.define('erp.view.purchaseUrge.store.PurchaseUrgeBuffered', {
	extend: 'Ext.data.BufferedStore',
	reqiures: ['erp.view.purchaseUrge.model.PurchaseUrge'],
	model: 'erp.view.purchaseUrge.model.PurchaseUrge',
	pageSize: 100,
	leadingBufferZone: 300,
	proxy: {
		type: 'ajax',
		timeout : 1330000,
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchaseurge/purchaseurge.act?method=getPurchaseUrgeList'
		},
		extraParams:{gdbj:0,usePaging:true,czy_gh:erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id},
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		}
	},
	remoteFilter: true,
	remoteSort:true,
	sorter: [{
		property: 'cgbh,cgxh',
		direction: 'ASC'
	}]
});
