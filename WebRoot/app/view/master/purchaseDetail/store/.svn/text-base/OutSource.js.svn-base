Ext.define('erp.view.master.purchaseDetail.store.OutSource', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.master.purchaseDetail.model.OutSource'],
	model: 'erp.view.master.purchaseDetail.model.OutSource',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'purchasedetail/outsource.act?method=addOutSource',
			update: 'purchasedetail/outsource.act?method=updateOutSource',
			read: 'purchasedetail/outsource.act?method=getOutSourceList',
			destroy: 'purchasedetail/outsource.act?method=deleteOutSource'
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
		property: 'wxdh',
		direction: 'ASC'
	}]
});
