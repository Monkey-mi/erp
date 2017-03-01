Ext.define('erp.master.manufacturer.store.Csmc', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.manufacturer.model.Csmc'],
	model: 'erp.master.manufacturer.model.Csmc',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'manufacturer/csmc.act?method=addcsmc',
			update: 'manufacturer/csmc.act?method=updatecsmc',
			read: 'manufacturer/csmc.act?method=getcsmcList',
			destroy: 'manufacturer/csmc.act?method=deletecsmc'
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
		property: 'csbh',
		direction: 'ASC'
	}]
});
