Ext.define('erp.supplyInvoice.store.PrepayAdjustment', {
	extend: 'Ext.data.Store',
	requires: ['erp.supplyInvoice.model.PrepayAdjustment'],
	model: 'erp.supplyInvoice.model.PrepayAdjustment',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'supplyinvoice/prepayadjustment.act?method=getPrepayAdjustmentList'
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