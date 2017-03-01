Ext.define('erp.enquiryQuote.quoteManager.store.Quotation', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.enquiryQuote.quoteManager.model.Quotation'],
	model: 'erp.enquiryQuote.quoteManager.model.Quotation',
	pageSize: 15,
	proxy: {
		type: 'ajax',
		actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
		api: {
			create: 'quote/quotation.srm?method=addQuotation',
			update: 'quote/quotation.srm?method=updateQuotation',
			read: 'quote/quotation.srm?method=getQuotationList',
			destroy: 'quote/quotation.srm?method=deleteQuotation'
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
		property: 'quotation_id',
		direction: 'ASC'
	}]
});
