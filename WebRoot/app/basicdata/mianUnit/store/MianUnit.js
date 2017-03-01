Ext.define('erp.basicdata.mianUnit.store.MianUnit', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.basicdata.mianUnit.model.MianUnit'],
	model: 'erp.basicdata.mianUnit.model.MianUnit',
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
			create: 'mianUnit/mianUnit.srm?method=addMianUnit',
			update: 'mianUnit/mianUnit.srm?method=updateMianUnit',
			read: 'mianUnit/mianUnit.srm?method=getMianUnitList',
			destroy: 'mianUnit/mianUnit.srm?method=deleteMianUnit'
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
		property: 'ztbh',
		direction: 'ASC'
	}]
});
