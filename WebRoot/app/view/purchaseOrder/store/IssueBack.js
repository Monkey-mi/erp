Ext.define('erp.view.purchaseOrder.store.IssueBack', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseOrder.model.IssueBack'],
	model: 'erp.view.purchaseOrder.model.IssueBack',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchaseorder/purchaseorder.act?method=getIssueBackList'
		},
		//extraParams:{usePaging:true},
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
		property: 'clhh',
		direction: 'ASC'
	}]
});
