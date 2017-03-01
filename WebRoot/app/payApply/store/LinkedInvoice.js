Ext.define('erp.payApply.store.LinkedInvoice', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.LinkedInvoice'],
	model: 'erp.payApply.model.LinkedInvoice',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'payapply/linkedinvoice.act?method=addLinkedInvoice',
			update: 'payapply/linkedinvoice.act?method=updateLinkedInvoice',
			read: 'payapply/linkedinvoice.act?method=getLinkedInvoiceList',
			destroy: 'payapply/linkedinvoice.act?method=deleteLinkedInvoice'
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
			allowSingle: false
		}
	},
	sorter: [{
		property: 'fplb'+'fphm',
		direction: 'ASC'
	}]
});
