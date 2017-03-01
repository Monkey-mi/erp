Ext.define('erp.materialQualityTesting.store.CllbTree', {
			extend : 'Ext.data.TreeStore',
			requires : ['erp.materialQualityTesting.model.CurrentTree'],
			model : 'erp.materialQualityTesting.model.CurrentTree',
			proxy : {
				type : 'ajax',
				actionMethods : {
					'read' : 'post'
				},
				url : 'materialQuality/cllb.act?method=getCllbTreeList',
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
				text : '材料类别',
				leaf : false,
				expanded : true
			}
		});