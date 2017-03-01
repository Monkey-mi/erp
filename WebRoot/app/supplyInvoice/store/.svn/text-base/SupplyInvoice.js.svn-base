Ext.define('erp.supplyInvoice.store.SupplyInvoice', {
	extend: 'Ext.data.Store',
	requires: ['erp.supplyInvoice.model.SupplyInvoice'],
	model: 'erp.supplyInvoice.model.SupplyInvoice',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'supplyinvoice/supplyinvoice.act?method=getSupplyInvoiceList'
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
