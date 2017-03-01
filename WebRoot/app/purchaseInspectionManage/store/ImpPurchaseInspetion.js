Ext.define('erp.purchaseInspectionManage.store.ImpPurchaseInspetion', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.purchaseInspectionManage.model.ImpPurchaseInspetion'],
	model: 'erp.purchaseInspectionManage.model.ImpPurchaseInspetion',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchaseInspection/imPurchaseInspection.act?method=getImpPurchaseInspetionList',
			create: 'purchaseInspection/imPurchaseInspection.act?method=addImpPurchaseInspetion',
			update: 'purchaseInspection/imPurchaseInspection.act?method=updateImpPurchaseInspetion',
			destroy: 'purchaseInspection/imPurchaseInspection.act?method=deleteImpPurchaseInspetion'
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
