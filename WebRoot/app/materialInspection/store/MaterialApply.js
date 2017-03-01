Ext.define('erp.materialInspection.store.MaterialApply', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialInspection.model.MaterialApply'],
	model: 'erp.materialInspection.model.MaterialApply',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'erp/materialApply.act?method=addMaterialApply',
			update: 'erp/materialApply.act?method=updateMaterialApply',
			read: 'erp/materialApply.act?method=getMaterialApplyList',
			destroy: 'erp/materialApply.act?method=deleteMaterialApply'
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
