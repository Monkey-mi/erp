Ext.define('erp.payApply.store.Htmx', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.Htmx'],
	model: 'erp.payApply.model.Htmx',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'payapply/htmx.act?method=addHtmx',
			update: 'payapply/htmx.act?method=updateHtmx',
			read: 'payapply/htmx.act?method=getHtmxList',
			destroy: 'payapply/htmx.act?method=deleteHtmx'
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
