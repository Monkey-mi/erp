Ext.define('erp.materialQualityTesting.store.Ckmcsx', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialQualityTesting.model.Ckmc'],
	model: 'erp.materialQualityTesting.model.Ckmc',
//	pageSize: 25,
	proxy: {
		type: 'ajax',
		extraParams:{usePaging:true},
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			read: 'materialQuality/ckmc.act?method=getCkmc'			
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
		property: 'ckbh',
		direction: 'ASC'
	}]
});
