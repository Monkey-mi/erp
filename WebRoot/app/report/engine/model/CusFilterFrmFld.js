Ext.define('erp.report.engine.model.CusFilterFrmFld',{
	extend:'Ext.data.Model',
	//idProperty :'ff_id',
	fields:[
		{name:'ffName'},//字段名
		{name:'ftName'},//表名
		{name:'cusName'},//自定义名
		{name:'condition'}//查询条件
	]
});