Ext.define('erp.supplierAccess.store.SupplierAccessScore', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.supplierAccess.model.SupplierAccessScore'],
	model: 'erp.supplierAccess.model.SupplierAccessScore',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'supplierAccess/SupplierAccessScore.srm?method=addSupplierAccessScore',
			update: 'supplierAccess/SupplierAccessScore.srm?method=updateSupplierAccessScore',
			read: 'supplierAccess/SupplierAccessScore.srm?method=getSupplierAccessScoreList',
			destroy: 'supplierAccess/SupplierAccessScore.srm?method=deleteSupplierAccessScore'
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
			writeAllFields:true,
			allowSingle: false
		}
	},
	sorter: [{
		property: 'score_id',
		direction: 'ASC'
	}]
});
