/**
 * 基础数据帮助配置
 */
Ext.define('erp.common.basic.store.CodeConfigs',{
	extend:'Ext.data.Store',
	model:'erp.common.basic.model.CodeConfig',
	proxy:{
		type:'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{
			usePaging: false
		},
		api:{
			create:'main/Codes.do?method=addCodeConfig',
			update:'main/Codes.do?method=updateCodeConfig',
			read:'main/Codes.do?method=getCodeConfigList',
			destroy:'main/Codes.do?method=deleteCodeConfig'
		},
		reader : {
			type : 'json',
			rootProperty : 'data',
			messageProperty : 'message'
		},
		writer : {
			type : 'json',
			rootProperty : 'data', //提交数据可以用{data:[xxx]}的形式包装
			encode : true, //数据经过encode后提交,形式为post_data=XXXXX
			//后台需要用post_data为参数名提取后再解释为JSON
			writeAllFields:true,
			allowSingle : false
		/*即使单行也包装成数组形式，这样后台服务就无需对单行和多行分开解释了*/
		}
	}
});