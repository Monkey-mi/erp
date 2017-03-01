Ext.define('erp.view.master.purchaseDetail.store.PurSupplierSearch', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.master.purchaseDetail.model.PurSupplierSearch'],
	model: 'erp.view.master.purchaseDetail.model.PurSupplierSearch',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchasedetail/purchasedetail.act?method=getPurSupplierSearchList'
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		}
	},
	sorter: [{
		property: 'htbh',
		direction: 'ASC'
	}]
});
