Ext.define('erp.view.master.caterialPriceApproval.store.CaterialPriceApproval', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.master.caterialPriceApproval.model.CaterialPriceApproval'],
	model: 'erp.view.master.caterialPriceApproval.model.CaterialPriceApproval',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{usePaging:true,history:0},
		api: {
			create: 'caterialpriceapproval/caterialpriceapproval.act?method=addCaterialPriceApproval',
			update: 'caterialpriceapproval/caterialpriceapproval.act?method=updateCaterialPriceApproval',
			read: 'caterialpriceapproval/caterialpriceapproval.act?method=getCaterialPriceApprovalList',
			destroy: 'caterialpriceapproval/caterialpriceapproval.act?method=deleteCaterialPriceApproval'
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
			allowSingle: false,
			writeAllFields:true
		}
	},
	sorter: [{
		property: 'jlbh',
		direction: 'ASC'
	}]
});
