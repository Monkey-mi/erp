Ext.define('erp.supplier.store.MainCustomer', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.supplier.model.MainCustomer'],
	model: 'erp.supplier.model.MainCustomer',
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
			create: 'supplier/mainCustomer.srm?method=addMainCustomer',
			update: 'supplier/mainCustomer.srm?method=updateMainCustomer',
			read: 'supplier/mainCustomer.srm?method=getMainCustomerList',
			destroy: 'supplier/mainCustomer.srm?method=deleteMainCustomer'
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
		property: 'customer_id',
		direction: 'DESC'
	}]
});
