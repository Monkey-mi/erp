Ext.define('erp.prepayAdjustment.store.FeeChoose', {
			extend : 'Ext.data.Store',
			requires : ['erp.prepayAdjustment.model.FeeChoose'],
			model : 'erp.prepayAdjustment.model.FeeChoose',
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
					read : 'prepay/prepayadjustment.act?method=getFeeChooseList'
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