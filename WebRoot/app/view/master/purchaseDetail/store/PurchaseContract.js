Ext.define('erp.view.master.purchaseDetail.store.PurchaseContract', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.master.purchaseDetail.model.PurchaseContract'],
	model: 'erp.view.master.purchaseDetail.model.PurchaseContract',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{usePaging:true},
		api: {
			create: 'purchasedetail/purchasecontract.act?method=addPurchaseContract',
			update: 'purchasedetail/purchasecontract.act?method=updatePurchaseContract',
			read: 'purchasedetail/purchasecontract.act?method=getPurchaseContractList',
			destroy: 'purchasedetail/purchasecontract.act?method=deletePurchaseContract'
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
			allowSingle: false,
			writeAllFields:true
		}
	},
	sorter: [{
		property: 'htbh',
		direction: 'ASC'
	}]
});
