Ext.define('erp.master.purchaseCost.store.SaleType', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.purchaseCost.model.SaleType'],
	model: 'erp.master.purchaseCost.model.SaleType',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchasecost/purchasecost.act?method=getSaleTypeList'
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
