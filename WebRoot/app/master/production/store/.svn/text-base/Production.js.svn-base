Ext.define('erp.master.production.store.Production', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.production.model.Production'],
	model: 'erp.master.production.model.Production',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{usePaging:true,gdbj:0},
		api: {
			read: 'purchasedetail/purchasedetail.act?method=getProductionList'
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		}
	},
	sorter: [{
		property: 'cpbh',
		direction: 'ASC'
	}]
});
