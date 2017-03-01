Ext.define('erp.materialQualityTesting.store.HistoryJudgmentCount', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialQualityTesting.model.MaterialQualityManager'],
	model: 'erp.materialQualityTesting.model.MaterialQualityManager',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			read: 'materialQuality/materialquality.act?method=getHistoryJudgmentCount'
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
		property: 'dhdh'+'dhxh',
		direction: 'ASC'
	}]
});
