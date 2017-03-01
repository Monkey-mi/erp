Ext.define('erp.view.master.purchaseDetail.store.MaterialCateTree',{
	extend: 'Ext.data.TreeStore', 
	requires:['erp.common.function.model.CurrentTree'],
	model: 'erp.common.function.model.CurrentTree',
    proxy: {
        type: 'ajax',
        actionMethods : {'read' : 'post'},
        url : 'purchasedetail/purchasedetail.act?method=getMaterialCateTreeList',
        extraParams:{
            type:'salesarea'
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