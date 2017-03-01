Ext.define('erp.master.foreigncurrency.store.foreignCurrency', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.foreigncurrency.model.foreignCurrency'],
	model: 'erp.master.foreigncurrency.model.foreignCurrency',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'foreigncurrency/foreigncurrency.act?method=getForeignCurrencyList'
		},
	reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		}
	},
	sorter: [{
		property: 'wbbh',
		direction: 'ASC'
	}]
});
