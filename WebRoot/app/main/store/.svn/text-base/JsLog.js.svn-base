Ext.define('erp.main.store.JsLog', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.main.model.JsLog'],
	model: 'erp.main.model.JsLog',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: 'post',
		api: {
			create: 'erp/common/model/JsLog.do?method=erp/common/model/JsLog.do?method=addJsLog',
			update: 'erp/common/model/JsLog.do?method=erp/common/model/JsLog.do?method=updateJsLog',
			read: 'erp/common/model/JsLog.do?method=erp/common/model/JsLog.do?method=getJsLogList',
			destroy: 'erp/common/model/JsLog.do?method=erp/common/model/JsLog.do?method=deleteJsLog'
		},
		reader: {
			type: 'json',
			root: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		},
		writer: {
			type: 'json',
			root: 'data',
			encode: true,
			allowSingle: false
		}
	},
	sorter: [{
		property: 'logid',
		direction: 'ASC'
	}]
});
