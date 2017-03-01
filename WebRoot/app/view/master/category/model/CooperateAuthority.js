Ext.define('erp.view.master.category.model.CooperateAuthority', {
	extend: 'erp.common.basic.model.Model',
	idProperty: 'czy_gh',
	fields: [
		{ name: 'lbbh' ,hidden:true},
		{ name: 'czy_gh' ,header:'协同人员工号',columnWidth:100},
		{ name: 'czy_xm' ,header:'协同人员姓名',columnWidth:100}
	]
});
