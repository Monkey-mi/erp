Ext.define('erp.view.master.company.store.CompanyShow', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.master.company.model.CompanyShow'],
	model: 'erp.view.master.company.model.CompanyShow',
	pageSize: 30,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{usePaging:true},
		api: {
			read: 'caterialpriceapproval/caterialpriceapproval.act?method=getCompanyShowList'
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		}
	},
	sorter: [{
		property: 'csbh',
		direction: 'ASC'
	}]
});
