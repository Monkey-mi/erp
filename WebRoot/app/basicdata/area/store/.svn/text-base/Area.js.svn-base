Ext.define('erp.basicdata.area.store.Area', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.basicdata.area.model.Area'],
	model: 'erp.basicdata.area.model.Area',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
		api: {
			create: 'area/area.srm?method=addArea',
			update: 'area/area.srm?method=updateArea',
			read: 'area/area.srm?method=getAreaList',
			destroy: 'area/area.srm?method=deleteArea'
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
		property: 'area_id',
		direction: 'ASC'
	}]
});
