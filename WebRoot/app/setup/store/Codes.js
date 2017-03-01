Ext.define('erp.setup.store.Codes',{
	extend: 'Ext.data.Store',
	requires:['erp.setup.model.Code'],
	model: 'erp.setup.model.Code',
	pageSize: 30,
    proxy: {
        type: 'ajax',
        actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
        api: {
			create: 'main/Codes.do?method=addCode',
			update: 'main/Codes.do?method=updateCode',
			read:	'main/Codes.do?method=getCodeList',
			destroy:'main/Codes.do?method=deleteCode'
		},
        reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty:'total',
			messageProperty: 'message'
		},
		writer: {
			type: 'json',
			rootProperty: 'data',    //提交数据可以用{data:[xxx]}的形式包装
			encode: true,    //数据经过encode后提交,形式为post_data=XXXXX
			writeAllFields:true,                 //后台需要用post_data为参数名提取后再解释为JSON
			allowSingle:false  /*即使单行也包装成数组形式，这样后台服务就无需对单行和多行分开解释了*/
		}
    },
    sorters:[{
		        property: 'type_code',   
		        direction: 'ASC'  
			},
			{
		        property: 'order_seq',   
		        direction: 'ASC'  
			},
			{
		        property: 'code',   
		        direction: 'ASC'  
			}
	]
});