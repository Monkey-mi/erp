Ext.define('erp.view.master.category.store.Category', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.master.category.model.Category'],
	model: 'erp.view.master.category.model.Category',
	pageSize: 50,
	proxy: {
		api: {
			create: 'category/category.act?method=addCategory',
			update: 'category/category.act?method=updateCategory',
			read: 'category/category.act?method=getCategoryList',
			destroy: 'category/category.act?method=deleteCategory'
		},
		extraParams:{
            type:'category',usePaging:true,
            czy_gh:erp.Util.currentUser.isAdmin?'000':erp.Util.currentUser.accountMap[0].ref_u_id
        },
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
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
			allowSingle: false,
			writeAllFields:true
		}
	},
	sorter: [{
		property: 'lbbh',
		direction: 'ASC'
	}]
});
