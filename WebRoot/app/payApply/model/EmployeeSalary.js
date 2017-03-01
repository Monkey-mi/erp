Ext.define('erp.payApply.model.EmployeeSalary', {
	extend: 'Ext.data.Model',
	idProperty: 'sqbh'+'sqxh',
	fields: [
		{ name: 'sqbh', type: 'float' },
		{ name: 'sqxh', type: 'float' },
		{ name: 'hsbm' },
		{ name: 'bmmc' },
		{ name: 'gznf', type: 'float' },
		{ name: 'gzyf', type: 'float' },
		{ name: 'msbh' },
		{ name: 'zggh' },
		{ name: 'lmmc' },
		{ name: 'lmdh' },
		{ name: 'gzje', type: 'float' },
		{ name: 'sqje', type: 'float' },
		{ name: 'yfje', type: 'float' },
		{ name: 'wbbh' },
		{ name: 'wbhl', type: 'float' },
		{ name: 'wbje', type: 'float' },
		{ name: 'wbsq', type: 'float' }
	]
});
