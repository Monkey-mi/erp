Ext.define('erp.view.master.purchaseDetail.store.MainUnit', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.master.purchaseDetail.model.MainUnit'],
	model: 'erp.view.master.purchaseDetail.model.MainUnit',
	pageSize: 20,
	leadingBufferZone: 100,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{usePaging:true,history:0},
		api: {
			read: 'purchasedetail/purchasecontract.act?method=getMainUnitList'
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
		property: 'ztbh',
		direction: 'ASC'
	}]
});
