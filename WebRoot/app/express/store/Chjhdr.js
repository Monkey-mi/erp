Ext.define('erp.express.store.Chjhdr', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.express.model.ShipmentLoad'],
	model: 'erp.express.model.ShipmentLoad',
	pageSize: 80,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{usePaging:true},
		api: {			
			read: 'es/express.crm?method=getv_chjhdr'
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
		property: 'cybh',
		direction: 'ASC'
	}]
});
