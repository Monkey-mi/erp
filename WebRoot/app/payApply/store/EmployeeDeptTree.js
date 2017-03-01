Ext.define('erp.payApply.store.EmployeeDeptTree', {
	extend: 'Ext.data.TreeStore',
	reqiures: ['erp.common.function.model.CurrentTree'],
	model: 'erp.common.function.model.CurrentTree',
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		url : 'payapply/payapply.act?method=getAllEmployeeDept',
        extraParams:{
            type:'accountdept'
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
