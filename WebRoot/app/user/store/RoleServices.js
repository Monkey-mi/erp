Ext.define('erp.user.store.RoleServices', {
	extend: 'Ext.data.Store',
	requires:['erp.user.model.RoleService'],
	model: 'erp.user.model.RoleService',
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{model:'RoleService'},
		api: {
			create: 'main/Users.do?method=addRoleService',
			update: 'main/Users.do?method=updateRoleService',
			read:	'main/Users.do?method=getRoleServiceList',
			destroy:'main/Users.do?method=deleteRoleService'
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