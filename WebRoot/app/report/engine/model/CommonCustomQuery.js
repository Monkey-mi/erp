Ext.define('erp.report.engine.model.CommonCustomQuery',{
	extend:'Ext.data.Model',
	/*idProperty :'use_id',*/
	fields:[
		{name:'use_id',type:'int'},
		{name:'l_id',type:'int'},
		{name:'description'},
		{name:'l_name'},
		{name:'l_desc'},
		{name:'user_id',type:'int'},
		{name:'user_type'},
		{name:'sequence'}
	]
});