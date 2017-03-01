Ext.define('erp.materialDistributeAccount.store.MaterialAccountDetail', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialDistributeAccount.model.MaterialAccountDetail'],
	model: 'erp.materialDistributeAccount.model.MaterialAccountDetail',
	pageSize: 50,
	proxy: {
			type: 'ajax',
			actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
			api: {
				read: 'materialAccount/materialAccountDetail.act?method=getMaterialAccountDetailList',	
				create: 'materialAccount/materialAccountDetail.act?method=addMaterialAccountDetail',
				update: 'materialAccount/materialAccountDetail.act?method=updateMaterialAccountDetail',
				destroy: 'materialAccount/materialAccountDetail.act?method=deleteMaterialAccountDetail'
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
