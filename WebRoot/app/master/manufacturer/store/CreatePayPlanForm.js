Ext.define('erp.master.manufacturer.store.CreatePayPlanForm', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.manufacturer.model.CreatePayPlanForm'],
	model: 'erp.master.manufacturer.model.CreatePayPlanForm',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'manufacturer/createPayPlanGrid.act?method=addCreatePayPlanForm',
			update: 'manufacturer/createPayPlanGrid.act?method=updateCreatePayPlanForm',
			read: 'manufacturer/createPayPlanGrid.act?method=getCreatePayPlanForm',
			destroy: 'manufacturer/createPayPlanGrid.act?method=deleteCreatePayPlanForm'
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
		property: 'jhbh',
		direction: 'ASC'
	}]
});
