Ext.define('erp.user.store.RoleFuncs', {
	extend: 'Ext.data.Store',
	requires:['erp.user.model.RoleFunc'],
	model: 'erp.user.model.RoleFunc',
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{model:'RoleFunc'},
		api: {
			create: 'main/Users.do?method=addRoleFunc',
			update: 'main/Users.do?method=updateRoleFunc',
			read:	'main/Users.do?method=getRoleFuncList',
			destroy:'main/Users.do?method=deleteRoleFunc'
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
	}
});