Ext.define('erp.view.purchaseUrge.store.PurchaseUrgeCollect', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseUrge.model.PurchaseUrgeCollect'],
	model: 'erp.view.purchaseUrge.model.PurchaseUrgeCollect',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchaseurge/purchaseurge.act?method=getPurchaseUrgeCollectList'
		},
		extraParams:{gdbj:0,usePaging:true,czy_gh:erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id},
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
		property: 'hth',
		direction: 'ASC'
	}]
});
