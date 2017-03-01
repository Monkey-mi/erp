Ext.define('erp.materialDistributeAccount.store.MaterialAccountManagerDetail', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialDistributeAccount.model.MaterialAccountManagerDetail'],
	model: 'erp.materialDistributeAccount.model.MaterialAccountManagerDetail',
	pageSize: 50,
	groupField: 'yf',
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			read: 'materialAccount/materialAccountManager.act?method=getMaterialAccountManagerDetailList'
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
			writeAllFields:true,
			encode: true,
			allowSingle: false
		}
	},
	sorter: [{
		property: '',
		direction: 'ASC'
	}]
});
