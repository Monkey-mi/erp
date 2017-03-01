Ext.define('erp.supplierManager.store.AppMainCustomer', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.supplierManager.model.AppMainCustomer'],
	model: 'erp.supplierManager.model.AppMainCustomer',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
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
	sorter: [{
		property: 'customer_id',
		direction: 'ASC'
	}]
});
