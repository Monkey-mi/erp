Ext.define('erp.materialConfirmation.store.MaterialSample', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialConfirmation.model.MaterialSample'],
	model: 'erp.materialConfirmation.model.MaterialSample',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'materialConfirmation/MaterialSample.srm?method=addMaterialSample',
			update: 'materialConfirmation/MaterialSample.srm?method=updateMaterialSample',
			read: 'materialConfirmation/MaterialSample.srm?method=getMaterialSampleList',
			destroy: 'materialConfirmation/MaterialSample.srm?method=deleteMaterialSample'
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
		property: 'sample_id',
		direction: 'ASC'
	}]
});
