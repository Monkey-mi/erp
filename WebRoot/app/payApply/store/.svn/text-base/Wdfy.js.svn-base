Ext.define('erp.payApply.store.Wdfy', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.Wdfy'],
	model: 'erp.payApply.model.Wdfy',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'payapply/wdfy.act?method=addWdfy',
			update: 'payapply/wdfy.act?method=updateWdfy',
			read: 'payapply/wdfy.act?method=getWdfyList',
			destroy: 'payapply/wdfy.act?method=deleteWdfy'
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
