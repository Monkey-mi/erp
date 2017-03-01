Ext.define('erp.master.materialArchive.store.Product', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.materialArchive.model.Product'],
	model: 'erp.master.materialArchive.model.Product',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
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
