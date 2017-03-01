Ext.define('erp.materialTestEvaluation.store.EntrustedInspectionCategory',{
	extend: 'Ext.data.TreeStore', 
	requires:['erp.common.function.model.CurrentTree'],
	model: 'erp.common.function.model.CurrentTree',
    proxy: {
        type : 'ajax',
		actionMethods : {
			'read' : 'post'
		},
        url : 'materialTestEvaluation/MaterialTestEvaluation.act?method=getInspectionCategoryList',
        /*extraParams:{
            type:'InspectionCategory',
            czy_gh:erp.Util.currentUser.isAdmin?'000':erp.Util.currentUser.accountMap[0].ref_u_id
        },*/
        reader: {
			type: 'json',
			rootProperty: 'data',
			messageProperty: 'message'
		}
    },
    sorters : [{
						property : 'lbbh',
						direction : 'ASC'
					}, {
						property : 'lbmc',
						direction : 'ASC'
					}],
	root: {
		nodeId:0,
	  	text:'全部',
	  	leaf:false,
	  	expanded:true
	}
});