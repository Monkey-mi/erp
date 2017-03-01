Ext.define('erp.arrivalRegister.store.GoodsAllocation', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.arrivalRegister.model.GoodsAllocation'],
	model: 'erp.arrivalRegister.model.GoodsAllocation',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {read : 'POST'},
		api: {
			read: 'arrivalregister/arrivalregister.act?method=getGoodsAllocationList'
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
		property: '',
		direction: 'ASC'
	}]
});
