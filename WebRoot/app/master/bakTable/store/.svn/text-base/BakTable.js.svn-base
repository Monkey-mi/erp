Ext.define('erp.master.bakTable.store.BakTable', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.bakTable.model.BakTable'],
	model: 'erp.master.bakTable.model.BakTable',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'baktable/baktable.act?method=addBakTable',
			update: 'baktable/baktable.act?method=updateBakTable',
			read: 'baktable/baktable.act?method=getBakTableList',
			destroy: 'baktable/baktable.act?method=deleteBakTable'
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
			allowSingle: false
		}
	},
	sorter: [{
		property: 'log_id',
		direction: 'ASC'
	}]
});
