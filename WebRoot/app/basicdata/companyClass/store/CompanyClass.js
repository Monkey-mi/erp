Ext.define('erp.basicdata.companyClass.store.CompanyClass', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.basicdata.companyClass.model.CompanyClass'],
	model: 'erp.basicdata.companyClass.model.CompanyClass',
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
			usePaging:true
		},
		api: {
			create: 'companyClass/companyClass.srm?method=addCompanyClass',
			update: 'companyClass/companyClass.srm?method=updateCompanyClass',
			read: 'companyClass/companyClass.srm?method=getCompanyClassList',
			destroy: 'companyClass/companyClass.srm?method=deleteCompanyClass'
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
		property: 'nature_id',
		direction: 'ASC'
	}]
});
