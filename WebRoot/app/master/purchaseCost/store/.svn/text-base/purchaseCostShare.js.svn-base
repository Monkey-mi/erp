Ext.define('erp.master.purchaseCost.store.purchaseCostShare', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.purchaseCost.model.purchaseCostShare'],
	model: 'erp.master.purchaseCost.model.purchaseCostShare',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'purchasecost/purchasecostshare.act?method=addpurchaseCostShare',
			update: 'purchasecost/purchasecostshare.act?method=updatepurchaseCostShare',
			read: 'purchasecost/purchasecostshare.act?method=getpurchaseCostShareList',
			destroy: 'purchasecost/purchasecostshare.act?method=deletepurchaseCostShare'
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
