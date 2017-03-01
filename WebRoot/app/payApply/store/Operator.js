Ext.define('erp.payApply.store.Operator', {
	extend: 'Ext.data.Store',
	requires: ['erp.payApply.model.SubmitObject'],
	model: 'erp.payApply.model.SubmitObject',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'payapply/submitobject.act?method=getOperatorList'
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
		property: 'czy_gh',
		direction: 'ASC'
	}]
});
