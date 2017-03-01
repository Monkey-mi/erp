Ext.define('erp.basicdata.tradeClass.store.TradeClass', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.basicdata.tradeClass.model.TradeClass'],
	model: 'erp.basicdata.tradeClass.model.TradeClass',
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
			create: 'tradeClass/tradeClass.srm?method=addTradeClass',
			update: 'tradeClass/tradeClass.srm?method=updateTradeClass',
			read: 'tradeClass/tradeClass.srm?method=getTradeClassList',
			destroy: 'tradeClass/tradeClass.srm?method=deleteTradeClass'
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
		property: 'class_id',
		direction: 'ASC'
	}]
});
