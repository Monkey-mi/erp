Ext.define('erp.supplier.store.InvoiceTitle', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.supplier.model.InvoiceTitle'],
	model: 'erp.supplier.model.InvoiceTitle',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
		api: {
			create: 'supplier/invoiceTitle.srm?method=addInvoiceTitle',
			update: 'supplier/invoiceTitle.srm?method=updateInvoiceTitle',
			read: 'supplier/invoiceTitle.srm?method=getInvoiceTitleList',
			destroy: 'supplier/invoiceTitle.srm?method=deleteInvoiceTitle'
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
			writeAllFields:true,
			encode: true,
			allowSingle: false
		}
	},
	sorters: [{
		property: 'invoice_title_id',
		direction: 'DESC'
	}]
});
