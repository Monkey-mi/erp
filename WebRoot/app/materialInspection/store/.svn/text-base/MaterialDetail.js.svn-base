Ext.define('erp.materialInspection.store.MaterialDetail', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialInspection.model.MaterialDetail'],
	model: 'erp.materialInspection.model.MaterialDetail',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'erp/materialDetail.act?method=addMaterialDetail',
			update: 'erp/materialDetail.act?method=updateMaterialDetail',
			read: 'erp/materialDetail.act?method=getMaterialDetailList',
			destroy: 'erp/materialDetail.act?method=deleteMaterialDetail'
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
		property: '',
		direction: 'ASC'
	}]
});
