Ext.define('erp.materialInspection.store.MaterialTestPro', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialInspection.model.MaterialTestPro'],
	model: 'erp.materialInspection.model.MaterialTestPro',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			read: 'erp/materialInspection.act?method=getMaterialTestProList'
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
