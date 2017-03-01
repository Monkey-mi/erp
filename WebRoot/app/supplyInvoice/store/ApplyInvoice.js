Ext.define('erp.supplyInvoice.store.ApplyInvoice', {
	extend: 'Ext.data.Store',
	requires: ['erp.supplyInvoice.model.ApplyInvoice'],
	model: 'erp.supplyInvoice.model.ApplyInvoice',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'supplyinvoice/applyinvoice.act?method=getApplyInvoiceList'
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