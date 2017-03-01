Ext.define('erp.view.plasticPartsPledge.store.PlasticPartsPledgeInvoiceImp', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.plasticPartsPledge.model.PlasticPartsPledgeInvoiceImp'],
	model: 'erp.view.plasticPartsPledge.model.PlasticPartsPledgeInvoiceImp',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{gdbj:0,usePaging:true,czy_gh:erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id},
		api: {
			read: 'plasticpartspledge/plasticpartspledge.act?method=getPlasticPartsPledgeInvoiceImpList'
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
		property: 'zydh',
		direction: 'ASC'
	}]
});
