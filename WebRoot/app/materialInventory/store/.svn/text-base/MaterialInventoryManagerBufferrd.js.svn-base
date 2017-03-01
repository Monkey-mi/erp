Ext.define('erp.materialInventory.store.MaterialInventoryManagerBufferrd', {
	extend: 'Ext.data.BufferedStore',
	reqiures: ['erp.materialInventory.model.MaterialInventoryManager'],
	model: 'erp.materialInventory.model.MaterialInventoryManager',
	pageSize: 50,
	leadingBufferZone: 100,
	proxy: {
		timeout:900000,
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'materialInventory/materialInventory.act?method=getMaterialInventory'

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
//		property: 'rkdh'+'rkxh',
		property: 'rkdh,rkxh',
		direction: 'ASC'
	}]
});
