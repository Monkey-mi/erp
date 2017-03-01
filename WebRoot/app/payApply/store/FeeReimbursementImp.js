Ext.define('erp.payApply.store.FeeReimbursementImp', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.FeeReimbursementImp'],
	model: 'erp.payApply.model.FeeReimbursementImp',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'payapply/feereimbursement.act?method=getFeeReimbursementImpList'
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
		property: 'jlh',
		direction: 'ASC'
	}]
});
