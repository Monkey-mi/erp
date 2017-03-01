Ext.define('erp.express.store.Province', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.express.model.Province'],
	model: 'erp.express.model.Province',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'es/province.crm?method=addProvince',
			update: 'es/province.crm?method=updateProvince',
			read: 'es/province.crm?method=getProvinceList',
			destroy: 'es/province.crm?method=deleteProvince'
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
