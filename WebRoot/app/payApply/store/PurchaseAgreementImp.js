Ext.define('erp.payApply.store.PurchaseAgreementImp', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.PurchaseAgreementImp'],
	model: 'erp.payApply.model.PurchaseAgreementImp',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'payapply/purchaseagreement.act?method=getPurchaseAgreementImpList'
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
			allowSingle: false
		}
	},
	sorter: [{
		property: 'htbh',
		direction: 'ASC'
	}]
});
