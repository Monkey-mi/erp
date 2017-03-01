Ext.define('erp.setup.store.ModuleTrees',{
	extend: 'Ext.data.TreeStore', 
	requires:['erp.setup.model.ModuleTree'],
	model: 'erp.setup.model.ModuleTree',
    proxy: {
        type: 'ajax',
        actionMethods:{'read':'post'},
        url : 'main/Modules.do?method=getModuleWithParent',
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
			property: 'order_seq',
			direction: 'ASC'
		},{
			property: 'text',
			direction: 'ASC'
		}
	],
	root: {
	  	id:0,
	  	text:'菜单清单',
	  	leaf:false,
	  	expanded:true
	}
});