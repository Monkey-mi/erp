Ext.define('erp.supplyInvoice.store.InventoryList', {
	extend: 'Ext.data.Store',
	requires: ['erp.supplyInvoice.model.InventoryList'],
	model: 'erp.supplyInvoice.model.InventoryList',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'supplyinvoice/inventorylist.act?method=getInventoryListList'
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
	   sorters: [{
		property: 'fplb'+'fphm',
		direction: 'ASC'
	}]
});