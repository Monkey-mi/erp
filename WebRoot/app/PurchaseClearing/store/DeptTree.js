Ext.define('erp.PurchaseClearing.store.DeptTree', {
	extend: 'Ext.data.TreeStore',
	reqiures: ['erp.common.function.model.CurrentTree'],
	model: 'erp.common.function.model.CurrentTree',
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		url : 'perchase/perchase.act?method=getYsyfAccountdeptTree',
        extraParams:{
            type:'accountdept',
            ysyfbj:1
        },
		reader: {
			type: 'json',
			rootProperty: 'data',
			messageProperty: 'message'
		}
	},
 	root: {
 		nodeId:0,
 	  	text:'全部',
 	  	leaf:false,
 	  	expanded:true
 	}
});
