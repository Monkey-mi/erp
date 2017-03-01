Ext.define('erp.express.store.Tdfd', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.express.model.Tdfd'],
	model: 'erp.express.model.Tdfd',
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			update: 'tdfd/tdfd.crm?method=updateTdfd',
			read: 'tdfd/tdfd.crm?method=getTdfdList'
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
		property: 'cybh',
		direction: 'DESC'
	}]
});
