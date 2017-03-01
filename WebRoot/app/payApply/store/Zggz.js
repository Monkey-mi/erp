Ext.define('erp.payApply.store.Zggz', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.Zggz'],
	model: 'erp.payApply.model.Zggz',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'payapply/zggz.act?method=addZggz',
			update: 'payapply/zggz.act?method=updateZggz',
			read: 'payapply/zggz.act?method=getZggzList',
			destroy: 'payapply/zggz.act?method=deleteZggz'
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
