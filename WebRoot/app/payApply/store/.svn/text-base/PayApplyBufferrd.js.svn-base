Ext.define('erp.payApply.store.PayApplyBufferrd', {
	extend: 'Ext.data.BufferedStore',
	requires: ['erp.payApply.model.PayApply'],
	model: 'erp.payApply.model.PayApply',
	pageSize: 50,
	leadingBufferZone: 100,
	proxy: {
		timeout:900000,
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {			
			read: 'payapply/payapply.act?method=getPayApplyList'
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
	   remoteFilter:true,
	   sorters: [{
		property: 'sqbh',
		direction: 'DESC'
	}]
});
