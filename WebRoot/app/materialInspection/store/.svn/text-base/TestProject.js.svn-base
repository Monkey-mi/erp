Ext.define('erp.materialInspection.store.TestProject', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialInspection.model.TestProject'],
	model: 'erp.materialInspection.model.TestProject',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			read: 'erp/materialInspection.act?method=getTestProject'
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
