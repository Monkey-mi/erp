Ext.define('erp.materialQualityTesting.store.GetMaxwtdh', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialQualityTesting.model.Wtjycssqb'],
	model: 'erp.materialQualityTesting.model.Wtjycssqb',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			read: 'materialQuality/wtjycssqb.act?method=getMaxwtdh'
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
		property: 'wtdh',
		direction: 'ASC'
	}]
});
