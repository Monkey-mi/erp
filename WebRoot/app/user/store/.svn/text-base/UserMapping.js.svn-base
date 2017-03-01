Ext.define('erp.user.store.UserMapping', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.user.model.UserMapping'],
	model: 'erp.user.model.UserMapping',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'main/Users.do?method=addUserMapping',
			update: 'main/Users.do?method=updateUserMapping',
			read: 'main/Users.do?method=getUserMappingList',
			destroy: 'main/Users.do?method=deleteUserMapping'
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		},
		writer: {
			type: 'json',
			rootProperty: 'data',
			encode: true,
			writeAllFields:true,
			allowSingle: false
		}
	},
	sorter: [{
		property: 'id',
		direction: 'ASC'
	}]
});
