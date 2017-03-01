Ext.define('erp.report.engine.store.SysPrintModel', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.report.engine.model.SysPrintModel'],
	model: 'erp.report.engine.model.SysPrintModel',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'report/SysReports.do?method=addSysPrintModel',
			update: 'report/SysReports.do?method=updateSysPrintModel',
			read: 'report/SysReports.do?method=getSysPrintModelList',
			destroy: 'report/SysReports.do?method=deleteSysPrintModel'
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
	sorter: [{
		property: 'mod_id',
		direction: 'ASC'
	}]
});
