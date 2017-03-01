Ext.define('erp.view.purchaseUrge.store.PurchaseUrge', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseUrge.model.PurchaseUrge'],
	model: 'erp.view.purchaseUrge.model.PurchaseUrge',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		timeout:900000,
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
		property: 'jhh',
		direction: 'ASC'
	}]
});
