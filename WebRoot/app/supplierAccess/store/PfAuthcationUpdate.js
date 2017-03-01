Ext.define('erp.supplierAccess.store.PfAuthcationUpdate', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.supplierAccess.model.PfAuthcationUpdate'],
	model: 'erp.supplierAccess.model.PfAuthcationUpdate',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods:{create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
		api: {
			read: 'supplierAccess/common.srm?method=getPfAuthcationUpdateList'
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
			allowSingle: false
		}
	},
	sorter: [{
		property: 'auth_update_id',
		direction: 'ASC'
	}]
});
