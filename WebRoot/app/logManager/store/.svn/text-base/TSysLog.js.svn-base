Ext.define('erp.logManager.store.TSysLog', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.logManager.model.TSysLog'],
	model: 'erp.logManager.model.TSysLog',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		extraParams:{usePaging:true},
		api: {
//			create: 'main/ModuleService.do?method=addLogSyslog',
			update: 'main/Modules.do?method=updateTSysLog',
			read: 'main/Modules.do?method=getLogList',
			destroy: 'main/Modules.do?method=deleteLog'
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