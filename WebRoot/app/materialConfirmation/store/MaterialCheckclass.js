Ext.define('erp.materialConfirmation.store.MaterialCheckclass', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialConfirmation.model.MaterialCheckclass'],
	model: 'erp.materialConfirmation.model.MaterialCheckclass',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'materialConfirmation/MaterialCheckclass.srm?method=addMaterialCheckclass',
			update: 'materialConfirmation/MaterialCheckclass.srm?method=updateMaterialCheckclass',
			read: 'materialConfirmation/MaterialCheckclass.srm?method=getMaterialCheckclassList',
			destroy: 'materialConfirmation/MaterialCheckclass.srm?method=deleteMaterialCheckclass'
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
		property: 'checkclass_id',
		direction: 'ASC'
	}]
});
