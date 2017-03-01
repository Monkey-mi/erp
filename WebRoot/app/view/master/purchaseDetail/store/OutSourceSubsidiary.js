Ext.define('erp.view.master.purchaseDetail.store.OutSourceSubsidiary', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.master.purchaseDetail.model.OutSourceSubsidiary'],
	model: 'erp.view.master.purchaseDetail.model.OutSourceSubsidiary',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'purchasedetail/outsourcesubsidiary.act?method=addOutSourceSubsidiary',
			update: 'purchasedetail/outsourcesubsidiary.act?method=updateOutSourceSubsidiary',
			read: 'purchasedetail/outsourcesubsidiary.act?method=getOutSourceSubsidiaryList',
			destroy: 'purchasedetail/outsourcesubsidiary.act?method=deleteOutSourceSubsidiary'
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
