Ext.define('erp.view.master.perchasepriceadjust.store.Cgjgtzb', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.master.perchasepriceadjust.model.Cgjgtzb'],
	model: 'erp.view.master.perchasepriceadjust.model.Cgjgtzb',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{gdbj:0,usePaging:true,czy_gh:erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id},
		api: {
			create: 'perchase/perchase.act?method=addCgjgtzb',
			update: 'perchase/perchase.act?method=updateCgjgtzb',
			read: 'perchase/perchase.act?method=getCgjgtzbList',
			destroy: 'perchase/perchase.act?method=deleteCgjgtzb'
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
			allowSingle: false,
			writeAllFields:true
		}
	},
	sorter: [{
		property: 'tjdh',
		direction: 'ASC'
	}]
});
