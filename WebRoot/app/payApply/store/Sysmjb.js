Ext.define('erp.payApply.store.Sysmjb', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.Sysmjb'],
	model: 'erp.payApply.model.Sysmjb',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {			
			read: 'payapply/sysmjb.act?method=getsysmjbList'
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
		property: 'mjxl',
		direction: 'ASC'
	}]
});
