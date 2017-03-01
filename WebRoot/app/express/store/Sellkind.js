Ext.define('erp.express.store.Sellkind', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.express.model.Sellkind'],
	model: 'erp.express.model.Sellkind',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'essell/sellkind.crm?method=addSellkind',
			update: 'essell/sellkind.crm?method=updateSellkind',
			read: 'essell/sellkind.crm?method=getSellkindList',
			destroy: 'essell/sellkind.crm?method=deleteSellkind'
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
		property: 'lbbh',
		direction: 'ASC'
	}]
});
