Ext.define('erp.enquiryQuote.enquiry.store.TempMaterialClass', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.basicdata.materialClass.model.MaterialClass'],
	model: 'erp.basicdata.materialClass.model.MaterialClass',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
        extraParams:{
			usePaging:false
		},
		api: {
			read: 'materialClass/materialClass.srm?method=getMaterialClassList'
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
		property: 'mc_id',
		direction: 'ASC'
	}]
});
