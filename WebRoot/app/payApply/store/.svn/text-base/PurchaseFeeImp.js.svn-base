Ext.define('erp.payApply.store.PurchaseFeeImp', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.PurchaseFeeImp'],
	model: 'erp.payApply.model.PurchaseFeeImp',
	pageSize: 25,
	proxy: {		
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams : {usePaging : true},
		api: {
			read: 'payapply/purchasefee.act?method=getPurchaseFeeImpList'
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
		property: 'fydh',
		direction: 'ASC'
	}]
});
