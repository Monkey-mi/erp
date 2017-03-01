Ext.define('erp.payApply.store.SubmitObject', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.SubmitObject'],
	model: 'erp.payApply.model.SubmitObject',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'payapply/submitobject.act?method=addSubmitObject',
			update: 'payapply/submitobject.act?method=updateSubmitObject',
			read: 'payapply/submitobject.act?method=getSubmitObjectList',
			destroy: 'payapply/submitobject.act?method=deleteSubmitObject'
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
		property: 'czy_gh',
		direction: 'ASC'
	}]
});
