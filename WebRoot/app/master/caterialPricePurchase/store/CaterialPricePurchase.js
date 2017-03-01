Ext.define('erp.master.caterialPricePurchase.store.CaterialPricePurchase', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.caterialPricePurchase.model.CaterialPricePurchase'],
	model: 'erp.master.caterialPricePurchase.model.CaterialPricePurchase',
	pageSize: 200,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{gdbj:0,usePaging:true,czy_gh:erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id},
		api: {
			create: 'caterialpricepurchase/caterialpricepurchase.act?method=addCaterialPricePurchase',
			update: 'caterialpricepurchase/caterialpricepurchase.act?method=updateCaterialPricePurchase',
			read: 'caterialpricepurchase/caterialpricepurchase.act?method=getCaterialPricePurchaseList',
			destroy: 'caterialpricepurchase/caterialpricepurchase.act?method=deleteCaterialPricePurchase'
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
		property: 'clhh',
		direction: 'ASC'
	}]
});
