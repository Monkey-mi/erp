Ext.define('erp.enquiryQuote.quote.store.QuotationDetail', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.enquiryQuote.quote.model.QuotationDetail'],
	model: 'erp.enquiryQuote.quote.model.QuotationDetail',
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
			create: 'quote/quotation.srm?method=addQuotationDetail',
			update: 'quote/quotation.srm?method=updateQuotationDetail',
			read: 'quote/quotation.srm?method=getQuotationDetailList',
			destroy: 'quote/quotation.srm?method=deleteQuotationDetail'
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
		property: 'item_order',
		direction: 'ASC'
	}]
});
