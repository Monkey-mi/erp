Ext.define('erp.view.master.category.store.CategoryTree', {
			extend : 'Ext.data.TreeStore',
			requires : ['erp.common.function.model.CurrentTree'],
			model : 'erp.common.function.model.CurrentTree',
			proxy : {
				type : 'ajax',
				actionMethods : {
					'read' : 'post'
				},
				url : 'category/category.act?method=getCategoryTreeList',
				reader : {
					type : 'json',
					rootProperty : 'data',
					messageProperty : 'message'
				},
				extraParams:{
		            czy_gh:erp.Util.currentUser.isAdmin?'000':erp.Util.currentUser.accountMap[0].ref_u_id
		        }
			},
			sorters : [{
						property : 'lbbh',
						direction : 'ASC'
					}, {
						property : 'lbmc',
						direction : 'ASC'
					}],
			root : {
				nodeId : 0,
				id:0,
				text : '采购类别',
				leaf : false,
				expanded : true
			}
		})