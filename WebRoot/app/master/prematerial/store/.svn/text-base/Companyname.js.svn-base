Ext.define('erp.master.prematerial.store.Companyname', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.prematerial.model.Companyname'],
	model: 'erp.master.prematerial.model.Companyname',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		 actionMethods : {read : 'POST'},
		 extraParams:{usePaging:true,history : 0},
		api: {
			read: 'prematerial/companyname.act?method=getCompanynameList'
		
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
	sorter: [{
		property: 'csbh',
		direction: 'ASC'
	}]
});
