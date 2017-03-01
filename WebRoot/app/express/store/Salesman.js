Ext.define('erp.express.store.Salesman', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.express.model.Salesman'],
	model: 'erp.express.model.Salesman',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{usePaging:true,history:0},
		api: {
			create: 'essell/salesman.crm?method=addSalesman',
			update: 'essell/salesman.crm?method=updateSalesman',
			read: 'essell/salesman.crm?method=getSalesmanList',
			destroy: 'essell/salesman.crm?method=deleteSalesman'
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
		property: 'ywybh',
		direction: 'ASC'
	}]
});
