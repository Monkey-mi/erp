Ext.define('erp.common.form.store.FrmRenders',{
	extend: 'Ext.data.Store',
	requires:['erp.common.form.model.FrmRender'],
	model: 'erp.common.form.model.FrmRender',
	proxy: {
        type: 'ajax',
        actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
        extraParams:{model:'FrmRender'},
        api: {
			create: 'form/Forms.do?method=addFrmRender',
			update: 'form/Forms.do?method=updateFrmRender',
        	read:	'form/Forms.do?method=getFrmRenderList',
			destroy:'form/Forms.do?method=deleteFrmRender'
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
			                 //后台需要用post_data为参数名提取后再解释为JSON
			allowSingle:false  /*即使单行也包装成数组形式，这样后台服务就无需对单行和多行分开解释了*/
		}
    },
    sorters: [
			  {   
                  property: 'code',   
                  direction: 'ASC'  
              },
              {   
                  property: 'name',   
                  direction: 'ASC'  
              }
    ]
});