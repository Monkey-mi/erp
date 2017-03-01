Ext.define('erp.purchaseInspectionManage.store.PurchaseInspectionManager', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.purchaseInspectionManage.model.PurchaseInspectionManager'],
	model: 'erp.purchaseInspectionManage.model.PurchaseInspectionManager',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchaseInspection/purchaseInspection.act?method=getPurchaseInspectionManagerList'
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
