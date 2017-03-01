Ext.define('erp.view.purchaseOrder.store.OutSourcePicking', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseOrder.model.OutSourcePicking'],
	model: 'erp.view.purchaseOrder.model.OutSourcePicking',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'purchaseorder/outsourcepicking.act?method=addOutSourcePicking',
			update: 'purchaseorder/outsourcepicking.act?method=updateOutSourcePicking',
			read: 'purchaseorder/outsourcepicking.act?method=getOutSourcePickingList',
			destroy: 'purchaseorder/outsourcepicking.act?method=deleteOutSourcePicking'
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
		property: 'tzxh',
		direction: 'ASC'
	}]
});
