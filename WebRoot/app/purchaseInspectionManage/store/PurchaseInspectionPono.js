Ext.define('erp.purchaseInspectionManage.store.PurchaseInspectionPono', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.purchaseInspectionManage.model.PurchaseInspectionPono'],
	model: 'erp.purchaseInspectionManage.model.PurchaseInspectionPono',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'purchaseInspection/inspectionPono.act?method=addPurchaseInspectionPono',
			update: 'purchaseInspection/inspectionPono.act?method=updatePurchaseInspectionPono',
			read: 'purchaseInspection/inspectionPono.act?method=getPurchaseInspectionPonoList',
			destroy: 'purchaseInspection/inspectionPono.act?method=deletePurchaseInspectionPono'
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
