Ext.define('erp.master.caterialPricePurchase.store.HistroyQuote', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.caterialPricePurchase.model.HistroyQuote'],
	model: 'erp.master.caterialPricePurchase.model.HistroyQuote',
	pageSize: 200,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'caterialpricepurchase/caterialpricepurchase.act?method=getHistroyQuoteList'
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
			writeAllFields:true,
			allowSingle: false
		}
	},
	sorter: [{
		property: '',
		direction: 'ASC'
	}]
});
