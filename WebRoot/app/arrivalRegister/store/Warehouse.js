Ext.define('erp.arrivalRegister.store.Warehouse', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.arrivalRegister.model.Warehouse'],
	model: 'erp.arrivalRegister.model.Warehouse',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update: 'POST'},
		extraParams : {czy_gh:erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id},
		api: {
			create: 'arrivalregister/arrivalregister.act?method=addArrivalRegister',
			update: 'arrivalregister/arrivalregister.act?method=updateArrivalRegister', 
			read: 'arrivalregister/arrivalregister.act?method=getWarehouseList',
			destroy: 'arrivalregister/arrivalregister.act?method=deleteArrivalRegister'
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
