Ext.define('erp.materialInventory.store.MaterialInventoryManager', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialInventory.model.MaterialInventoryManager'],
	model: 'erp.materialInventory.model.MaterialInventoryManager',
	pageSize: 50,	
	proxy: {
		type: 'ajax',
		timeout : 900000,
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'materialInventory/materialInventory.act?method=addMaterialInventory',
			update: 'materialInventory/materialInventory.act?method=updateMaterialInventory',
			read: 'materialInventory/materialInventory.act?method=getMaterialInventory',
			destroy: 'materialInventory/materialInventory.act?method=deleteMaterialInventory'
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
	remoteFilter: true,
	remoteSort:true,
	sorters: [{
		property: 'rkdh,rkxh',
		direction: 'ASC'
	}]
});
