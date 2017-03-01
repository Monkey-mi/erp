Ext.define('erp.view.master.purchaseDetail.store.OutSourceDetail', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.master.purchaseDetail.model.OutSourceDetail'],
	model: 'erp.view.master.purchaseDetail.model.OutSourceDetail',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'purchasedetail/outSourceDetail.act?method=addOutSourceDetail',
			update: 'purchasedetail/outSourceDetail.act?method=updateOutSourceDetail',
			read: 'purchasedetail/outSourceDetail.act?method=getOutSourceDetailList',
			destroy: 'purchasedetail/outSourceDetail.act?method=deleteOutSourceDetail'
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
		property: 'wxxh',
		direction: 'ASC'
	}]
});
