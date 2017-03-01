Ext.define('erp.view.purchaseOrder.store.PurBom', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseOrder.model.PurBom'],
	model: 'erp.view.purchaseOrder.model.PurBom',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchaseorder/purchaseorderdetail.act?method=getPurBomList'
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
		property: 'jlxh',
		direction: 'ASC'
	}]
});
