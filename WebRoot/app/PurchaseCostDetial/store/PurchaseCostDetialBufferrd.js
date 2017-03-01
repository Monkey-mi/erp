Ext.define('erp.PurchaseCostDetial.store.PurchaseCostDetialBufferrd', {
	extend: 'Ext.data.BufferedStore',
	reqiures: ['erp.PurchaseCostDetial.model.PurchaseCostDetial'],
	model: 'erp.PurchaseCostDetial.model.PurchaseCostDetial',
	pageSize: 50,
	leadingBufferZone: 100,
	proxy: {
		type: 'ajax',
		actionMethods : {read : 'POST'},
		extraParams:{usePaging:true,czy_gh:erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id},
		api: {
			read: 'costdetial/costdetial.act?method=getCostDetialList'
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
		property: '',
		direction: 'ASC'
	}]
});
