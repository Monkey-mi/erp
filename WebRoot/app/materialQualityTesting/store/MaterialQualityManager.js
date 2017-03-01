Ext.define('erp.materialQualityTesting.store.MaterialQualityManager', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialQualityTesting.model.MaterialQualityManager'],
	model: 'erp.materialQualityTesting.model.MaterialQualityManager',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			read: 'materialQuality/materialquality.act?method=getMaterialQualityManagerList',	
			create: 'materialQuality/materialquality.act?method=addMaterialQualityManager',
			update: 'materialQuality/materialquality.act?method=updateMaterialQualityManager',
			destroy: 'materialQuality/materialquality.act?method=deleteMaterialQualityManager'
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
		property: 'ckbh'+'dhxh',
		direction: 'ASC'
	}]
});
