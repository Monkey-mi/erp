Ext.define('erp.payApply.store.Yfcx', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.Yfcx'],
	model: 'erp.payApply.model.Yfcx',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'payapply/yfcx.act?method=addYfcx',
			update: 'payapply/yfcx.act?method=updateYfcx',
			read: 'payapply/yfcx.act?method=getYfcxList',
			destroy: 'payapply/yfcx.act?method=deleteYfcx'
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
		property: '',
		direction: 'ASC'
	}]
});
