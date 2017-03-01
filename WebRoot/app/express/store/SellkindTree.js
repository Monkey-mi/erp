Ext.define('erp.express.store.SellkindTree',{
	extend: 'Ext.data.TreeStore', 
	requires:['erp.common.function.model.CurrentTree'],
	model: 'erp.common.function.model.CurrentTree',
    proxy: {
        type: 'ajax',
        actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
        url : 'essell/sellkind.crm?method=getSellkindTreeList',
        extraParams:{
            type:'sellkind',
            czy_gh:erp.Util.currentUser.isAdmin?'000':erp.Util.currentUser.accountMap[0].ref_u_id
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
	  	text:'销售类别',
	  	leaf:false,
	  	expanded:true
	}
});