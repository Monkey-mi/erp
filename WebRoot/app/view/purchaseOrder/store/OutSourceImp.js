Ext.define('erp.view.purchaseOrder.store.OutSourceImp', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseOrder.model.OutSourceImp'],
	model: 'erp.view.purchaseOrder.model.OutSourceImp',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchaseorder/outsourcepicking.act?method=getOutSourceImpList'
		},
		extraParams:{usePaging:true},
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
