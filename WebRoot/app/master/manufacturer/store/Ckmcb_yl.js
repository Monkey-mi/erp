Ext.define('erp.master.manufacturer.store.Ckmcb_yl', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.manufacturer.model.Ckmcb_yl'],
	model: 'erp.master.manufacturer.model.Ckmcb_yl',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {			
			read: 'manufacturer/noupto.act?method=getCkmc'
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
		property: 'ckbh',
		direction: 'ASC'
	}]
});
