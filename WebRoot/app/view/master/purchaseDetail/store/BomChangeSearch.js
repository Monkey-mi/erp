Ext.define('erp.view.master.purchaseDetail.store.BomChangeSearch', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.master.purchaseDetail.model.BomChangeSearch'],
	model: 'erp.view.master.purchaseDetail.model.BomChangeSearch',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchasedetail/purchasedetail.act?method=getBomChangeSearchList'
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		}
	},
	sorter: [{
		property: 'gzdh',
		direction: 'ASC'
	}]
});
