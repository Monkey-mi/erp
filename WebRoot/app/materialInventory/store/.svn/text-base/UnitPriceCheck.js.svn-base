Ext.define('erp.materialInventory.store.UnitPriceCheck', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialInventory.model.UnitPriceCheck'],
	model: 'erp.materialInventory.model.UnitPriceCheck',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'materialInventory/materialInventory.act?method=addUnitPriceCheck',
			update: 'materialInventory/materialInventory.act?method=updateUnitPriceCheck',
			read: 'materialInventory/materialInventory.act?method=getUnitPriceCheckList',
			destroy: 'materialInventory/materialInventory.act?method=deleteUnitPriceCheck'
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
		property: '',
		direction: 'ASC'
	}]
});
