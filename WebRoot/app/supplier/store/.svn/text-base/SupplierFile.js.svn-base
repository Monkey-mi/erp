Ext.define('erp.supplier.store.SupplierFile', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.supplier.model.SupplierFile'],
	model: 'erp.supplier.model.SupplierFile',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
        extraParams:{usePaging:true},
		api: {
			create: 'supplier/supplierFile.srm?method=addSupplierFile',
			update: 'supplier/supplierFile.srm?method=updateSupplierFile',
			read: 'supplier/supplierFile.srm?method=getSupplierFileByID',
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
	sorters: [{
		property: 'company_id',
		direction: 'DESC'
	}]
});
