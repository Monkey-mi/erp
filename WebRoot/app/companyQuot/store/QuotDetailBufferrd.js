Ext.define('erp.companyQuot.store.QuotDetailBufferrd', {
	extend: 'Ext.data.BufferedStore',
	reqiures: ['erp.companyQuot.model.QuotDetail'],
	model: 'erp.companyQuot.model.QuotDetail',
	pageSize: 25,
	leadingBufferZone: 100,
	proxy: {
		type: 'ajax',
	actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
        extraParams:{usePaging:true},
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
	remoteFilter:true,
	remoteSort:true,
	sorter: [{
		property: 'bjxh',
		direction: 'ASC'
	}]
});
