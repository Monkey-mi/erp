Ext.define('erp.express.store.ExpressIssue', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.express.model.ExpressIssue'],
	model: 'erp.express.model.ExpressIssue',
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'es/express.crm?method=addExpressIssue',
			update: 'es/express.crm?method=updateExpressIssue',
			read: 'es/express.crm?method=getExpressIssueList',
			destroy: 'es/express.crm?method=deleteExpressIssue'
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
