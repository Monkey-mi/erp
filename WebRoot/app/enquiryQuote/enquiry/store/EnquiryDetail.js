Ext.define('erp.enquiryQuote.enquiry.store.EnquiryDetail', {
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
			create: 'enquiry/enquiry.srm?method=addEnquiryDetail',
			update: 'enquiry/enquiry.srm?method=updateEnquiryDetail',
			read: 'enquiry/enquiry.srm?method=getEnquiryDetailList',
			destroy: 'enquiry/enquiry.srm?method=deleteEnquiryDetail'
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
