Ext.define('erp.supplierManager.store.AppCompetitor', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.supplierManager.model.AppCompetitor'],
	model: 'erp.supplierManager.model.AppCompetitor',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'supplier/competitor.srm?method=addCompetitor',
			update: 'supplier/competitor.srm?method=updateCompetitor',
			read: 'supplier/competitor.srm?method=getCompetitorList',
			destroy: 'supplier/competitor.srm?method=deleteCompetitor'
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
		property: 'competitor_id',
		direction: 'ASC'
	}]
});
