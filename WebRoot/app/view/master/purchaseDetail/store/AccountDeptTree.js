Ext.define('erp.view.master.purchaseDetail.store.AccountDeptTree', {
			extend : 'Ext.data.TreeStore',
			requires : ['erp.common.function.model.CurrentTree'],
			model : 'erp.common.function.model.CurrentTree',
			proxy : {
				type : 'ajax',
				actionMethods : {
					'read' : 'post'
				},
				url : 'purchasedetail/purchasecontract.act?method=getAllAccountdeptTree',
				reader : {
					type : 'json',
					rootProperty : 'data',
					messageProperty : 'message'
				},
				extraParams:{
		            czy_gh:erp.Util.currentUser.isAdmin?'000':erp.Util.currentUser.accountMap[0].ref_u_id
		        }
			},
			root : {
				nodeId : 0,
				text : '核算部门',
				leaf : false,
				expanded : true
			}
		})