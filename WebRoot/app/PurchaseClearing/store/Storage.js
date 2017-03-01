Ext.define('erp.PurchaseClearing.store.Storage', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.PurchaseClearing.model.CostBills'],
	model: 'erp.PurchaseClearing.model.CostBills',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update: 'POST',destroy : 'POST'},
	    /*extraParams:{usePaging:true,history:0},*/
		api: {
			create: 'purchaseclearing/purchaseclearing.act?method=addRkd',
			update: 'purchaseclearing/purchaseclearing.act?method=updateCostBills',
			read: 'purchaseclearing/purchaseclearing.act?method=getRkd',
			destroy: 'purchaseclearing/purchaseclearing.act?method=deleteRkd'
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
