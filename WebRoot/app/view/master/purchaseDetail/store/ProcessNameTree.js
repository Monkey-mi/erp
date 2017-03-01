Ext.define('erp.view.master.purchaseDetail.store.ProcessNameTree',{
	extend: 'Ext.data.TreeStore', 
	requires:['erp.common.function.model.CurrentTree'],
	model: 'erp.common.function.model.CurrentTree',
    proxy: {
        type: 'ajax',
        actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
        url : 'purchasedetail/outsource.act?method=getProcessNameTree',
        reader: {
			type: 'json',
			rootProperty: 'data',
			messageProperty: 'message'
		}
    },
    sorters: [
		 {   
			  property: 'gxbh',   
			  direction: 'ASC'  
		 },{
			property: 'gxmc',
			direction: 'ASC'
		}
	],
	root: {
		nodeId:0,
	  	text:'全部',
	  	leaf:false,
	  	expanded:true
	}
});