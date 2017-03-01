Ext.define('erp.master.prematerial.store.Prematerial', {
	extend: 'Ext.data.Store',
	requires: ['erp.master.prematerial.model.Prematerial'],
	model: 'erp.master.prematerial.model.Prematerial',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		 actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		 extraParams : {czy_gh:erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id},
		api: {
			create: 'prematerial/prematerial.act?method=addPrematerial',
			update: 'prematerial/prematerial.act?method=updatePrematerial',
			read: 'prematerial/prematerial.act?method=getPrematerialList',
			destroy: 'prematerial/prematerial.act?method=deletePrematerial'
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
