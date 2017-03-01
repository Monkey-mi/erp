Ext.define('erp.view.master.purchaseDetail.store.ContractDetail', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.master.purchaseDetail.model.ContractDetail'],
	model: 'erp.view.master.purchaseDetail.model.ContractDetail',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'purchasedetail/contractdetail.act?method=addContractDetail',
			update: 'purchasedetail/contractdetail.act?method=updateContractDetail',
			read: 'purchasedetail/contractdetail.act?method=getContractDetailList',
			destroy: 'purchasedetail/contractdetail.act?method=deleteContractDetail'
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
	sorter: [{
		property: 'htxh',
		direction: 'ASC'
	}]
});
