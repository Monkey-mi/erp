Ext.define('erp.view.master.purchaseDetail.store.ContractSubsidiary', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.master.purchaseDetail.model.ContractSubsidiary'],
	model: 'erp.view.master.purchaseDetail.model.ContractSubsidiary',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'purchasedetail/contractsubsidiary.act?method=addContractSubsidiary',
			update: 'purchasedetail/contractsubsidiary.act?method=updateContractSubsidiary',
			read: 'purchasedetail/contractsubsidiary.act?method=getContractSubsidiaryList',
			destroy: 'purchasedetail/contractsubsidiary.act?method=deleteContractSubsidiary'
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
		property: 'htbh,htxh,jlxh',
		direction: 'ASC'
	}]
});
