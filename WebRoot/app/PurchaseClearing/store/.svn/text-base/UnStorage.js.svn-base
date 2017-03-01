Ext.define('erp.PurchaseClearing.store.UnStorage', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.PurchaseClearing.model.CostBills'],
	model: 'erp.PurchaseClearing.model.CostBills',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update: 'POST'},
	    /*extraParams:{usePaging:true,history:0},*/
		api: {
		/*	create: 'purchaseclearing/purchaseclearing.act?method=addCostBills',
			update: 'purchaseclearing/purchaseclearing.act?method=updateCostBills',*/
			read: 'purchaseclearing/purchaseclearing.act?method=getWdrk'
		/*	destroy: 'purchaseclearing/purchaseclearing.act?method=deleteCostBills'*/
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
