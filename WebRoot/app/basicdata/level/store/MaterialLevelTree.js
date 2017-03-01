Ext.define('erp.basicdata.level.store.MaterialLevelTree',{
	extend: 'Ext.data.TreeStore', 
	requires:['erp.basic.model.TreeModel'],
	model: 'erp.basic.model.TreeModel',
    proxy: {
        type: 'ajax',
        actionMethods:{create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
        url : 'materialLevel/materialLevel.srm?method=getMaterialLevelTree',
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
	  	text:'分层等级',
	  	leaf:false,
	  	expanded:true
	}
});