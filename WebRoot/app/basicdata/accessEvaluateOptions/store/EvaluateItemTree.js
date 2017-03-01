/*准入评估13项树结构store*/
Ext.define('erp.basicdata.accessEvaluateOptions.store.EvaluteItemTree',{
	extend:'Ext.data.TreeStore',
	requires:['erp.basic.model.TreeModel'],
	model:'erp.basic.model.TreeModel',
	proxy: {
        type: 'ajax',
        actionMethods:{create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
        url : 'supplierAccess/AccessBasetable.srm?method=getEvaluateItemTree',
        reader: {
			type: 'json',
			rootProperty: 'data',
			messageProperty: 'message'
		}
    },
    sorters: [
		{   
			  property: 'parentId',   
			  direction: 'ASC'  
		 },
        {
			property: 'nodeId',
			direction: 'ASC'
		}
	],
	root: {
	  	id:0,
	  	text:'评估项',
	  	leaf:false,
	  	expanded:true
	}
});