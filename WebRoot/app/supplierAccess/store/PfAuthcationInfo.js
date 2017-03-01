Ext.define('erp.supplierAccess.store.PfAuthcationInfo', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.supplierAccess.model.PfAuthcationInfo'],
	model: 'erp.supplierAccess.model.PfAuthcationInfo',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods:{create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
		api: {
			read: 'supplierAccess/common.srm?method=getPfAuthcationInfoList'
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
		property: 'auth_id',
		direction: 'ASC'
	}]
});
