Ext.define('erp.express.store.ExpressCity', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.express.model.ExpressCity'],
	model: 'erp.express.model.ExpressCity',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'es/expressCountry.crm?method=addExpressCity',
			update: 'es/expressCountry.crm?method=updateExpressCity',
			read: 'es/expressCountry.crm?method=getExpressCityList',
			destroy: 'es/expressCountry.crm?method=deleteExpressCity'
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
		property: 'id',
		direction: 'ASC'
	}]
});
