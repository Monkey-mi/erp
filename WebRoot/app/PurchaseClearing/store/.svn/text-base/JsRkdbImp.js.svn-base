Ext.define('erp.PurchaseClearing.store.JsRkdbImp', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.PurchaseClearing.model.JsRkdbImp'],
	model: 'erp.PurchaseClearing.model.JsRkdbImp',
	pageSize: 1000,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update: 'POST',destroy : 'POST'},
	    extraParams:{usePaging:true,czy_gh:erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id},
		api: {
			create: 'purchaseclearing/purchaseclearing.act?method=addJsRkdbImp',
			read: 'purchaseclearing/purchaseclearing.act?method=getJsRkdbImp',
			update:'purchaseclearing/purchaseclearing.act?method=updateJsRkdbImp',
		    destroy:'purchaseclearing/purchaseclearing.act?method=deleteJsRkdbImp'
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
	remoteSort: true,
	remoteFilter:true,
	sorter: [{
		property: 'rkxh',
		direction: 'ASC'
	}]
});
