Ext.define('erp.view.master.caterialPriceApproval.store.CaterialPriceDetail', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.master.caterialPriceApproval.model.CaterialPriceDetail'],
	model: 'erp.view.master.caterialPriceApproval.model.CaterialPriceDetail',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'caterialpriceapproval/caterialpricedetail.act?method=addCaterialPriceDetail',
			update: 'caterialpriceapproval/caterialpricedetail.act?method=updateCaterialPriceDetail',
			read: 'caterialpriceapproval/caterialpricedetail.act?method=getCaterialPriceDetailList',
			destroy: 'caterialpriceapproval/caterialpricedetail.act?method=deleteCaterialPriceDetail'
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
		property: 'jlbh,jlxh',
		direction: 'ASC'
	}]
});
