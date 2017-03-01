Ext.define('erp.materialQualityTesting.store.Wtjycssqmxb', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialQualityTesting.model.Wtjycssqmxb'],
	model: 'erp.materialQualityTesting.model.Wtjycssqmxb',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'materialQuality/wtjycssqmxb.act?method=addwtjycssqmxb',
			update: 'materialQuality/wtjycssqmxb.act?method=updatewtjycssqmxb',
			read: 'materialQuality/wtjycssqmxb.act?method=getwtjycssqmxbList',
			destroy: 'materialQuality/wtjycssqmxb.act?method=deletewtjycssqmxb'
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
