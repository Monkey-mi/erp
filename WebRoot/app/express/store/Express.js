Ext.define('erp.express.store.Express', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.express.model.Express'],
	model: 'erp.express.model.Express',
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'es/express.crm?method=addExpress',
			update: 'es/express.crm?method=updateExpress',
			read: 'es/express.crm?method=getExpressList',
			destroy: 'es/express.crm?method=deleteExpress'
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
		property: 'czsj',
		direction: 'DESC'
	},
	{
		property: 'jlbh',
		direction: 'DESC'
	}]
});
