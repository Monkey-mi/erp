Ext.define('erp.basicdata.materialClass.store.MaterialClassTree',{
	extend: 'Ext.data.TreeStore', 
	requires:['erp.basic.model.TreeModel'],
	model: 'erp.basic.model.TreeModel',
    proxy: {
        type: 'ajax',
        actionMethods:{create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
        url : 'materialClass/materialClass.srm?method=getMaterialClassTree',
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
	  	text:'材料类别',
	  	leaf:false,
	  	expanded:true
	}
});