Ext.define('erp.supplierManager.store.AppDevicelist', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.supplierManager.model.AppDevicelist'],
	model: 'erp.supplierManager.model.AppDevicelist',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'supplier/devicelist.srm?method=addDevicelist',
			update: 'supplier/devicelist.srm?method=updateDevicelist',
			read: 'supplier/devicelist.srm?method=getDevicelistList',
			destroy: 'supplier/devicelist.srm?method=deleteDevicelist'
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
		property: 'device_id',
		direction: 'ASC'
	}]
});
