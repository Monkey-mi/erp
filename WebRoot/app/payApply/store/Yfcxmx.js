Ext.define('erp.payApply.store.Yfcxmx', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.Yfcxmx'],
	model: 'erp.payApply.model.Yfcxmx',
	pageSize: 25,
	groupField: 'yf',
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'payapply/yfcxmx.act?method=addYfcxmx',
			update: 'payapply/yfcxmx.act?method=updateYfcxmx',
			read: 'payapply/yfcxmx.act?method=getYfcxmxList',
			destroy: 'payapply/yfcxmx.act?method=deleteYfcxmx'
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
