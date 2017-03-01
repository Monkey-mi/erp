Ext.define('erp.basicdata.currency.store.Currency', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.basicdata.currency.model.Currency'],
	model: 'erp.basicdata.currency.model.Currency',
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
			create: 'currency/Currency.srm?method=addCurrency',
			update: 'currency/Currency.srm?method=updateCurrency',
			read: 'currency/Currency.srm?method=getCurrencyList',
			destroy: 'currency/Currency.srm?method=deleteCurrency'
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
		property: 'currency_id',
		direction: 'ASC'
	}]
});
