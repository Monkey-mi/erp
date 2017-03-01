Ext.define('erp.master.purchaseCost.store.PayCategory', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.purchaseCost.model.PayCategory'],
	model: 'erp.master.purchaseCost.model.PayCategory',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {read : 'POST'},
		api: {
			read: 'purchasecost/purchasecost.act?method=getPayCategoryList'
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
		property: 'lbbh',
		direction: 'ASC'
	}]
});
