Ext.define('erp.payApply.store.SupplyInvoiceImpDetail', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.SupplyInvoiceImp'],
	model: 'erp.payApply.model.SupplyInvoiceImp',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'payapply/supplyinvoice.act?method=getSupplyInvoiceImpDetailList'
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
		property: 'fplb'+'fphm',
		direction: 'ASC'
	}]
});
