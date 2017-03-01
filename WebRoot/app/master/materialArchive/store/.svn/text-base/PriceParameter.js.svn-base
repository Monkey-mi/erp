Ext.define('erp.master.materialArchive.store.PriceParameter', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.materialArchive.model.PriceParameter'],
	model: 'erp.master.materialArchive.model.PriceParameter',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'materialarchive/materialarchive.act?method=addJgcs',
			update: 'materialarchive/materialarchive.act?method=updateJgcs',
			read: 'materialarchive/materialarchive.act?method=getJgcsList',
			destroy: 'materialarchive/materialarchive.act?method=deleteJgcs'
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
