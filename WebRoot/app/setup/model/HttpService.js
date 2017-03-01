Ext.define('erp.setup.model.HttpService',{
	extend:'Ext.data.Model',
	idProperty :'s_id',
	fields:[
	        {name:'s_id',type:'int'},
	        {name:'mod_id',typ:'int'},
	        {name:'s_name'},
	        {name:'s_path'},
	        {name:'m_name'},
	        {name:'p_desc'},
	        {name:'type'},
	        {name:'order_seq'},
	        {name:'remark'}
	]
});