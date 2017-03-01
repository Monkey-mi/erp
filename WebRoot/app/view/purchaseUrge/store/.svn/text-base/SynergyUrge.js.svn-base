Ext.define('erp.view.purchaseUrge.store.SynergyUrge', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseUrge.model.SynergyUrge'],
	model: 'erp.view.purchaseUrge.model.SynergyUrge',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'purchaseurge/purchaseurge.act?method=getSynergyUrgeList'
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		}
	},
	sorter: [{
		property: 'htbh',
		direction: 'ASC'
	}]
});
