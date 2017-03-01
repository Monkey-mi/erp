Ext.define('erp.materialQualityTesting.store.Clbmb', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialQualityTesting.model.Clbmb'],
	model: 'erp.materialQualityTesting.model.Clbmb',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		extraParams:{usePaging:true},
		api: {
			read: 'materialQuality/clbmb.act?method=getClbmbList'			
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
		property: 'clhh',
		direction: 'ASC'
	}]
});
