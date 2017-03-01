Ext.define('erp.view.master.category.model.CategoryAuthority', {
	extend: 'erp.common.basic.model.Model',
	idProperty: 'czy_gh',
	fields: [
		{ name: 'lbbh' ,hidden:true},
		{ name: 'czy_gh' ,header:'操作员工号',columnWidth:80},
		{ name: 'czy_xm' ,header:'操作员姓名',columnWidth:80},
		{ name: 'tpbj', type: 'int' ,header:'特批',columnWidth:40,isSign:true}
	]
});
