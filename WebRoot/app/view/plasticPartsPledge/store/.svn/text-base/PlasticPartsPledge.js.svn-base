Ext.define('erp.view.plasticPartsPledge.store.PlasticPartsPledge', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.plasticPartsPledge.model.PlasticPartsPledge'],
	model: 'erp.view.plasticPartsPledge.model.PlasticPartsPledge',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{gdbj:0,usePaging:true,czy_gh:erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id},
		api: {
			create: 'plasticpartspledge/plasticpartspledge.act?method=addPlasticPartsPledge',
			update: 'plasticpartspledge/plasticpartspledge.act?method=updatePlasticPartsPledge',
			read: 'plasticpartspledge/plasticpartspledge.act?method=getPlasticPartsPledgeList',
			destroy: 'plasticpartspledge/plasticpartspledge.act?method=deletePlasticPartsPledge'
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
	remoteFilter: true,
	remoteSort:true,
	sorter: [{
		property: 'zydh',
		direction: 'ASC'
	}]
});
