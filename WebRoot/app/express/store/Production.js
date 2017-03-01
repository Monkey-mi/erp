Ext.define('tp.crm.master.production.store.Production', {
	extend: 'Ext.data.Store',
	reqiures: ['tp.crm.master.production.model.Production'],
	model: 'tp.crm.master.production.model.Production',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{usePaging:true,gdbj:0},
		api: {
//			create: 'crm/Production.act?method=addProduction',
//			update: 'crm/Production.act?method=updateProduction',
			read: 'crm/Production.act?method=getProductionList'
//			destroy: 'crm/Production.act?method=deleteProduction'
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
		property: 'cpbh',
		direction: 'ASC'
	}]
});
