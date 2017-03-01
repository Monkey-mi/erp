Ext.define('erp.view.master.purchaseDetail.store.StoreQuote', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.master.purchaseDetail.model.StoreQuote'],
	model: 'erp.view.master.purchaseDetail.model.StoreQuote',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchasedetail/purchasecontract.act?method=getStoreQuoteList'
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
		property: 'ckbh',
		direction: 'ASC'
	}]
});
