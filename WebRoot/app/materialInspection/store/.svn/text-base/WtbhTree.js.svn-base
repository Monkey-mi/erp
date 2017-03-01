Ext.define('erp.materialInspection.store.WtbhTree', {
			extend: 'Ext.data.TreeStore', 
			requires:['erp.common.function.model.CurrentTree'],
	        model: 'erp.common.function.model.CurrentTree',
			proxy : {
				type : 'ajax',
				actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
				url : 'erp/materialInspection.act?method=getWtbhTreeList',
				reader : {
					type : 'json',
					rootProperty : 'data',
					totalProperty: 'total',
					messageProperty : 'message'
				},
				extraParams:{
					type : 'category',
		            czy_gh:erp.Util.currentUser.isAdmin?'000':erp.Util.currentUser.accountMap[0].ref_u_id
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
			root : {
				nodeId : 0,
				/*id:0,*/
				text : '全部',
				leaf : false,
				expanded : true
			}
		});