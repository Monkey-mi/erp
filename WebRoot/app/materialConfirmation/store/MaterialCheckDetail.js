Ext.define('erp.materialConfirmation.store.MaterialCheckDetail', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialConfirmation.model.MaterialCheckDetail'],
	model: 'erp.materialConfirmation.model.MaterialCheckDetail',
	pageSize: 25,
	
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'materialConfirmation/MaterialCheckDetail.srm?method=addMaterialCheckDetail',
			update: 'materialConfirmation/MaterialCheckDetail.srm?method=updateMaterialCheckDetail',
			read: 'materialConfirmation/MaterialCheckDetail.srm?method=getMaterialCheckDetailList',
			destroy: 'materialConfirmation/MaterialCheckDetail.srm?method=deleteMaterialCheckDetail'
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
		property: 'check_id',
		direction: 'ASC'
	}]
});
