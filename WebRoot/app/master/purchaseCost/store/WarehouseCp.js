Ext.define('erp.master.purchaseCost.store.WarehouseCp', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.purchaseCost.model.WarehouseCp'],
	model: 'erp.master.purchaseCost.model.WarehouseCp',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchasecost/warehousecp.act?method=getWarehouseCpList'
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
	sorter: [{
		property: '',
		direction: 'ASC'
	}]
});
