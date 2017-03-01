Ext.define('erp.payApply.store.ApplayDepartmentTree', {
			extend : 'Ext.data.TreeStore',
			requires : ['erp.materialQualityTesting.model.CurrentTree'],
			model : 'erp.materialQualityTesting.model.CurrentTree',
			proxy : {
				type : 'ajax',
				actionMethods : {
					'read' : 'post'
				},
				url : 'payapply/applayDepartment.act?method=getApplayDepartmentTree',
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
				text : '申请部门',
				leaf : false,
				expanded : true
			}
		});