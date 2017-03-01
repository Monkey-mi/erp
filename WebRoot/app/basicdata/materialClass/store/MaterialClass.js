Ext.define('erp.basicdata.materialClass.store.MaterialClass', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.basicdata.materialClass.model.MaterialClass'],
	model: 'erp.basicdata.materialClass.model.MaterialClass',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
        extraParams:{
			usePaging:true
		},
		api: {
			create: 'materialClass/materialClass.srm?method=addMaterialClass',
			update: 'materialClass/materialClass.srm?method=updateMaterialClass',
			read: 'materialClass/materialClass.srm?method=getMaterialClassList',
			destroy: 'materialClass/materialClass.srm?method=deleteMaterialClass'
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
	sorters: [{
		property: 'mc_id',
		direction: 'ASC'
	}]
});
