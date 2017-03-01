Ext.define('erp.companyQuot.store.CompanyQuot', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.companyQuot.model.CompanyQuot'],
	model: 'erp.companyQuot.model.CompanyQuot',
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
			create: 'companyquot/companyquot.act?method=addCompanyQuot',
			update: 'companyquot/companyquot.act?method=updateCompanyQuot',
			read: 'companyquot/companyquot.act?method=getCompanyQuotList',
			destroy: 'companyquot/companyquot.act?method=deleteCompanyQuot'
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
	remoteFilter:true,
	sorter: [{
		property: 'bjdh',
		direction: 'ASC'
	}]
});
