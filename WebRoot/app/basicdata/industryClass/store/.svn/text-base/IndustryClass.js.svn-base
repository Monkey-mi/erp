Ext.define('erp.basicdata.industryClass.store.IndustryClass', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.basicdata.industryClass.model.IndustryClass'],
	model: 'erp.basicdata.industryClass.model.IndustryClass',
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
			create: 'industryClass/IndustryClass.srm?method=addIndustryClass',
			update: 'industryClass/IndustryClass.srm?method=updateIndustryClass',
			read: 'industryClass/IndustryClass.srm?method=getIndustryClassList',
			destroy: 'industryClass/IndustryClass.srm?method=deleteIndustryClass'
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
		property: 'industry_id',
		direction: 'ASC'
	}]
});
