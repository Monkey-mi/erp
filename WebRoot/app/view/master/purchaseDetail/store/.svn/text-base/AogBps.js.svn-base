Ext.define('erp.view.master.purchaseDetail.store.AogBps', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.master.purchaseDetail.model.AogBps'],
	model: 'erp.view.master.purchaseDetail.model.AogBps',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchasedetail/purchasedetail.act?method=getAogBpsList'
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		}
	},
	sorter: [{
		property: 'dhdh',
		direction: 'ASC'
	}]
});
