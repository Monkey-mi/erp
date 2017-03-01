Ext.define('erp.view.purchaseOrder.store.OutSourceDetailImp', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseOrder.model.OutSourceDetailImp'],
	model: 'erp.view.purchaseOrder.model.OutSourceDetailImp',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchaseorder/outsourcepicking.act?method=getOutSourceDetailImpList'
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
			allowSingle: false
		}
	},
	sorter: [{
		property: 'jhh',
		direction: 'ASC'
	}]
});
