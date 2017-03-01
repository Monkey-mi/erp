Ext.define('erp.express.store.City', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.express.model.City'],
	model: 'erp.express.model.City',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'es/province.crm?method=addCity',
			update: 'es/province.crm?method=updateCity',
			read: 'es/province.crm?method=getCityList',
			destroy: 'es/province.crm?method=deleteCity'
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
	sorters: [{
		property: 'id',
		direction: 'ASC'
	}]
});
