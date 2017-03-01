Ext.define('erp.view.master.caterialPriceApproval.store.CaterialPriceCompany', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.master.caterialPriceApproval.model.CaterialPriceCompany'],
	model: 'erp.view.master.caterialPriceApproval.model.CaterialPriceCompany',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'caterialpriceapproval/caterialpricecompany.act?method=addCaterialPriceCompany',
			update: 'caterialpriceapproval/caterialpricecompany.act?method=updateCaterialPriceCompany',
			read: 'caterialpriceapproval/caterialpricecompany.act?method=getCaterialPriceCompanyList',
			destroy: 'caterialpriceapproval/caterialpricecompany.act?method=deleteCaterialPriceCompany'
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
		property: 'jlbh,jlxh,csbh',
		direction: 'ASC'
	}]
});
