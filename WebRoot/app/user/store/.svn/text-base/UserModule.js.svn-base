Ext.define('erp.user.store.UserModule',{
    extend:'Ext.data.Store',
    model:'erp.user.model.UserModule',
    proxy:{
    	type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{
			usePaging:true
		},
		api: {
			create: 'main/Users.do?method=addUserModule',
			update: 'main/Users.do?method=updateUserModule',
			read:	'main/Users.do?method=getUserModuleList',
			destroy:'main/Users.do?method=deleteUserModule'
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