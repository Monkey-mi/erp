Ext.define('erp.user.model.UserFunc',{
    extend:'Ext.data.Model',
    idProperty:'id',
    identifier:'negative',
    fields:[
    	{name:'id',type:'int'},
    	{name:'u_id',type:'int'},
    	{name:'f_id',type:'int'},
    	{name:'ou_id',type:'int'}
    	]
});