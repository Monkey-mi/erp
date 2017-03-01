Ext.define('erp.payApply.store.PayApply', {
	extend: 'Ext.data.Store',
	requires: ['erp.payApply.model.PayApply'],
	model: 'erp.payApply.model.PayApply',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'payapply/payapply.act?method=addPayApply',
			read: 'payapply/payapply.act?method=getPayApplyList',
			update: 'payapply/payapply.act?method=updatePayApply',
			destroy: 'payapply/payapply.act?method=deletePayApply'
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
