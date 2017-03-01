Ext.define('erp.payApply.store.ContractDetail', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.ContractDetail'],
	model: 'erp.payApply.model.ContractDetail',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'payapply/payapply.act?method=getContractDetailList'
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
		property: 'htbh'+'htxh',
		direction: 'ASC'
	}]

})