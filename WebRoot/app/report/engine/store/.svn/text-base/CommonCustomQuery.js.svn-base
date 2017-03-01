Ext.define('erp.report.engine.store.CommonCustomQuery',{
	extend: 'Ext.data.Store',
	requires:['erp.report.engine.model.CommonCustomQuery'],
	model: 'erp.report.engine.model.CommonCustomQuery',
	proxy: {
        type: 'ajax',
        actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
        extraParams:{
        	usePaging:true,
        	user_type :'people'},
       api: {
			create: 'form/Forms.do?method=addCommonCustomQuery',
			update: 'form/Forms.do?method=updateCommonCustomQuery',
        	read:	'form/FormService.do?method=getCommonCustomQuery',
			destroy:'form/Forms.do?method=deleteCommonCustomQuery'
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
                  property: 'sequence',   
                  direction: 'ASC'  
              }
    ]
});