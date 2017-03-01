Ext.define('erp.prepayAdjustment.store.PrepayAgreementChoose', {
	extend : 'Ext.data.Store',
	requires : ['erp.prepayAdjustment.model.PrepayAgreementChoose'],
	model : 'erp.prepayAdjustment.model.PrepayAgreementChoose',
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
			read : 'prepay/prepayadjustment.act?method=getPrepayAgreementChooseList'
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