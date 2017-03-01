Ext.define('erp.master.purchaseCost.store.BenefitDeptTree', {
	extend: 'Ext.data.TreeStore',
	reqiures: ['erp.common.function.model.CurrentTree'],
	model: 'erp.common.function.model.CurrentTree',
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		url : 'purchasecost/purchasecost.act?method=getAllBenefitDeptTree',
        extraParams:{
            type:'benefitdept'
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
	 			  property: 'bmbh',   
	 			  direction: 'ASC'  
	 		 },{
	 			property: 'bmmc',
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
