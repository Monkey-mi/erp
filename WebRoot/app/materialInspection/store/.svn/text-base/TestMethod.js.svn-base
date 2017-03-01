Ext.define('erp.materialInspection.store.TestMethod', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialInspection.model.TestMethod'],
	model: 'erp.materialInspection.model.TestMethod',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			read: 'erp/materialInspection.act?method=getTestMethod'
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
			writeAllFields:true,
			encode: true,
			allowSingle: false
		}
	},
	sorter: [{
		property: '',
		direction: 'ASC'
	}]
});
