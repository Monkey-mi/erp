Ext.define('erp.report.engine.model.CustomQueryCdtion',{
	extend:'Ext.data.Model',
	idProperty :'c_id',
	fields:[
		{name:'c_id',type:'int'},
		{name:'l_id',type:'int'},
		{name:'ope'},
		{name:'opeVal'},
		{name:'field_type'},
		{name:'ft_ff_id'},
		{name:'cd_type'}
	]
});