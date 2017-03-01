Ext.define('erp.materialInspection.store.MaterialInspection', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialInspection.model.MaterialInspection'],
	model: 'erp.materialInspection.model.MaterialInspection',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'erp/materialInspection.act?method=addMaterialInspection',
			update: 'erp/materialInspection.act?method=updateMaterialInspection',
			read: 'erp/materialInspection.act?method=getMaterialInspectionList',
			destroy: 'erp/materialInspection.act?method=deleteMaterialInspection'
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
