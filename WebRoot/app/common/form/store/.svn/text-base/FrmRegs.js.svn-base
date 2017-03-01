Ext.define('erp.common.form.store.FrmRegs',{
	extend: 'Ext.data.Store',
	requires:['erp.common.form.model.FrmReg'],
	model: 'erp.common.form.model.FrmReg',
	pageSize:35,
	proxy: {
        type: 'ajax',
        actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
        extraParams:{usePaging:true},
        api: {
			create: 'form/Forms.do?method=addFrmReg',
			update: 'form/Forms.do?method=updateFrmReg',
        	read:	'form/Forms.do?method=getFrmRegList',
			destroy:'form/Forms.do?method=deleteFrmReg'
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
			    property: 'freg_id',   
			    direction: 'ASC'  
			},
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