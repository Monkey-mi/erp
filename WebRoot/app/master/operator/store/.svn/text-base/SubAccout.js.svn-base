Ext.define('erp.master.operator.store.SubAccout', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.operator.model.SubAccout'],
	model: 'erp.master.operator.model.SubAccout',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		extraParams:{company_id:erp.Const.companyId},
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'supplierAccess/common.srm?method=getPfSubAccout'
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		}
	},
	sorters: [{
		property: 'czy_gh',
		direction: 'ASC'
	}]
});
