Ext.define('erp.payApply.store.SaleFee', {
	extend: 'Ext.data.Store',
	requires: ['erp.payApply.model.SaleFee'],
	model: 'erp.payApply.model.SaleFee',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'payapply/salefee.act?method=getSaleFeeList',
			create: 'payapply/salefee.act?method=addSaleFee',
			update: 'payapply/salefee.act?method=updateSaleFee',
			destroy: 'payapply/salefee.act?method=deleteSaleFee'
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
	   sorters: [{
		property: 'sqbh'+'sqxh',
		direction: 'ASC'
	}]
});