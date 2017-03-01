Ext.define('erp.setup.model.ExtDataSource',{
		extend:'Ext.data.Model',
		idProperty :'id',
		fields:[
		        {name:'id',type:'int'},
		        {name:'dstype'},
		        {name:'dscode'},
		        {name:'dsname'},
		        {name:'srvaddr'},
		        {name:'srvport',type:'int'},
		        {name:'srvlogin'},
		        {name:'srvpwd'},
		        {name:'dbname'}
		        ]
});