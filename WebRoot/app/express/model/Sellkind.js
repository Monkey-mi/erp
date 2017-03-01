Ext.define('erp.express.model.Sellkind', {
	extend: 'erp.common.basic.model.Model',
	idProperty: 'lbbh',
	fields: [
		{ name:'tablename',defaultValue:'xslbb'}, //表名  销售类别
		{ name: 'lbbh' },//部门编号
		{ name: 'lbmc' },//部门名称 
		{ name: 'lbjc', type: 'int' },//部门级次 
		{ name: 'mjbz' },//末级标志 
		{ name: 'bzsm' },//备注说明 
		{ name: 'dhhm' },//电话号码 
		{ name: 'czhm' },//传真号码 
		{ name: 'dzyx' },//电子邮箱 
		{ name: 'yhbh' },//所属用户 
		{ name: 'sxbh', type: 'float' },//顺序编号
		{ name: 'scbj', type: 'int' },//删除标记
		{ name: 'hsbm' },//核算部门
		{ name: 'ysbbj' },//事业部标记
		//不是该表字段，传值作用
		{ name: 'bmmc'}//核算部门名称
	]
});
