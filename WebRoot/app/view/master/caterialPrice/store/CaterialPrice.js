Ext.define('erp.view.master.caterialPrice.store.CaterialPrice', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.master.caterialPrice.model.CaterialPrice'],
	model: 'erp.view.master.caterialPrice.model.CaterialPrice',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{usePaging:true},
		api: {
			create: 'caterialprice/caterialprice.act?method=addCaterialPrice',
			update: 'caterialprice/caterialprice.act?method=updateCaterialPrice',
			read: 'caterialprice/caterialprice.act?method=getCaterialPriceList',
			destroy: 'caterialprice/caterialprice.act?method=deleteCaterialPrice'
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
		property: 'gsbh',
		direction: 'ASC'
	}]
});
