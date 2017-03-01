Ext.define('erp.materialTestEvaluation.store.MaterialTestEvaluation', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialTestEvaluation.model.MaterialTestEvaluation'],
	model: 'erp.materialTestEvaluation.model.MaterialTestEvaluation',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'materialTestEvaluation/MaterialTestEvaluation.act?method=addMaterialTestEvaluation',
			update: 'materialTestEvaluation/MaterialTestEvaluation.act?method=updateMaterialTestEvaluation',
			read: 'materialTestEvaluation/MaterialTestEvaluation.act?method=getMaterialTestEvaluationList',
			destroy: 'materialTestEvaluation/MaterialTestEvaluation.act?method=deleteMaterialTestEvaluation'
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
