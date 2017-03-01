Ext.define('erp.master.production.store.ProductionTypeTree',{
	extend: 'Ext.data.TreeStore', 
	requires:['erp.common.function.model.CurrentTree'],
	model: 'erp.common.function.model.CurrentTree',
    proxy: {
        type: 'ajax',
        actionMethods:'post',
        url : 'purchasedetail/purchasedetail.act?method=getProductionTypeTreeList',
        reader: {
			type: 'json',
			rootProperty: 'data',
			messageProperty: 'message'
		}
    },
    sorters: [
		 {   
			  property: 'lbbh',   
			  direction: 'ASC'  
		 },{
			property: 'lbmc',
			direction: 'ASC'
		}
	],
	root: {
		nodeId:0,
	  	text:'产品类别',
	  	leaf:false,
	  	expanded:true
	}
});