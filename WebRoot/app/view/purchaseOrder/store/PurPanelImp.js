Ext.define('erp.view.purchaseOrder.store.PurPanelImp', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseOrder.model.PurPanelImp'],
	model: 'erp.view.purchaseOrder.model.PurPanelImp',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{usePaging:true},
		api: {
			read: 'purchaseorder/purchaseorder.act?method=getPurPanelImpList'
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		}
	},
	sorter: [{
		property: 'cgbh',
		direction: 'ASC'
	}]
});
