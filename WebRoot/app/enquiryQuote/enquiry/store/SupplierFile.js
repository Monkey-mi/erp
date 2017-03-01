//供应商档案 数据仓库，专用的，别的地方别调用它
Ext.define('erp.enquiryQuote.enquiry.store.SupplierFile', {
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
	sorters: [{
		property: 'company_id',
		direction: 'ASC'
	}]
});
