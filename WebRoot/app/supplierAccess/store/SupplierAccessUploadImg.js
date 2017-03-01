Ext.define('erp.supplierAccess.store.SupplierAccessUploadImg', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.supplierAccess.model.SupplierAccessUploadImg'],
	model: 'erp.supplierAccess.model.SupplierAccessUploadImg',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'supplierAccess/SupplierAccessUploadImg.srm?method=addSupplierAccessUploadImg',
			update: 'supplierAccess/SupplierAccessUploadImg.srm?method=updateSupplierAccessUploadImg',
			read: 'supplierAccess/SupplierAccessUploadImg.srm?method=getSupplierAccessUploadImgList',
			destroy: 'supplierAccess/SupplierAccessUploadImg.srm?method=deleteSupplierAccessUploadImg'
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
		property: 'id',
		direction: 'ASC'
	}]
});
