Ext.define('erp.payApply.store.PurchaseAgreement', {
	extend: 'Ext.data.Store',
	requires: ['erp.payApply.model.PurchaseAgreement'],
	model: 'erp.payApply.model.PurchaseAgreement',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'payapply/purchaseagreement.act?method=getPurchaseAgreementList',
			create: 'payapply/purchaseagreement.act?method=addPurchaseAgreement',
			update: 'payapply/purchaseagreement.act?method=updatePurchaseAgreement',
			destroy: 'payapply/purchaseagreement.act?method=deletePurchaseAgreement'
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