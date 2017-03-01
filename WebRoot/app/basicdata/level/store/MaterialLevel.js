Ext.define('erp.basicdata.level.store.MaterialLevel', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.basicdata.level.model.MaterialLevel'],
	model: 'erp.basicdata.level.model.MaterialLevel',
	pageSize: 25,
	proxy: {
		type: 'ajax',
//		extraParams:{usePaging:true},
		actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
		api: {
			create: 'materialLevel/materialLevel.srm?method=addMaterialLevel',
			update: 'materialLevel/materialLevel.srm?method=updateMaterialLevel',
			read: 'materialLevel/materialLevel.srm?method=getMaterialLevelList',
			destroy: 'materialLevel/materialLevel.srm?method=deleteMaterialLevel'
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
			writeAllFields:true,
			encode: true,
			allowSingle: false
		}
	},
	sorters: [{
		property: 'level_id',
		direction: 'ASC'
	}]
});
