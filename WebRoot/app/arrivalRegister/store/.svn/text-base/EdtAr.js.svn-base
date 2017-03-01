Ext.define('erp.arrivalRegister.store.EdtAr', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.arrivalRegister.model.ArrivalRegister'],
	model: 'erp.arrivalRegister.model.ArrivalRegister',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update: 'POST'},
		/*extraParams:{usePaging:true,history:0},*/
		api: {
			create: 'arrivalregister/arrivalregister.act?method=addArrivalRegister',
			update: 'arrivalregister/arrivalregister.act?method=updateArrivalRegister',
			read: 'arrivalregister/arrivalregister.act?method=getDhdjb'
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
