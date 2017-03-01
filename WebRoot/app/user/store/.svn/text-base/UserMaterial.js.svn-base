Ext.define('erp.user.store.UserMaterial', {
	extend: 'Ext.data.Store',
	requires:['erp.user.model.UserMaterial'],
	model: 'erp.user.model.UserMaterial',
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{model:'UserMaterial'},
		api: {
			create: 'materialarchive/materialarchive.act?method=addUserMaterial',
			update: 'materialarchive/materialarchive.act?method=updateUserMaterial',
			read:	'materialarchive/materialarchive.act?method=getUserMaterialList',
			destroy:'materialarchive/materialarchive.act?method=deleteUserMaterial'
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