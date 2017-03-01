Ext.define('erp.user.store.UserFunc',{
    extend:'Ext.data.Store',
    model:'erp.user.model.UserFunc',
    proxy:{
    	type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{
			usePaging:true
		},
		api: {
			create: 'main/Users.do?method=addUserFunc',
			update: 'main/Users.do?method=updateUserFunc',
			read:	'main/Users.do?method=getUserFuncList',
			destroy:'main/Users.do?method=deleteUserFunc'
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