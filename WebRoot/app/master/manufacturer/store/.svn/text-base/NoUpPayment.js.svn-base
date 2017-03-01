Ext.define('erp.master.manufacturer.store.NoUpPayment', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.manufacturer.model.NoUpPayment'],
	model: 'erp.master.manufacturer.model.NoUpPayment',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			
			read: 'manufacturer/noupto.act?method=getNoUpPayment'
			
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
		property: 'fyrq',
		direction: 'ASC'
	}]
});
