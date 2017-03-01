Ext.define('erp.payApply.store.Fpmx', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.Fpmx'],
	model: 'erp.payApply.model.Fpmx',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'payapply/fpmx.act?method=addFpmx',
			update: 'payapply/fpmx.act?method=updateFpmx',
			read: 'payapply/fpmx.act?method=getFpmxList',
			destroy: 'payapply/fpmx.act?method=deleteFpmx'
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
