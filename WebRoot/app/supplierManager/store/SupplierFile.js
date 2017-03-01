//供应商档案信息表store
Ext.define('erp.supplierManager.store.SupplierFile', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.supplierManager.model.SupplierFile'],
	model: 'erp.supplierManager.model.SupplierFile',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		timeout:60000,
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		extraParams:{usePaging:true,history:0},
		api: {
			create: 'supplier/supplierFile.srm?method=addSupplierFile',
			update: 'supplier/supplierFile.srm?method=updateSupplierFile',
			read: 'supplier/supplierFile.srm?method=getSupplierFileList',
			destroy: 'supplier/supplierFile.srm?method=deleteSupplierFile'
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
