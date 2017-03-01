Ext.define('erp.supplierManager.store.SupplierMaterialcheck', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.supplierManager.model.SupplierMaterialcheck'],
	model: 'erp.supplierManager.model.SupplierMaterialcheck',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			read: 'supplierAccess/common.srm?method=getPfSupplierMaterialcheckList'
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		}
	},
	sorter: [{
		property: 'materialcheck_id',
		direction: 'ASC'
	}]
});
