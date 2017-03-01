Ext.define('erp.supplierManager.store.AppBankAccount', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.supplierManager.model.AppBankAccount'],
	model: 'erp.supplierManager.model.AppBankAccount',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'supplier/bankAccount.srm?method=addBankAccount',
			update: 'supplier/bankAccount.srm?method=updateBankAccount',
			read: 'supplier/bankAccount.srm?method=getBankAccountList',
			destroy: 'supplier/bankAccount.srm?method=deleteBankAccount'
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
		property: 'account_id',
		direction: 'ASC'
	}]
});
