Ext.define('erp.master.caterialPricePurchase.store.CaterialHistoryPriceCtl', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.caterialPricePurchase.model.CaterialHistoryPriceCtl'],
	model: 'erp.master.caterialPricePurchase.model.CaterialHistoryPriceCtl',
	pageSize: 200,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'caterialpricepurchase/caterialpricepurchase.act?method=getCaterialHistoryPriceCtlList'
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
		property: 'jlbh',
		direction: 'ASC'
	}]
});
