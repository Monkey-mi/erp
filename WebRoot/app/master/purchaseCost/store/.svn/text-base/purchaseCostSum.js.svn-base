Ext.define('erp.master.purchaseCost.store.purchaseCostSum', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.purchaseCost.model.purchaseCostSum'],
	model: 'erp.master.purchaseCost.model.purchaseCostSum',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'purchasecost/purchasecostsum.act?method=addpurchaseCostSum',
			update: 'purchasecost/purchasecostsum.act?method=updatepurchaseCostSum',
			read: 'purchasecost/purchasecostsum.act?method=getpurchaseCostSumList',
			destroy: 'purchasecost/purchasecostsum.act?method=deletepurchaseCostSum'
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
		property: 'fydh',
		direction: 'ASC'
	}]
});
