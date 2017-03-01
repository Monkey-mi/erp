Ext.define('erp.common.function.store.CurrentTreeR',{
	extend: 'Ext.data.TreeStore', 
	requires:['erp.common.function.model.CurrentTree'],
	model: 'erp.common.function.model.CurrentTree',
    proxy: {
        type: 'ajax',
        actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
        url : 'report/Reports.do?method=getCurrentTree',
        extraParams:{
            type:'report'
        },
        reader: {
			type: 'json',
			rootProperty: 'data',
			messageProperty: 'message'
		},
		extraParams:{
            type:'report'
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
		nodeId:0,
	  	text:'报表分类目录',
	  	leaf:false,
	  	expanded:true,
	  	type:'report'
	}
});