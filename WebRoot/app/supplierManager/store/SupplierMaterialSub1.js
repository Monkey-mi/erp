Ext.define('erp.supplierManager.store.SupplierMaterialSub1', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.supplierManager.model.SupplierMaterialSub1'],
	model: 'erp.supplierManager.model.SupplierMaterialSub1',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'supplier/SupplierMaterialSub1.srm?method=addSupplierMaterialSub1',
			update: 'supplier/SupplierMaterialSub1.srm?method=updateSupplierMaterialSub1',
			read: 'supplier/SupplierMaterialSub1.srm?method=getSupplierMaterialSub1List',
			destroy: 'supplier/SupplierMaterialSub1.srm?method=deleteSupplierMaterialSub1'
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
			writeAllFields:true,
			allowSingle: false
		}
	},
	sorter: [{
		property: 'id',
		direction: 'ASC'
	}]
});
