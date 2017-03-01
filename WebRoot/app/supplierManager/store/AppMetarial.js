Ext.define('erp.supplierManager.store.AppMetarial', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.supplierManager.model.AppMetarial'],
	model: 'erp.supplierManager.model.AppMetarial',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'supplier/metarial.srm?method=addMetarial',
			update: 'supplier/metarial.srm?method=updateMetarial',
			read: 'supplier/metarial.srm?method=getMetarialList',
			destroy: 'supplier/metarial.srm?method=deleteMetarial'
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
		property: 'material_id',
		direction: 'ASC'
	}]
});
