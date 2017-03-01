Ext.define('erp.master.caterialPricePurchase.store.MaterialClass', {
	extend: 'Ext.data.TreeStore',
	reqiures: ['erp.common.function.model.CurrentTree'],
	model: 'erp.common.function.model.CurrentTree',
	pageSize: 200,
	proxy: {
		type: 'ajax',
		actionMethods : {read : 'POST'},
		api: {
			read: 'caterialpricepurchase/caterialpricepurchase.act?method=getCaterialTypeTree'
		},
		 extraParams:{
            type:'caterialclass'
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