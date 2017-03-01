Ext.define('erp.payApply.store.Cgfy', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.Cgfy'],
	model: 'erp.payApply.model.Cgfy',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'payapply/cgfy.act?method=addCgfy',
			update: 'payapply/cgfy.act?method=updateCgfy',
			read: 'payapply/cgfy.act?method=getCgfyList',
			destroy: 'payapply/cgfy.act?method=deleteCgfy'
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
