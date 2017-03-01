Ext.define('erp.purchaseInspectionManage.store.DistributeObject', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.purchaseInspectionManage.model.DistributeObject'],
	model: 'erp.purchaseInspectionManage.model.DistributeObject',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'purchaseInspection/purchaseInspection.act?method=addDistributeObject',
			update: 'purchaseInspection/purchaseInspection.act?method=updateDistributeObject',
			read: 'purchaseInspection/purchaseInspection.act?method=getDistributeObjectList',
			destroy: 'purchaseInspection/purchaseInspection.act?method=deleteDistributeObject'
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
		property: 'czy_gh',
		direction: 'ASC'
	}]
});
