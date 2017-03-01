Ext.define('erp.master.manufacturer.store.BillDetail', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.manufacturer.model.BillDetail'],
	model: 'erp.master.manufacturer.model.BillDetail',
	pageSize: 50,
	groupField: 'yf',
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			
			read: 'manufacturer/billdetial.act?method=getBillDetailList'	
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
	}
	
});
