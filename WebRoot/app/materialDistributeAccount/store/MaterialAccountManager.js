Ext.define('erp.materialDistributeAccount.store.MaterialAccountManager', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialDistributeAccount.model.MaterialAccountManager'],
	model: 'erp.materialDistributeAccount.model.MaterialAccountManager',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			read: 'materialAccount/materialAccountManager.act?method=getMaterialAccountManagerList',	
			create: 'materialAccount/materialAccountManager.act?method=addMaterialAccountManager',
			update: 'materialAccount/materialAccountManager.act?method=updateMaterialAccountManager',
			destroy: 'materialAccount/materialAccountManager.act?method=deleteMaterialAccountManager'
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
