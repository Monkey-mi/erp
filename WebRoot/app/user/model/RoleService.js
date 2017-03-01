Ext.define('erp.user.model.RoleService', {
	extend: 'Ext.data.Model',
	requires:['erp.setup.model.HttpService',
	          'erp.user.model.Role'],
	idProperty: 'id',
	identifier:'negative',
	fields: [{name:'id', type:'int'},
	         {name:'role_id', type:'int'},
	         {name:'s_id', type:'int'}
	         
	],
	hasMany:[
	               
	          {
	        	  model:'erp.user.model.Role',
	        	  name:'roles',
	        	  primaryKey:'role_id',
	        	  foreignKey:'role_id'
	          },
	          {
	        	  model:'erp.setup.model.HttpService',
	        	  name:'services',
	        	  primaryKey:'s_id',
	        	  foreignKey:'s_id'
	          }
	]
});