Ext.define('erp.arrivalRegister.store.Rkd', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.arrivalRegister.model.Rkd'],
	model: 'erp.arrivalRegister.model.Rkd',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update: 'POST'},
		/*extraParams:{usePaging:true,history:0},*/
		api: {
			read: 'arrivalregister/arrivalregister.act?method=getRkdList'
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
