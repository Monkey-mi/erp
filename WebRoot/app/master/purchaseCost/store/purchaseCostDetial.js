Ext.define('erp.master.purchaseCost.store.purchaseCostDetial', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.purchaseCost.model.purchaseCostDetial'],
	model: 'erp.master.purchaseCost.model.purchaseCostDetial',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'purchasecost/purchasecostdetial.act?method=addpurchaseCostDetial',
			update: 'purchasecost/purchasecostdetial.act?method=updatepurchaseCostDetial',
			read: 'purchasecost/purchasecostdetial.act?method=getpurchaseCostDetialList',
			destroy: 'purchasecost/purchasecostdetial.act?method=deletepurchaseCostDetial'
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
