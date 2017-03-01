Ext.define('erp.master.manufacturer.store.Cslb', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.manufacturer.model.Csmc'],
	model: 'erp.master.manufacturer.model.Csmc',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			
			read: 'manufacturer/cslb.act?method=getCslb'
			
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
		property: 'mjxl',
		direction: 'ASC'
	}]
});
