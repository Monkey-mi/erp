Ext.define('erp.purchaseInspectionManage.store.EditPurchaseInspection', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.purchaseInspectionManage.model.EditPurchaseInspection'],
	model: 'erp.purchaseInspectionManage.model.EditPurchaseInspection',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchaseInspection/purchaseInspection.act?method=getEditPurchaseInspectionList',
			create: 'purchaseInspection/purchaseInspection.act?method=addEditPurchaseInspection',
			update: 'purchaseInspection/purchaseInspection.act?method=updateEditPurchaseInspection',
			destroy: 'purchaseInspection/purchaseInspection.act?method=deleteEditPurchaseInspection'
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
			encode: true,
			allowSingle: false
		}
	},
	sorter: [{
		property: '',
		direction: 'ASC'
	}]
});
