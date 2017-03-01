Ext.define('erp.user.model.RoleModule', {
	extend: 'Ext.data.Model',
	requires:['erp.setup.model.Module',
	          'erp.user.model.Role'],
	idProperty: 'id',
	identifier:'negative',
	fields: [{name:'id', type:'int'},
	         {name:'role_id', type:'int'},
	         {name:'mod_id', type:'int'}
	         
	],
	hasMany:[
	               
	          {
	        	  model:'erp.user.model.Role',
	        	  name:'roles',
	        	  primaryKey:'role_id',
	        	  foreignKey:'role_id'
	          },
	          {
	        	  model:'erp.setup.model.Module',
	        	  name:'modules',
	        	  primaryKey:'mod_id',
	        	  foreignKey:'mod_id'
	          }
	]
});