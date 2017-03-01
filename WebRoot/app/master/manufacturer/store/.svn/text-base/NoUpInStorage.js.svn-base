Ext.define('erp.master.manufacturer.store.NoUpInStorage', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.manufacturer.model.NoUpInStorage'],
	model: 'erp.master.manufacturer.model.NoUpInStorage',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			
			read: 'manufacturer/noupto.act?method=getNoUpInStorage'
			
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
		property: 'rkrq',
		direction: 'ASC'
	}]
});
