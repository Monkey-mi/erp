Ext.define('erp.master.purchaseCost.store.Payfs', {
	extend: 'Ext.data.Store',
	requires: ['erp.master.purchaseCost.model.Payfs'],
	model: 'erp.master.purchaseCost.model.Payfs',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update: 'POST'},
		api: {
			create: 'purchasecost/purchasecost.act?method=addPayfs',
			read: 'purchasecost/purchasecost.act?method=getPayfs',
			update: 'purchasecost/purchasecost.act?method=updatePayfs'
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
