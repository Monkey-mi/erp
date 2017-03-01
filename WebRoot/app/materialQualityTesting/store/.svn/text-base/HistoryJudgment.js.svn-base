Ext.define('erp.materialQualityTesting.store.HistoryJudgment', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialQualityTesting.model.MaterialQualityManager'],
	model: 'erp.materialQualityTesting.model.MaterialQualityManager',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			read: 'materialQuality/materialquality.act?method=getHistoryJudgmentList',	
			create: 'materialQuality/materialquality.act?method=addHistoryJudgment',
			update: 'materialQuality/materialquality.act?method=updateHistoryJudgment',
			destroy: 'materialQuality/materialquality.act?method=deleteHistoryJudgment'
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
