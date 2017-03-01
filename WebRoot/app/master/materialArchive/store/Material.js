Ext.define('erp.master.materialArchive.store.Material', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.materialArchive.model.Material'],
	model: 'erp.master.materialArchive.model.Material',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'materialarchive/materialarchive.act?method=addMaterial',
			update: 'materialarchive/materialarchive.act?method=updateMaterial',
			read: 'materialarchive/materialarchive.act?method=getMaterialList',
			destroy: 'materialarchive/materialarchive.act?method=deleteMaterial'
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
	remoteFilter:true,
	sorter: [{
		property: 'clhh',
		direction: 'ASC'
	}]
});
