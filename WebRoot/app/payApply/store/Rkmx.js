Ext.define('erp.payApply.store.Rkmx', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.Rkmx'],
	model: 'erp.payApply.model.Rkmx',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'payapply/rkmx.act?method=addRkmx',
			update: 'payapply/rkmx.act?method=updateRkmx',
			read: 'payapply/rkmx.act?method=getRkmxList',
			destroy: 'payapply/rkmx.act?method=deleteRkmx'
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
	sorter: [{
		property: '',
		direction: 'ASC'
	}]
});
