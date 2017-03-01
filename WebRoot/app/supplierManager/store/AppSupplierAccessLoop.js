Ext.define('erp.supplierManager.store.AppSupplierAccessLoop', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.supplierManager.model.AppSupplierAccessLoop'],
	model: 'erp.supplierManager.model.AppSupplierAccessLoop',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		extraParams:{usePaging:true},
		api: {
			create: 'supplier/appSupplierAccessLoop.srm?method=addAppSupplierAccessLoop',
			update: 'supplier/appSupplierAccessLoop.srm?method=updateAppSupplierAccessLoop',
			read: 'supplier/appSupplierAccessLoop.srm?method=getAppSupplierAccessLoopList',
			destroy: 'supplier/appSupplierAccessLoop.srm?method=deleteAppSupplierAccessLoop'
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
		property: 'loop_id',
		direction: 'ASC'
	}]
});
