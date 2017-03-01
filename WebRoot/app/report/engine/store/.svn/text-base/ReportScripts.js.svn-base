Ext.define('erp.report.engine.store.ReportScripts', {
			extend : 'Ext.data.Store',
			model : 'erp.report.engine.model.ReportScript',
			requires : ['erp.report.engine.model.ReportScript'],
			proxy : {
				type : 'ajax',
				actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
				extraParams : {
					usePaging : true
				},
				api : {
						create: 'form/Forms.do?method=addReportScript',
						update: 'form/Forms.do?method=updateReportScript',
					    read:	'form/Forms.do?method=getReportScript',
						destroy:'form/Forms.do?method=deleteReportScript'
				},
				reader : {
					type : 'json',
					rootProperty : 'data',
					messageProperty : 'message'
				},
				writer : {
					type : 'json',
					rootProperty : 'data',
					encode : true,
					writeAllFields:true,
					allowSingle : false
				}
			},
			sorter : [{
						property : 'sp_id',
						direction : 'ASC'
					}]
		});