Ext.define('erp.materialQualityTesting.store.Wtjycssqb', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialQualityTesting.model.Wtjycssqb'],
	model: 'erp.materialQualityTesting.model.Wtjycssqb',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'materialQuality/wtjycssqb.act?method=addwtjycssqb',
			update: 'materialQuality/wtjycssqb.act?method=updatewtjycssqb',
			read: 'materialQuality/wtjycssqb.act?method=getwtjycssqbList',
			destroy: 'materialQuality/wtjycssqb.act?method=deletewtjycssqb'
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
