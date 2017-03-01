Ext.define('erp.setup.store.HttpServices',{
	extend: 'Ext.data.Store',
	requires:['erp.setup.model.HttpService'],
	model: 'erp.setup.model.HttpService',
	proxy: {
        type: 'ajax',
        actionMethods:{'read':'post'},
        extraParams:{model:'HttpService'},
        api: {
			create: 'main/Modules.do?method=addHttpService',
			update: 'main/Modules.do?method=updateHttpService',
			read:	'main/Modules.do?method=getHttpServiceList',
			destroy:'main/Modules.do?method=deleteHttpService'
		},
        reader: {
			type: 'json',
			rootProperty: 'data',
			messageProperty: 'message'
		},
		writer: {
			type: 'json',
			rootProperty: 'data',    //提交数据可以用{data:[xxx]}的形式包装
			encode: true,    //数据经过encode后提交,形式为post_data=XXXXX
			writeAllFields:true,                //后台需要用post_data为参数名提取后再解释为JSON
			allowSingle:false  /*即使单行也包装成数组形式，这样后台服务就无需对单行和多行分开解释了*/
		}
    },
    sorters: [ 
				{   
				    property: 's_name',   
				    direction: 'ASC'  
				},
              {   
                  property: 's_path',   
                  direction: 'ASC'  
              }
    ]
});