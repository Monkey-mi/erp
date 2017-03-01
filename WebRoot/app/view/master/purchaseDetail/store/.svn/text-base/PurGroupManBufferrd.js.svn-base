Ext.define('erp.view.master.purchaseDetail.store.PurGroupMan', {
	extend: 'Ext.data.BufferedStore',
	reqiures: ['erp.view.master.purchaseDetail.model.PurGroupMan'],
	model: 'erp.view.master.purchaseDetail.model.PurGroupMan',
	pageSize: 20,
	leadingBufferZone: 100,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{usePaging:true},
		api: {
			read: 'purchasedetail/purchasedetail.act?method=getPurGroupManList'
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
		property: 'cgzh',
		direction: 'ASC'
	}]
});
