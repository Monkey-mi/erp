Ext.define('erp.master.materialArchive.store.Rule', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.materialArchive.model.Rule'],
	model: 'erp.master.materialArchive.model.Rule',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'materialarchive/materialarchive.act?method=addRule',
			update: 'materialarchive/materialarchive.act?method=updateRule',
			read: 'materialarchive/materialarchive.act?method=getRuleList',
			destroy: 'materialarchive/materialarchive.act?method=deleteRule'
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
		property: 'clhh',
		direction: 'ASC'
	}]
});
