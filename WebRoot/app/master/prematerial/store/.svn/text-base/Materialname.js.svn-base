Ext.define('erp.master.prematerial.store.Materialname', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.prematerial.model.Materialname'],
	model: 'erp.master.prematerial.model.Materialname',
	pageSize: 25,
	proxy: {
		type: 'ajax',
	    actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'prematerial/materialname.act?method=addMaterialname',
			update: 'prematerial/materialname.act?method=updateMaterialname',
			read: 'prematerial/materialname.act?method=getMaterialnameList',
			destroy: 'prematerial/materialname.act?method=deleteMaterialname'
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
		property: '',
		direction: 'ASC'
	}]
});
