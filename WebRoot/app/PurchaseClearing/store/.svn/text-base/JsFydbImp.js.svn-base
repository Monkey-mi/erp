Ext.define('erp.PurchaseClearing.store.JsFydbImp', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.PurchaseClearing.model.JsFydbImp'],
	model: 'erp.PurchaseClearing.model.JsFydbImp',
	pageSize: 1000,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update: 'POST',destroy : 'POST'},
	    extraParams:{usePaging:true,czy_gh:erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id},
		api: {
			create: 'purchasecost/purchasecost.act?method=addPurchaseCost',
			read: 'purchaseclearing/purchaseclearing.act?method=getJsFydbImp',
			update: 'purchasecost/purchasecost.act?method=updatePurchaseCost',
			destroy: 'purchasecost/purchasecost.act?method=deletePurchaseCost'
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
			writeAllFields:true,
			allowSingle: false
		}
	},
	remoteFilter:true,
	remoteSort:true,
	sorter: [{
		property: '',
		direction: 'ASC'
	}]
});
