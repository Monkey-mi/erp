Ext.define('erp.express.model.Salesman', {
	extend: 'erp.common.basic.model.Model',
	idProperty: 'ywybh',
	fields: [
		{ name:'tablename',defaultValue:'ywyb'}, //表名  业务员表
		{ name: 'ywybh' },
		{ name: 'ywym' },
		{ name: 'ywyywm'},
		{ name: 'ywzg' },
		{ name: 'xslb' },
		{ name: 'bzsm' },
		{ name: 'czy_gh' },
		{ name: 'dhhm' },
		{ name: 'czhm' },
		{ name: 'gdbj', type: 'int' },
		{ name: 'scbj', type: 'int' },
		{ name: 'hsbm' },//核算部门 王志国
		{ name: 'hsbmmc' },//wzg
		{ name: 'lbmc' },//类别名称(自加)对应前台显示
		{ name: 'czy_xm' }//操作员姓名(自加)
	]
});
