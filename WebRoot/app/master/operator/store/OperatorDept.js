Ext.define('tp.crm.master.basicData.operator.store.OperatorDept', {
	extend: 'Ext.data.Store',
	reqiures: ['tp.crm.master.basicData.operator.model.OperatorDept'],
	model: 'tp.crm.master.basicData.operator.model.OperatorDept',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: 'post',
		api: {
			create: 'crm/operator.act?method=addOperatorDept',
			update: 'crm/operator.act?method=updateOperatorDept',
			read: 'crm/operator.act?method=getOperatorDeptList',
			destroy: 'crm/operator.act?method=deleteOperatorDept'
		},
		reader: {
			type: 'json',
			root: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		},
		writer: {
			type: 'json',
			root: 'data',
			encode: true,
			allowSingle: false
		}
	},
	sorters: [{
		property: 'lbbh',
		direction: 'ASC'
	}]
});
