Ext.define('erp.master.group.store.Group',{
    extend : 'Ext.data.Store',
    requires : ['erp.master.group.model.Group'],
    model : 'erp.master.group.model.Group',
    pageSize : 25,
    proxy: {
        type: 'ajax',
        actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
       extraParams:{usePaging:true,history:0},
       api: {
       	     create : 'group/group.act?method=addGroup',
       	     update : 'group/group.act?method=updateGroup',
             read : 'group/group.act?method=getGroupList',
             destroy : 'group/group.act?method=deleteGroup'
       },
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
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