Ext.define('erp.payApply.store.FeeReimbursement', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.FeeReimbursement'],
	model: 'erp.payApply.model.FeeReimbursement',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'payapply/feereimbursement.act?method=addFeeReimbursement',
			update: 'payapply/feereimbursement.act?method=updateFeeReimbursement',
			read: 'payapply/feereimbursement.act?method=getFeeReimbursementList',
			destroy: 'payapply/feereimbursement.act?method=deleteFeeReimbursement'
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
		property: 'sqbh'+'sqxh',
		direction: 'ASC'
	}]
});
