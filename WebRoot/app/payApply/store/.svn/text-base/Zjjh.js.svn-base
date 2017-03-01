Ext.define('erp.payApply.store.Zjjh', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.Zjjh'],
	model: 'erp.payApply.model.Zjjh',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'payapply/zjjh.act?method=addZjjh',
			update: 'payapply/zjjh.act?method=updateZjjh',
			read: 'payapply/zjjh.act?method=getZjjhList',
			destroy: 'payapply/zjjh.act?method=deleteZjjh'
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
		property: 'jhbh',
		direction: 'ASC'
	}]
});
