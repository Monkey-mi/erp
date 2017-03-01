Ext.define('erp.view.master.category.store.CategoryAuthority', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.master.category.model.CategoryAuthority'],
	model: 'erp.view.master.category.model.CategoryAuthority',
	pageSize: 30,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'category/categoryauthority.act?method=addCategoryAuthority',
			update: 'category/categoryauthority.act?method=updateCategoryAuthority',
			read: 'category/categoryauthority.act?method=getCategoryAuthorityList',
			destroy: 'category/categoryauthority.act?method=deleteCategoryAuthority'
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
			allowSingle: false,
			writeAllFields:true
		}
	},
	sorter: [{
		property: 'lbbh,czy_gh',
		direction: 'ASC'
	}]
});
