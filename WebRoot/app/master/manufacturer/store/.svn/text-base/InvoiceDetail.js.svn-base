Ext.define('erp.master.manufacturer.store.InvoiceDetail', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.manufacturer.model.InvoiceDetail'],
	model: 'erp.master.manufacturer.model.InvoiceDetail',
	pageSize: 50,
	groupField: 'yf',
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			
			read: 'manufacturer/invoicedetail.act?method=getInvoiceDetailList'	
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
	sorter: [{
		property: 'rq',
		direction: 'ASC'
	}]
	
});
