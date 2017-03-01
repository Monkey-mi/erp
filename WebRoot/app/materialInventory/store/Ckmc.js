Ext.define('erp.materialInventory.store.Ckmc', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialInventory.model.Ckmc'],
	model: 'erp.materialInventory.model.Ckmc',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			read: 'materialInventory/materialInventory.act?method=getCkmcList'			
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
			writeAllFields:true,
			encode: true,
			allowSingle: false
		}
	},

	sorter: [{
		property: 'ckbh',
		direction: 'ASC'
	}]
});
