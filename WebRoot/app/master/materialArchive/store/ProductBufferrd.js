Ext.define('erp.master.materialArchive.store.ProductBufferrd', {
	extend: 'Ext.data.BufferedStore',
	reqiures: ['erp.master.materialArchive.model.Product'],
	model: 'erp.master.materialArchive.model.Product',
	pageSize: 50,
	leadingBufferZone: 100,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{usePaging:true},
		api: {
			create: 'materialarchive/materialarchive.act?method=addProduct',
			update: 'materialarchive/materialarchive.act?method=updateProduct',
			read: 'materialarchive/materialarchive.act?method=getProductList',
			destroy: 'materialarchive/materialarchive.act?method=deleteProduct'
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
		property: 'clhh',
		direction: 'ASC'
	}]
});
