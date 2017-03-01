Ext.define('erp.express.store.ExpressRyf', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.express.model.ExpressRyf'],
	model: 'erp.express.model.ExpressRyf',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'es/expressCountry.crm?method=addExpressRyf',
			update: 'es/expressCountry.crm?method=updateExpressRyf',
			read: 'es/expressCountry.crm?method=getExpressRyfList',
			destroy: 'es/expressCountry.crm?method=deleteExpressRyf'
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
