Ext.define('erp.enquiryQuote.quote.store.EnquiryDetail', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.enquiryQuote.enquiry.model.EnquiryDetail'],
	model: 'erp.enquiryQuote.enquiry.model.EnquiryDetail',
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
			read: 'enquiry/enquiry.srm?method=getEnquiryDetailList'
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
		property: 'item_order',
		direction: 'ASC'
	}]
});
