Ext.define('erp.materialInspection.store.WareHouse',{
	extend: 'Ext.data.TreeStore', 
	requires:['erp.materialInspection.model.WareHouse'],
	model: 'erp.materialInspection.model.WareHouse',
    proxy: {
        type: 'ajax',
        actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
        url : 'erp/materialInspection.act?method=getWareHouseTreeList',
        extraParams:{
            type:'warehouse',
            czy_gh:erp.Util.currentUser.isAdmin?'000':erp.Util.currentUser.accountMap[0].ref_u_id
        },
        reader: {
			type: 'json',
			rootProperty: 'data',
			messageProperty: 'message'
		}
    },
    sorters: [
		 {   
			  property: 'ckbh',   
			  direction: 'ASC'  
		 },{
			property: 'ckmc',
			direction: 'ASC'
		}
	],
	root: {
		nodeId:0,
	  	text:'仓库类别',
	  	leaf:false,
	  	expanded:true
	}
});