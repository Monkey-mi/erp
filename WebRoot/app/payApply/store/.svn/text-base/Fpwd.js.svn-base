Ext.define('erp.payApply.store.Fpwd', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.Fpwd'],
	model: 'erp.payApply.model.Fpwd',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'payapply/fpwd.act?method=addFpwd',
			update: 'payapply/fpwd.act?method=updateFpwd',
			read: 'payapply/fpwd.act?method=getFpwdList',
			destroy: 'payapply/fpwd.act?method=deleteFpwd'
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
