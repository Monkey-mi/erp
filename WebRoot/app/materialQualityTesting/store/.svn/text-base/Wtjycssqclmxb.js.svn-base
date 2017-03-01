Ext.define('erp.materialQualityTesting.store.Wtjycssqclmxb', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialQualityTesting.model.Wtjycssqclmxb'],
	model: 'erp.materialQualityTesting.model.Wtjycssqclmxb',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'materialQuality/wtjycssqclmxb.act?method=addwtjycssqclmxb',
			update: 'materialQuality/wtjycssqclmxb.act?method=updatewtjycssqclmxb',
			read: 'materialQuality/wtjycssqclmxb.act?method=getwtjycssqclmxbList',
			destroy: 'materialQuality/wtjycssqclmxb.act?method=deletewtjycssqclmxb'
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
