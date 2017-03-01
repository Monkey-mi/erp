Ext.define('erp.master.customer.store.CustomersForHelp',{
	extend:'Ext.data.Store',
	requires:['erp.master.customer.model.Customer'],
	model: 'erp.master.customer.model.Customer',
	proxy: {
        type: 'ajax',
        actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{usePaging:true,history:0},
        api: {
			read:	'supplier/supplierFile.srm?method=getCustomerListForHelp'
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
			allowSingle:false  /*即使单行也包装成数组形式，这样后台服务就无需对单行和多行分开解释了*/
		}
    },
    sorters: [
			  {   
                  property: 'khbh',   
                  direction: 'ASC'  
              }
    ]
	
});