Ext.define('erp.express.store.EnumType', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.express.model.EnumType'],
	model: 'erp.express.model.EnumType',
	pageSize: 100,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{usePaging:true},
		api: {
			create: 'crm/enumtype.crm?method=addEnumType',
			update: 'crm/enumtype.crm?method=updateEnumType',
			read: 'crm/enumtype.crm?method=getEnumTypeList',
			destroy: 'crm/enumtype.crm?method=deleteEnumType'
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
		property: 'mjxl',
		direction: 'ASC',
		sortType: Ext.data.SortTypes.asInt 
	}]
});
