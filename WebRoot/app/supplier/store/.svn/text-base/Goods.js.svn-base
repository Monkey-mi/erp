Ext.define('erp.supplier.store.Goods', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.supplier.model.Goods'],
	model: 'erp.supplier.model.Goods',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
		api: {
			create: 'supplier/goods.srm?method=addGoods',
			update: 'supplier/goods.srm?method=updateGoods',
			read: 'supplier/goods.srm?method=getGoodsList',
			destroy: 'supplier/goods.srm?method=deleteGoods'
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
			writeAllFields:true,
			encode: true,
			allowSingle: false
		}
	},
	sorters: [{
		property: 'goods_id',
		direction: 'DESC'
	}]
});
