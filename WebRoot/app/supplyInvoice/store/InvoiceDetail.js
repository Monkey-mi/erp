Ext.define('erp.supplyInvoice.store.InvoiceDetail', {
	extend: 'Ext.data.Store',
	requires: ['erp.supplyInvoice.model.InvoiceDetail'],
	model: 'erp.supplyInvoice.model.InvoiceDetail',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'supplyinvoice/invoicedetail.act?method=getInvoiceDetailList'
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