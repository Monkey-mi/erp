Ext.define('erp.view.master.purchaseDetail.store.MaterialDetail', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.master.purchaseDetail.model.MaterialDetail'],
	model: 'erp.view.master.purchaseDetail.model.MaterialDetail',
	pageSize:50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{usePaging:true,history:0},
		api: {
			read: 'purchasedetail/purchasedetail.act?method=getMaterialDetailList'
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
		property: 'clhh',
		direction: 'ASC'
	}]
});
