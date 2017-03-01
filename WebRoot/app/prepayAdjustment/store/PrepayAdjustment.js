Ext.define('erp.prepayAdjustment.store.PrepayAdjustment', {
	extend : 'Ext.data.Store',
	requires : ['erp.prepayAdjustment.model.PrepayAdjustment'],
	model : 'erp.prepayAdjustment.model.PrepayAdjustment',
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
			create : 'prepay/prepayadjustment.act?method=addPrepayAdjustment',
			update : 'prepay/prepayadjustment.act?method=updatePrepayAdjustment',
			read : 'prepay/prepayadjustment.act?method=getPrepayAdjustmentList',
			destroy : 'prepay/prepayadjustment.act?method=deletePrepayAdjustment'
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
				property : 'tzxh' + 'tzdh',
				direction : 'ASC'
			}]
});