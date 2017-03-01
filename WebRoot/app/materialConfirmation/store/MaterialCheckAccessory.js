Ext.define('erp.materialConfirmation.store.MaterialCheckAccessory', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialConfirmation.model.MaterialCheckAccessory'],
	model: 'erp.materialConfirmation.model.MaterialCheckAccessory',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'materialConfirmation/MaterialCheckAccessory.srm?method=addMaterialCheckAccessory',
			update: 'materialConfirmation/MaterialCheckAccessory.srm?method=updateMaterialCheckAccessory',
			read: 'materialConfirmation/MaterialCheckAccessory.srm?method=getMaterialCheckAccessoryList',
			destroy: 'materialConfirmation/MaterialCheckAccessory.srm?method=deleteMaterialCheckAccessory'
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
		property: 'wjbh',
		direction: 'ASC'
	}]
});
