Ext.define('erp.supplyInvoice.store.ApplyFee', {
	extend: 'Ext.data.Store',
	requires: ['erp.supplyInvoice.model.ApplyFee'],
	model: 'erp.supplyInvoice.model.ApplyFee',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'supplyinvoice/applyfee.act?method=getApplyFeeList'
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