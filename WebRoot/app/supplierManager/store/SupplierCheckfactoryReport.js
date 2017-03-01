Ext.define('erp.supplierManager.store.SupplierCheckfactoryReport', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.supplierManager.model.SupplierCheckfactoryReport'],
	model: 'erp.supplierManager.model.SupplierCheckfactoryReport',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			read: 'supplierAccess/common.srm?method=getPfSupplierCheckfactoryReportList'
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		}
	},
	sorter: [{
		property: 'id',
		direction: 'ASC'
	}]
});
