Ext.define('erp.master.purchaseCost.store.BenefitDept', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.purchaseCost.model.BenefitDept'],
	model: 'erp.master.purchaseCost.model.BenefitDept',
	pageSize: 25,
	proxy: {
		type: 'ajax',
				actionMethods : {read : 'POST'},
		api: {
			read: 'purchasecost/purchasecost.act?method=getBenefitDeptList'
		},
	reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		},
		writer: {
			type: 'json',
			rootProperty: 'data',
			encode: true,
			writeAllFields:true,
			allowSingle: false
		}
	},
	sorter: [{
		property: 'bmbh',
		direction: 'ASC'
	}]
});
