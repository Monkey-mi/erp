Ext.define('erp.master.contractStop.store.ContractType', {
	extend: 'Ext.data.Store',
	requires: ['erp.master.contractStop.model.ContractType'],
	model: 'erp.master.contractStop.model.ContractType',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		 actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		 extraParams:{usePaging:true,history:0},
		api: {
			create: 'contracttype/contracttype.act?method=addContractType',
			update: 'contracttype/contracttype.act?method=updateContractType',
			read: 'contracttype/contracttype.act?method=getContractTypeList',
			destroy: 'contracttype/contracttype.act?method=deleteContractType'
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
	sorters : [{
		property: 'lxbh',
		direction: 'ASC'
	}]
});
