Ext.define('erp.user.store.UserInfos', {
	extend: 'Ext.data.Store',
	requires:['erp.user.model.UserInfo'],
	model: 'erp.user.model.UserInfo',
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{usePaging:true},
		api: {
			create: 'main/Users.do?method=addUser',
			update: 'main/Users.do?method=updateUser',
			read:	'main/Users.do?method=getUserList',
			destroy:'main/Users.do?method=deleteUser'
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			successProperty: 'success',
			messageProperty: 'message',
			totalProperty:'total'
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
          property: 'name',   
          direction: 'ASC'  
      },
      {   
          property: 'create_dt',   
          direction: 'DESC'  
      }
    ]
});