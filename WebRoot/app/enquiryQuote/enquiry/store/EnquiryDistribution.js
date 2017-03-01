Ext.define('erp.enquiryQuote.enquiry.store.EnquiryDistribution', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.enquiryQuote.enquiry.model.EnquiryDistribution'],
	model: 'erp.enquiryQuote.enquiry.model.EnquiryDistribution',
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
			create: 'enquiry/enquiry.srm?method=addEnquiryDistribution',
			update: 'enquiry/enquiry.srm?method=updateEnquiryDistribution',
			read: 'enquiry/enquiry.srm?method=getEnquiryDistributionList',
			destroy: 'enquiry/enquiry.srm?method=deleteEnquiryDistribution'
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
		property: 'distribution_id',
		direction: 'ASC'
	}]
});
