Ext.define('erp.supplierManager.store.AppGoods', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.supplierManager.model.AppGoods'],
	model: 'erp.supplierManager.model.AppGoods',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
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
			encode: true,
			writeAllFields:true,
			allowSingle: false
		}
	},
	sorter: [{
		property: 'goods_id',
		direction: 'ASC'
	}]
});
