Ext.define('erp.payApply.store.ManufacturerChoose', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.Manufacturer'],
	model: 'erp.payApply.model.Manufacturer',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'payapply/manufacturer.act?method=getManufacturerList'
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
		property: 'csbh',
		direction: 'ASC'
	}]
});
