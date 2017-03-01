Ext.define('erp.basicdata.accessEvaluateOptions.store.AccessEvaluterOption', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.basicdata.accessEvaluateOptions.model.AccessEvaluterOption'],
	model: 'erp.basicdata.accessEvaluateOptions.model.AccessEvaluterOption',
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
			create: 'accessEvalute/accessEvalute.act?method=addAccessEvaluterOption',
			update: 'accessEvalute/accessEvalute.act?method=updateAccessEvaluterOption',
			read: 'accessEvalute/accessEvalute.act?method=getAccessEvaluterOptionList',
			destroy: 'accessEvalute/accessEvalute.act?method=deleteAccessEvaluterOption'
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
			writeAllFields:true,
			encode: true,
			allowSingle: false
		}
	},
	sorters: [{
		property: 'item_id',
		direction: 'ASC'
	}]
});
