Ext.define('erp.payApply.store.SupplyInvoice', {
	extend: 'Ext.data.Store',
	requires: ['erp.payApply.model.SupplyInvoice'],
	model: 'erp.payApply.model.SupplyInvoice',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'payapply/supplyinvoice.act?method=getSupplyInvoiceList',
			create: 'payapply/supplyinvoice.act?method=addSupplyInvoice',
			update: 'payapply/supplyinvoice.act?method=updateSupplyInvoice',
			destroy: 'payapply/supplyinvoice.act?method=deleteSupplyInvoice'
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
	   sorters: [{
		property: 'sqbh'+'sqxh',
		direction: 'ASC'
	}]
});