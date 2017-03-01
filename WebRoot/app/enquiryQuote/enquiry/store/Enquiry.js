Ext.define('erp.enquiryQuote.enquiry.store.Enquiry', {
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
			create: 'enquiry/enquiry.srm?method=addEnquiry',
			update: 'enquiry/enquiry.srm?method=updateEnquiry',
			read: 'enquiry/enquiry.srm?method=getEnquiryList',
			destroy: 'enquiry/enquiry.srm?method=deleteEnquiry'
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
