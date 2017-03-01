Ext.define('erp.payApply.store.ZtdwPayApply', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.ZtdwPayApply'],
	model: 'erp.payApply.model.ZtdwPayApply',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {					
			read: 'payapply/payapply.act?method=getZtdwList'			
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
		property: 'wbbh',
		direction: 'ASC'
	}]
});
