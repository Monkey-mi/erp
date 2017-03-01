Ext.define('erp.express.store.ExpressDetail', {
	extend: 'Ext.data.Store',
	requires: ['erp.express.model.ExpressDetail'],
	model: 'erp.express.model.ExpressDetail',
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'es/express.crm?method=addExpressDetail',
			update: 'es/express.crm?method=updateExpressDetail',
			read: 'es/express.crm?method=getExpressDetailList',
			destroy: 'es/express.crm?method=deleteExpressDetail'
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
		property: 'jlbh,jlxh',
		direction: 'ASC'
	}]
});
