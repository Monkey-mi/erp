Ext.define('erp.supplyInvoice.store.PayDetail', {
	extend: 'Ext.data.Store',
	requires: ['erp.supplyInvoice.model.PayDetail'],
	model: 'erp.supplyInvoice.model.PayDetail',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'supplyinvoice/paydetail.act?method=getPayDetailList'
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