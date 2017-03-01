Ext.define('erp.logManager.store.JsLog', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.logManager.model.JsLog'],
	model: 'erp.logManager.model.JsLog',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		extraParams:{usePaging:true},
		api: {
//			create: 'common/jslog.do?method=addJsLog',
			update: 'common/jslog.do?method=updateJsLog',
			read: 'common/jslog.do?method=getJsLogList',
			destroy: 'common/jslog.do?method=deleteJsLog'
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
			writeAllFields:true,
			encode: true,
			allowSingle: false
		}
	},
	sorter: [{
		property: 'logid',
		direction: 'ASC'
	}]
});