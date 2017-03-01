Ext.define('erp.arrivalRegister.store.HistoryArrival', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.arrivalRegister.model.ArrivalRegister'],
	model: 'erp.arrivalRegister.model.ArrivalRegister',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {read : 'POST'},
		extraParams:{usePaging:true},
		api: {
			read: 'arrivalregister/arrivalregister.act?method=getHistoryArrivalList'
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
