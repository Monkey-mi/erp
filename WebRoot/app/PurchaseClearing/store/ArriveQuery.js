Ext.define('erp.PurchaseClearing.store.ArriveQuery', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.arrivalRegister.model.ArrivalRegister'],
	model: 'erp.arrivalRegister.model.ArrivalRegister',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update: 'POST',destroy : 'POST'},
	    /*extraParams:{usePaging:true,history:0},*/
		api: {
			read: 'purchaseclearing/purchaseclearing.act?method=getArriveList'
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
