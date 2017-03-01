Ext.define('erp.master.purchaseCost.store.MainCost', {
	extend: 'Ext.data.Store',
	requires: ['erp.master.purchaseCost.model.MainCost'],
	model: 'erp.master.purchaseCost.model.MainCost',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams : {czy_gh:erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id},
		api: {
			read: 'purchasecost/purchasecost.act?method=getMainCostList'
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
