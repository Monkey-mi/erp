Ext.define('erp.prepayAdjustment.store.InvoiceChoose', {
			extend : 'Ext.data.Store',
			requires : ['erp.prepayAdjustment.model.InvoiceChoose'],
			model : 'erp.prepayAdjustment.model.InvoiceChoose',
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
					read : 'prepay/prepayadjustment.act?method=getInvoiceChooseList'
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
						property : 'fplb' + 'fphm',
						direction : 'ASC'
					}]
		});