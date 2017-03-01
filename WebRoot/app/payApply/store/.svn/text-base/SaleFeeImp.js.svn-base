Ext.define('erp.payApply.store.SaleFeeImp', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.SaleFeeImp'],
	model: 'erp.payApply.model.SaleFeeImp',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'payapply/salefee.act?method=getSaleFeeImpList'
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
			allowSingle: false
		}
	},
	sorter: [{
		property: 'fydh',
		direction: 'ASC'
	}]
});
