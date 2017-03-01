Ext.define('erp.setup.store.SerialRule', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.setup.model.SerialRule'],
	model: 'erp.setup.model.SerialRule',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'main/Serial.do?method=addSerialRule',
			update: 'main/Serial.do?method=updateSerialRule',
			read: 'main/Serial.do?method=getSerialRuleList',
			destroy: 'main/Serial.do?method=deleteSerialRule'
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
		property: 'sr_id',
		direction: 'ASC'
	}]
});
