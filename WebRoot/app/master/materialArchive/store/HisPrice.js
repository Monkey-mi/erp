Ext.define('erp.master.materialArchive.store.HisPrice', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.materialArchive.model.HisPrice'],
	model: 'erp.master.materialArchive.model.HisPrice',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'materialarchive/materialarchive.act?method=addHisPrice',
			update: 'materialarchive/materialarchive.act?method=updateHisPrice',
			read: 'materialarchive/materialarchive.act?method=getHisPriceList',
			destroy: 'materialarchive/materialarchive.act?method=deleteHisPrice'
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
