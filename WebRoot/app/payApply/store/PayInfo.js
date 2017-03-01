Ext.define('erp.payApply.store.PayInfo', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.PayInfo'],
	model: 'erp.payApply.model.PayInfo',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'payapply/payinfo.act?method=addPayInfo',
			update: 'payapply/payinfo.act?method=updatePayInfo',
			read: 'payapply/payinfo.act?method=getPayInfoList',
			destroy: 'payapply/payinfo.act?method=deletePayInfo'
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
		property: 'zfpzh'+'zdxh',
		direction: 'ASC'
	}]
});
