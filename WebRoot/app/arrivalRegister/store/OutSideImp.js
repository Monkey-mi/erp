Ext.define('erp.arrivalRegister.store.OutSideImp', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.arrivalRegister.model.OutSideImp'],
	model: 'erp.arrivalRegister.model.OutSideImp',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update: 'POST'},
		extraParams:{usePaging:true,history:0},
		api: {
			/*create: 'arrivalregister/arrivalregister.act?method=addArrivalRegister',
			update: 'arrivalregister/arrivalregister.act?method=updateArrivalRegister',*/
			read: 'arrivalregister/arrivalregister.act?method=getOutSideImpList'
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
