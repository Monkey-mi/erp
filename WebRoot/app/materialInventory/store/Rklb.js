Ext.define('erp.materialInventory.store.Rklb', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialInventory.model.Rklb'],
	model: 'erp.materialInventory.model.Rklb',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			read: 'materialInventory/materialInventory.act?method=getRklbList'			
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
		property: 'lbbh',
		direction: 'ASC'
	}]
});
