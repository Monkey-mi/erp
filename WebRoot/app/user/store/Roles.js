Ext.define('erp.user.store.Roles', {
	extend: 'Ext.data.Store',
	requires:['erp.user.model.Role'],
	model: 'erp.user.model.Role',
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{
			usePaging:true
		},
		api: {
			create: 'main/Users.do?method=addRole',
			update: 'main/Users.do?method=updateRole',
			read:	'main/Users.do?method=getRoleList',
			destroy:'main/Users.do?method=deleteRole'
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			successProperty: 'success',
			messageProperty: 'message'
		},
		writer: {
			type: 'json',
			rootProperty: 'data',    //返回数据可以用post_data=[xxx]的形式包装
			encode: true,
			writeAllFields:true,
			allowSingle:false  /*即使单行也包装成数组形式，这样后台服务就无需对单行和多行分开解释了*/
		}
			
	},
	sorters: [   
	          {
	          	  property: 'order_seq',
                  direction: 'ASC'
	          },
              {   
                  property: 'role_name',
                  direction: 'ASC'  
              }
    ]
});