Ext.define('erp.materialQualityTesting.store.Department', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialQualityTesting.model.Department'],
	model: 'erp.materialQualityTesting.model.Department',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			read: 'materialQuality/department.act?method=getDepartment'			
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
		property: 'lbbh',
		direction: 'ASC'
	}]
});
