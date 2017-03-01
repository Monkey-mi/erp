Ext.define('erp.express.store.Receiver', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.express.model.Receiver'],
	model: 'erp.express.model.Receiver',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{usePaging:true},
		api: {
			read: 'crm/customer.crm?method=getReceiverList'
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		}
	},
	sorter: [{
		property: 'jjbh',
		direction: 'ASC'
	}]
});