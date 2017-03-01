Ext.define('erp.view.master.category.store.CooperateAuthority', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.master.category.model.CooperateAuthority'],
	model: 'erp.view.master.category.model.CooperateAuthority',
	pageSize: 30,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'category/categorycooperate.act?method=addCooperateAuthority',
			update: 'category/categorycooperate.act?method=updateCooperateAuthority',
			read: 'category/categorycooperate.act?method=getCooperateAuthority',
			destroy: 'category/categorycooperate.act?method=deleteCooperateAuthority'
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
