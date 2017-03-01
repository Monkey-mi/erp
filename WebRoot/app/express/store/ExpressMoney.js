Ext.define('erp.express.store.ExpressMoney', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.express.model.ExpressMoney'],
	model: 'erp.express.model.ExpressMoney',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'es/expressCountry.crm?method=addExpressMoney',
			update: 'es/expressCountry.crm?method=updateExpressMoney',
			read: 'es/expressCountry.crm?method=getExpressMoneyList',
			destroy: 'es/expressCountry.crm?method=deleteExpressMoney'
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
