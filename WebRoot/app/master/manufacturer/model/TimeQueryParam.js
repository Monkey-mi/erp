Ext.define('erp.master.manufacturer.model.TimeQueryParam', {
	extend: 'Ext.data.Model',
	fields: [		
		{ name: 'qsrq'},//起始日期：
		{ name: 'jzrq'},//截止日期：
		{ name: 's_jzrq'},
		{ name: 'qcqs'},
		{ name:  'tjlb' ,type : 'int'},//统计类别：
		{ name: 'yhbh'},//所属用户：
		{ name: 'hsbm'},//核算部门：
		{ name: 'wbbj', type : 'int'},//币种选择：
		{ name: 'gdbj', type : 'int'},
		{ name: 'nf', type: 'float'},
		{ name: 'condition'}
		]
});