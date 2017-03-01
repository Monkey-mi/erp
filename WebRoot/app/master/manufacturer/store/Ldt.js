Ext.define('erp.master.manufacturer.store.Maxjhbh', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.manufacturer.model.CreatePayPlanForm'],
	model: 'erp.master.manufacturer.model.CreatePayPlanForm',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			
			read: 'manufacturer/createPayPlanGrid.act?method=getMaxjhbh'
			
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
		property: 'mjxl',
		direction: 'ASC'
	}]
});
