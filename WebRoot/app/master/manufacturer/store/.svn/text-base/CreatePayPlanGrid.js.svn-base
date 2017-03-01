Ext.define('erp.master.manufacturer.store.CreatePayPlanGrid', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.manufacturer.model.CreatePayPlanGrid'],
	model: 'erp.master.manufacturer.model.CreatePayPlanGrid',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'manufacturer/createPayPlanGrid.act?method=addCreatePayPlanGrid',
			update: 'manufacturer/createPayPlanGrid.act?method=updateCreatePayPlanGrid',
			read: 'manufacturer/createPayPlanGrid.act?method=getCreatePayPlanGrid',
			destroy: 'manufacturer/createPayPlanGrid.act?method=deleteCreatePayPlanGrid'
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
		property: 'jhbh'+'jhxh',
		direction: 'ASC'
	}]
});
