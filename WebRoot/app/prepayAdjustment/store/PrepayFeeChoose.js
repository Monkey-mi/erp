Ext.define('erp.prepayAdjustment.store.PrepayFeeChoose', {
			extend : 'Ext.data.Store',
			requires : ['erp.prepayAdjustment.model.PrepayFeeChoose'],
			model : 'erp.prepayAdjustment.model.PrepayFeeChoose',
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
					read : 'prepay/prepayadjustment.act?method=getPrepayFeeChooseList'
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
						property : 'fydh',
						direction : 'ASC'
					}]
		});