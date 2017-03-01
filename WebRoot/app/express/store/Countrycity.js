Ext.define('erp.express.store.Countrycity', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.express.model.Countrycity'],
	model: 'erp.express.model.Countrycity',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'es/expressCountry.crm?method=addCountrycity',
			update: 'es/expressCountry.crm?method=updateCountrycity',
			read: 'es/expressCountry.crm?method=getCountrycityList',
			destroy: 'es/expressCountry.crm?method=deleteCountrycity'
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
		property: 'country_id',
		direction: 'ASC'
	}]
});
