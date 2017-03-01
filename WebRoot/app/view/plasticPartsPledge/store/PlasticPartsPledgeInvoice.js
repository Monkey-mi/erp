Ext.define('erp.view.plasticPartsPledge.store.PlasticPartsPledgeInvoice', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.plasticPartsPledge.model.PlasticPartsPledgeInvoice'],
	model: 'erp.view.plasticPartsPledge.model.PlasticPartsPledgeInvoice',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{gdbj:0,usePaging:true,czy_gh:erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id},
		api: {
			create: 'plasticpartspledge/plasticpartspledge.act?method=addPlasticPartsPledgeInvoice',
			update: 'plasticpartspledge/plasticpartspledge.act?method=updatePlasticPartsPledgeInvoice',
			read: 'plasticpartspledge/plasticpartspledge.act?method=getPlasticPartsPledgeInvoiceList',
			destroy: 'plasticpartspledge/plasticpartspledge.act?method=deletePlasticPartsPledgeInvoice'
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
