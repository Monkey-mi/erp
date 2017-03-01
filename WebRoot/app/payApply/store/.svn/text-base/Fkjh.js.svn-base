Ext.define('erp.payApply.store.Fkjh', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.Fkjh'],
	model: 'erp.payApply.model.Fkjh',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'payapply/fkjh.act?method=addFkjh',
			update: 'payapply/fkjh.act?method=updateFkjh',
			read: 'payapply/fkjh.act?method=getFkjhList',
			destroy: 'payapply/fkjh.act?method=deleteFkjh'
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
