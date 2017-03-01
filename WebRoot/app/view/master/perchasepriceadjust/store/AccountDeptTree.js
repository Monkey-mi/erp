Ext.define('erp.view.master.perchasepriceadjust.store.AccountDeptTree', {
	extend: 'Ext.data.TreeStore',
	reqiures: ['erp.common.function.model.CurrentTree'],
	model: 'erp.common.function.model.CurrentTree',
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		url : 'perchase/perchase.act?method=getAllAccountdeptTree',
        extraParams:{
            type:'accountdept',czy_gh:erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id
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
