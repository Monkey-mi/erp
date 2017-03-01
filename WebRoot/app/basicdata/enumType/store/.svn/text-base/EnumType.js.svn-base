Ext.define('erp.basicdata.enumType.store.EnumType', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.basicdata.enumType.model.EnumType'],
	model: 'erp.basicdata.enumType.model.EnumType',
	pageSize: 30,
	proxy: {
		type: 'ajax',
		actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
		extraParams:{usePaging:true},
		api: {
			create: 'enumtype/enumtype.act?method=addEnumType',
			update: 'enumtype/enumtype.act?method=updateEnumType',
			read: 'enumtype/enumtype.act?method=getEnumTypeList',
			destroy: 'enumtype/enumtype.act?method=deleteEnumType'
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
			allowSingle: false,
			writeAllFields:true
		}
	},
	sorter: [{
		property: 'mjxl',
		direction: 'ASC',
		sortType: Ext.data.SortTypes.asInt 
	}]
});
