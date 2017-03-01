Ext.define('erp.master.group.store.GroupOperator',{
    extend : 'Ext.data.Store',
    reqiures : ['erp.master.group.model.GroupOperator'],
    model : 'erp.master.group.model.GroupOperator',
    pageSize : 25,
    proxy: {
        type: 'ajax',
        actionMethods : {create : 'POST',read : 'POST',destroy : 'POST'},
      
       api: {
       	     create : 'group/groupoperator.act?method=addGroupOperator',
             read : 'group/groupoperator.act?method=getGroupOperatorList',
             destroy :'group/groupoperator.act?method=deleteGroupOperator'
       },
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message',
			idProperty: 'czy_gh'
		},
		writer: {
			type: 'json',
			rootProperty: 'data',
			encode: true,
			writeAllFields:true,
			allowSingle: false
		}
       }, sorters: [
			  {   
                  property: 'cgzh',   
                  direction: 'ASC'  
              }
    ]
})