Ext.define('erp.payApply.store.Skdw', {
	extend: 'Ext.data.Store',
	requires: ['erp.payApply.model.Skdw'],
	model: 'erp.payApply.model.Skdw',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'payapply/payapply.act?method=getSkdwLists'			
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
	   sorters: [{
		property: 'csbh',
		direction: 'ASC'
	}]
});