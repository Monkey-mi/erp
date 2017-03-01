Ext.define('erp.master.operator.store.Operator', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.operator.model.Operator'],
	model: 'erp.master.operator.model.Operator',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{
			usePaging:true
		},
		api: {
			read: 'operator/operator.act?method=getOperatorList'
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
			allowSingle: false,
			writeAllFields:true
		}
	},
	sorters: [{
		property: 'czy_gh',
		direction: 'ASC'
	}]
});
