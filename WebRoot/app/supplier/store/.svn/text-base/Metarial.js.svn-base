Ext.define('erp.supplier.store.Metarial', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.supplier.model.Metarial'],
	model: 'erp.supplier.model.Metarial',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {  
            create : 'POST',  
            read : 'POST',  
            update : 'POST',  
            destroy : 'POST'  
        },
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
			writeAllFields:true,
			encode: true,
			allowSingle: false
		}
	},
	sorters: [{
		property: 'material_id',
		direction: 'DESC'
	}]
});
