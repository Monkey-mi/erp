Ext.define('erp.companyQuot.store.QuotDetail', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.companyQuot.model.QuotDetail'],
	model: 'erp.companyQuot.model.QuotDetail',
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
			create: 'companyquot/companyquot.act?method=addQuotDetail',
			update: 'companyquot/companyquot.act?method=updateQuotDetail',
			read: 'companyquot/companyquot.act?method=getQuotDetailList',
			destroy: 'companyquot/companyquot.act?method=deleteQuotDetail'
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
		property: 'bjxh',
		direction: 'ASC'
	}]
});
