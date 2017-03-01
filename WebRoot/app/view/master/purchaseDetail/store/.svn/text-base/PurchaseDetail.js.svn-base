Ext.define('erp.view.master.purchaseDetail.store.PurchaseDetail', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.master.purchaseDetail.model.PurchaseDetail'],
	model: 'erp.view.master.purchaseDetail.model.PurchaseDetail',
	pageSize: 50,
	proxy: {
		timeout:900000,
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{gdbj:0,usePaging:true,czy_gh:erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id
		},
		api: {
			read: 'purchasedetail/purchasedetail.act?method=getPurchaseDetailList'
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
		property: 'cgbh,cgxh',
		direction: 'ASC'
	}]
});
