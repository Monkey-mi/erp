//供应商档案信息表store
Ext.define('erp.supplierManager.store.SupplierFileHelp', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.supplierManager.model.SupplierFile'],
	model: 'erp.supplierManager.model.SupplierFile',
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		extraParams:{usePaging:true,history:0},
		api: {
			read: 'supplier/supplierFile.srm?method=getSupplierFileListForHelp'
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
		property: 'company_id',
		direction: 'ASC'
	}]
});
