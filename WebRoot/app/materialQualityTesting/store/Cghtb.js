Ext.define('erp.materialQualityTesting.store.Cghtb', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialQualityTesting.model.Cghtb'],
	model: 'erp.materialQualityTesting.model.Cghtb',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			read: 'materialQuality/wtjycssqclmxb.act?method=getCghtb',
			update: 'materialQuality/wtjycssqclmxb.act?method=updateCghtb',
			create: 'materialQuality/wtjycssqclmxb.act?method=addCghtb',
			destroy: 'materialQuality/wtjycssqclmxb.act?method=deleteCghtb'
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
	}
});
