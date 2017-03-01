Ext.define('erp.view.master.category.model.Category', {
	extend: 'erp.common.basic.model.Model',
	idProperty: 'lbbh',
	fields: [
		{ name: 'lbbh',header:'类别编号',columnWidth:80},
		{ name: 'lbmc',header:'类别名称',columnWidth:90},
		{ name: 'lbjc', type: 'int',header:'级次',columnWidth:40},
		{ name: 'mjbz', type: 'int',header:'末级标志',columnWidth:80,isSign:true},
		{ name: 'cpbj', type: 'int' ,header:'成品',columnWidth:40,isSign:true},
		{ name: 'bzclbj', type: 'int' ,header:'包装材料',columnWidth:80,isSign:true},
		{ name: 'cfbj', type: 'int' ,header:'采计重复',columnWidth:80,isSign:true},
		{ name: 'ghlbmc',header:'改后类别',columnWidth:90},
		{ name: 'ghlbbh' ,header:'改后类别编号',columnWidth:90,hidden:true},
		{ name: 'bzsm' ,header:'备注说明',flex:1},
		{ name: 'dhhm' ,header:'电话号码',columnWidth:80},
		{ name: 'czhm' ,header:'传真号码',columnWidth:80},
		{ name: 'dzyx' ,header:'电子邮箱',columnWidth:80},
		{ name: 'yhbh' ,header:'所属用户',columnWidth:80,hidden:true},
		{ name: 'hsbm' ,header:'核算部门',columnWidth:80,hidden:true}
	]
});
