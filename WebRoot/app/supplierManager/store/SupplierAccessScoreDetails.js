Ext.define('erp.supplierManager.store.SupplierAccessScoreDetails', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.supplierManager.model.SupplierAccessScoreDetails'],
	model: 'erp.supplierManager.model.SupplierAccessScoreDetails',
	
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			
			read: 'supplierAccess/SupplierAccessScoreDetails.srm?method=getSupplierAccessScoreDetailsList'
			
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		}
	}
});
