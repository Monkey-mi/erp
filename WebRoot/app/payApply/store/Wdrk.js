Ext.define('erp.payApply.store.Wdrk', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.Wdrk'],
	model: 'erp.payApply.model.Wdrk',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'payapply/wdrk.act?method=addWdrk',
			update: 'payapply/wdrk.act?method=updateWdrk',
			read: 'payapply/wdrk.act?method=getWdrkList',
			destroy: 'payapply/wdrk.act?method=deleteWdrk'
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
