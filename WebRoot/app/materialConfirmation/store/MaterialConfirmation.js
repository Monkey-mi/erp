Ext.define('erp.materialConfirmation.store.MaterialConfirmation', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialConfirmation.model.MaterialConfirmation'],
	model: 'erp.materialConfirmation.model.MaterialConfirmation',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'materialConfirmation/MaterialConfirmation.srm?method=addMaterialConfirmation',
			update: 'materialConfirmation/MaterialConfirmation.srm?method=updateMaterialConfirmation',
			read: 'materialConfirmation/MaterialConfirmation.srm?method=getMaterialConfirmationList',
			destroy: 'materialConfirmation/MaterialConfirmation.srm?method=deleteMaterialConfirmation'
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
		property: 'confirmation_id',
		direction: 'ASC'
	}]
});
