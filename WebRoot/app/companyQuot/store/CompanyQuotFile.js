Ext.define('erp.companyQuot.store.CompanyQuotFile', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.companyQuot.model.CompanyQuotFile'],
	model: 'erp.companyQuot.model.CompanyQuotFile',
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
			destroy: 'companyquot/companyquot.act?method=deleteCompanyQuotFile',
			create: 'companyquot/companyquot.act?method=addCompanyQuotFile',
			read: 'companyquot/companyquot.act?method=getCompanyQuotFileList'
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
		property: 'bjdh',
		direction: 'ASC'
	}]
});
