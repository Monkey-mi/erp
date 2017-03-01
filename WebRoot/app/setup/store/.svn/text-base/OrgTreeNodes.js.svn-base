Ext.define('erp.setup.store.OrgTreeNodes',{
	extend: 'Ext.data.TreeStore', 
	requires:['erp.setup.model.OrgTreeNode'],
	model: 'erp.setup.model.OrgTreeNode',
	clearOnload:true,
    proxy: {
        type: 'ajax',
        actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
        url : 'main/Orgs.do?method=getOrgTreeNodeWithParent',
        reader: {
			type: 'json',
			rootProperty: 'data',
			messageProperty: 'message'
		}
    },
    sorters: [   
              {   
                  property: 'order_seq',   
                  direction: 'ASC'  
              }
    ]
        
});