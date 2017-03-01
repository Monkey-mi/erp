Ext.define('erp.setup.store.SerialRuleDetail', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.setup.model.SerialRuleDetail'],
	model: 'erp.setup.model.SerialRuleDetail',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'main/Serial.do?method=addSerialRuleDetail',
			update: 'main/Serial.do?method=updateSerialRuleDetail',
			read: 'main/Serial.do?method=getSerialRuleDetailList',
			destroy: 'main/Serial.do?method=deleteSerialRuleDetail'
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
		property: 'sd_id',
		direction: 'ASC'
	}]
});
