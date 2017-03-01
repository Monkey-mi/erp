Ext.define('erp.payApply.store.PurchaseFee', {
	extend: 'Ext.data.Store',
	requires: ['erp.payApply.model.PurchaseFee'],
	model: 'erp.payApply.model.PurchaseFee',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'payapply/purchasefee.act?method=getPurchaseFeeList',
			create: 'payapply/purchasefee.act?method=addPurchaseFee',
			update: 'payapply/purchasefee.act?method=updatePurchaseFee',
			destroy: 'payapply/purchasefee.act?method=deletePurchaseFee'
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
	   sorters: [{
		property: 'sqbh'+'sqxh',
		direction: 'ASC'
	}]
});