Ext.define('erp.prepayAdjustment.store.PrepayAdjustmentImp', {
	extend : 'Ext.data.Store',
	requires : ['erp.prepayAdjustment.model.PrepayAdjustmentImp'],
	model : 'erp.prepayAdjustment.model.PrepayAdjustmentImp',
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
			read : 'prepay/prepayadjustment.act?method=getPrepayAdjustmentImpList'
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
				property : 'sqbh' + 'sqxh',
				direction : 'ASC'
			}]
});