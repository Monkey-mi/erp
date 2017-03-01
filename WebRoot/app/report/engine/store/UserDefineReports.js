Ext.define('erp.report.engine.store.UserDefineReports',{
	extend: 'Ext.data.Store',
	requires:['erp.report.engine.model.UserDefineReport'],
	model: 'erp.report.engine.model.UserDefineReport',
	pageSize:10,
	proxy: {
        type: 'ajax',
        actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
       	extraParams : {
					usePaging : true
				},
        api: {
			create: 'main/dailyreport.do?method=addUserReport',
			update: 'main/dailyreport.do?method=updateUserReport',
        	read:	'main/dailyreport.do?method=getUserReportList',
			destroy:'main/dailyreport.do?method=deleteUserReport'
		},
        reader: {
			type: 'json',
			rootProperty: 'data',
			messageProperty: 'message',
			totalProperty:'total'
		},
		writer: {
			type: 'json',
			rootProperty: 'data',    //提交数据可以用{data:[xxx]}的形式包装
			encode: true,    //数据经过encode后提交,形式为post_data=XXXXX
			writeAllFields:true,//后台需要用post_data为参数名提取后再解释为JSON
			allowSingle:false  /*即使单行也包装成数组形式，这样后台服务就无需对单行和多行分开解释了*/
		}
    },
    sorters: [
			  {   
                  property: 'rpt_id',   
                  direction: 'ASC'  
              }
    ]
});