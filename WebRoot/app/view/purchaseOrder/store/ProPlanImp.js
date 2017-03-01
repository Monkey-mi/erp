Ext.define('erp.view.purchaseOrder.store.ProPlanImp', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseOrder.model.ProPlanImp'],
	model: 'erp.view.purchaseOrder.model.ProPlanImp',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchaseorder/purchaseorderdetail.act?method=getProPlanImpList'
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
		property: 'jhbh,jhxh',
		direction: 'ASC'
	}]
});
