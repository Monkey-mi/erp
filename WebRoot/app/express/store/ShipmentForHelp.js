//导入出货编号，数据仓库
Ext.define('erp.express.store.ShipmentForHelp', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.express.model.Shipment'],
	model: 'erp.express.model.Shipment',
	pageSize: 20,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{usePaging:true},
		api: {
			read: 'es/express.crm?method=getShipmentPlanListForHelp'
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
		property: 'cybh',
		direction: 'ASC'
	}]
});
