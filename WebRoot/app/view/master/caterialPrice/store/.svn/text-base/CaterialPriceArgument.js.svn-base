Ext.define('erp.view.master.caterialPrice.store.CaterialPriceArgument', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.master.caterialPrice.model.CaterialPriceArgument'],
	model: 'erp.view.master.caterialPrice.model.CaterialPriceArgument',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{usePaging:true},
		api: {
			create: 'caterialprice/caterialpriceargument.act?method=addCaterialPriceArgument',
			update: 'caterialprice/caterialpriceargument.act?method=updateCaterialPriceArgument',
			read: 'caterialprice/caterialpriceargument.act?method=getCaterialPriceArgumentList',
			destroy: 'caterialprice/caterialpriceargument.act?method=deleteCaterialPriceArgument'
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
		property: 'csbh',
		direction: 'ASC'
	}]
});
