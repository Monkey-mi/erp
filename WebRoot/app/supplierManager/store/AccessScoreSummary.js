Ext.define('erp.supplierManager.store.AccessScoreSummary', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.supplierManager.model.AccessScoreSummary'],
	model: 'erp.supplierManager.model.AccessScoreSummary',
	//pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			read:'supplierAccess/SupplierAccessScoreSummary.srm?method=getSupplierAccessScoreList'
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		}
	}

});
