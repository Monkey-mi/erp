Ext.define('erp.payApply.model.ApplayDepartmentTree', {
	extend: 'erp.common.basic.model.Model',
	idProperty: 'lbbh',
	fields: [
		{ name: 'lbbh',header:'类别编号',columnWidth:80},
		{ name: 'lbmc',header:'类别名称',columnWidth:90}	,
		{ name: 'lbjc', type: 'int',header:'级次',columnWidth:40},
		{ name: 'mjbz', type: 'int',header:'末级标志',columnWidth:80,isSign:true}
	]
});
