Ext.define('erp.supplierManager.store.AppInvoiceTitle', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.supplierManager.model.AppInvoiceTitle'],
	model: 'erp.supplierManager.model.AppInvoiceTitle',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
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
			encode: true,
			writeAllFields:true,
			allowSingle: false
		}
	},
	sorter: [{
		property: 'invoice_title_id',
		direction: 'ASC'
	}]
});
