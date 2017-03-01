Ext.define('erp.enquiryQuote.quote.store.Enquiry', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.enquiryQuote.enquiry.model.Enquiry'],
	model: 'erp.enquiryQuote.enquiry.model.Enquiry',
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
			read: 'enquiry/enquiry.srm?method=getEnquiryListForSupplier'
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
		property: 'enquiry_id',
		direction: 'ASC'
	}]
});
