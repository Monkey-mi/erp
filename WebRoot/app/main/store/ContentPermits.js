Ext.define('erp.main.store.ContentPermits',{
	extend: 'Ext.data.Store',
	requires:['erp.main.model.ContentPermit'],
	model: 'erp.main.model.ContentPermit',
	proxy: {
        type: 'ajax',
        actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
       	api: {
			create 	: 'main/Content.do?method=addCP',
			update	: 'main/Content.do?method=updateCP',
        	read 	: 'main/Content.do?method=getCPList',
			destroy	: 'main/Content.do?method=deleteCPById'
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
    }
});