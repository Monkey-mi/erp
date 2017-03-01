Ext.define('erp.supplyInvoice.store.ApplyAgreement', {
	extend: 'Ext.data.Store',
	requires: ['erp.supplyInvoice.model.ApplyAgreement'],
	model: 'erp.supplyInvoice.model.ApplyAgreement',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'supplyinvoice/applyagreement.act?method=getApplyAgreementList'
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
		property: 'fplb'+'fphm',
		direction: 'ASC'
	}]
});