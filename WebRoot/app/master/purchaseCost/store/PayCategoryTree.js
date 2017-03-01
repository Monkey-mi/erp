Ext.define('erp.master.purchaseCost.store.PayCategoryTree', {
	extend: 'Ext.data.TreeStore',
	reqiures: ['erp.common.function.model.CurrentTree'],
	model: 'erp.common.function.model.CurrentTree',
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		url : 'purchasecost/purchasecost.act?method=getAllPayCategoryTree',
        extraParams:{
            type:'paycategory'
        },
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
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
 	  	text:'全部',
 	  	leaf:false,
 	  	expanded:true
 	}
});
