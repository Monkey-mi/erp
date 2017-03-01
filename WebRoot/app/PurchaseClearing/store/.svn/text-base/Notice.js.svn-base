Ext.define('erp.PurchaseClearing.store.Notice', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.PurchaseClearing.model.Notice'],
	model: 'erp.PurchaseClearing.model.Notice',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update: 'POST',destroy : 'POST'},
	    extraParams:{usePaging:true,history:0,czy_gh:erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id},
		api: {
			create: 'purchaseclearing/purchaseclearing.act?method=addNotice',
			update: 'purchaseclearing/purchaseclearing.act?method=updateNotice',
			read: 'purchaseclearing/purchaseclearing.act?method=getNoticeList',
			destroy: 'purchaseclearing/purchaseclearing.act?method=deleteNotice'
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
	remoteFilter:true,
	sorter: [{
		property: '',
		direction: 'ASC'
	}]
});
