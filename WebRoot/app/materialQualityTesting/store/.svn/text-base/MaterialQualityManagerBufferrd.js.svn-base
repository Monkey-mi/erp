Ext.define('erp.materialQualityTesting.store.MaterialQualityManagerBufferrd', {
	extend: 'Ext.data.BufferedStore',
	reqiures: ['erp.materialQualityTesting.model.MaterialQualityManager'],
	model: 'erp.materialQualityTesting.model.MaterialQualityManager',
	pageSize: 50,
	leadingBufferZone: 100,
	proxy: {
		timeout:900000,
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			read: 'materialQuality/materialquality.act?method=getMaterialQualityManagerList'
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
	remoteFilter: true,
	remoteSort:true,
	sorter: [{
//		property: 'ckbh'+'dhxh',
		property: 'dhdh,dhxh',
		direction: 'ASC'
	}]
});
