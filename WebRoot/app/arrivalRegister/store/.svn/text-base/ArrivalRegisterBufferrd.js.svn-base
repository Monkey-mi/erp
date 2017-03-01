Ext.define('erp.arrivalRegister.store.ArrivalRegisterBufferrd', {
	extend: 'Ext.data.BufferedStore',
	reqiures: ['erp.arrivalRegister.model.ArrivalRegister'],
	model: 'erp.arrivalRegister.model.ArrivalRegister',
	pageSize: 50,
	leadingBufferZone: 100,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update: 'POST'},
		extraParams:{usePaging:true},
		api: {
			create: 'arrivalregister/arrivalregister.act?method=addArrivalRegister',
			update: 'arrivalregister/arrivalregister.act?method=updateArrivalRegister',
			read: 'arrivalregister/arrivalregister.act?method=getArrivalRegisterList',
			destroy: 'arrivalregister/arrivalregister.act?method=deleteArrivalRegister'
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
	remoteFilter:true,
	remoteSort:true,
	sorter: [{
		property: '',
		direction: 'ASC'
	}]
});
