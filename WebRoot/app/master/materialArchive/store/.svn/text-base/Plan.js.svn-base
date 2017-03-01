Ext.define('erp.master.materialArchive.store.Plan', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.materialArchive.model.Plan'],
	model: 'erp.master.materialArchive.model.Plan',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'materialarchive/materialarchive.act?method=addPlan',
			update: 'materialarchive/materialarchive.act?method=updatePlan',
			read: 'materialarchive/materialarchive.act?method=getPlanList',
			destroy: 'materialarchive/materialarchive.act?method=deletePlan'
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
