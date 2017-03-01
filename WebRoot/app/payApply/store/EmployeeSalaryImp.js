Ext.define('erp.payApply.store.EmployeeSalaryImp', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.EmployeeSalaryImp'],
	model: 'erp.payApply.model.EmployeeSalaryImp',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'payapply/employeesalary.act?method=getEmployeeSalaryImpList'
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
		property: 'zggh',
		direction: 'ASC'
	}]
});
