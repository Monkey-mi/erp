Ext.define('erp.payApply.store.EmployeeSalary', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.EmployeeSalary'],
	model: 'erp.payApply.model.EmployeeSalary',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'payapply/employeesalary.act?method=addEmployeeSalary',
			update: 'payapply/employeesalary.act?method=updateEmployeeSalary',
			read: 'payapply/employeesalary.act?method=getEmployeeSalaryList',
			destroy: 'payapply/employeesalary.act?method=deleteEmployeeSalary'
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
