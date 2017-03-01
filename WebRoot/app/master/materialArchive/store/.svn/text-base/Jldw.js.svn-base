Ext.define('erp.master.materialArchive.store.Jldw', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.materialArchive.model.Jldw'],
	model: 'erp.master.materialArchive.model.Jldw',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'materialarchive/materialarchive.act?method=getJldwList'
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
