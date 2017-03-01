Ext.define('erp.user.model.RoleFunc', {
	extend: 'Ext.data.Model',
	requires:['erp.setup.model.Function',
	          'erp.user.model.Role'],
	idProperty: 'id',
	identifier:'negative',
	fields: [{name:'id', type:'int',defaultValue:0},
	         {name:'role_id', type:'int'},
	         {name:'f_id', type:'int'}
	         
	],
	hasMany:[
	          {
	        	  model:'erp.user.model.Role',
	        	  name:'roles',
	        	  primaryKey:'role_id',
	        	  foreignKey:'role_id'
	          },
	          {
	        	  model:'erp.setup.model.Function',
	        	  name:'funcs',
	        	  primaryKey:'f_id',
	        	  foreignKey:'f_id'
	          }
	]
});