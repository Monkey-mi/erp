Ext.define('erp.prepayAdjustment.store.AgreementChoose', {
			extend : 'Ext.data.Store',
			requires : ['erp.prepayAdjustment.model.AgreementChoose'],
			model : 'erp.prepayAdjustment.model.AgreementChoose',
			pageSize : 50,
			proxy : {
				type : 'ajax',
				actionMethods : {
					create : 'POST',
					read : 'POST',
					update : 'POST',
					destroy : 'POST'
				},
				api : {
					read : 'prepay/prepayadjustment.act?method=getAgreementChooseList'
				},
				reader : {
					type : 'json',
					rootProperty : 'data',
					totalProperty : 'total',
					messageProperty : 'message'
				},
				writer : {
					type : 'json',
					rootProperty : 'data',
					encode : true,
					writeAllFields : true,
					allowSingle : false
				}
			},
			sorters : [{
						property : 'htbh',
						direction : 'ASC'
					}]
		});