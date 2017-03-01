Ext.define('erp.master.purchaseCost.store.PurchaseCost', {
	extend: 'Ext.data.Store',
	requires: ['erp.master.purchaseCost.model.PurchaseCost'],
	model: 'erp.master.purchaseCost.model.PurchaseCost',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams : {czy_gh:erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id},
		api: {
			create: 'purchasecost/purchasecost.act?method=addPurchaseCost',
			update: 'purchasecost/purchasecost.act?method=updatePurchaseCost',
			read: 'purchasecost/purchasecost.act?method=getPurchaseCostList',
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
	   sorters: [{
		property: 'fydh',
		direction: 'desc'
	}]
});
