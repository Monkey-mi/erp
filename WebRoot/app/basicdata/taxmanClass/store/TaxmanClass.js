Ext.define('erp.basicdata.taxmanClass.store.TaxmanClass', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.basicdata.taxmanClass.model.TaxmanClass'],
	model: 'erp.basicdata.taxmanClass.model.TaxmanClass',
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
			create: 'taxmanClass/TaxmanClass.srm?method=addTaxmanClass',
			update: 'taxmanClass/TaxmanClass.srm?method=updateTaxmanClass',
			read: 'taxmanClass/TaxmanClass.srm?method=getTaxmanClassList',
			destroy: 'taxmanClass/TaxmanClass.srm?method=deleteTaxmanClass'
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
		property: 'taxman_id',
		direction: 'ASC'
	}]
});
