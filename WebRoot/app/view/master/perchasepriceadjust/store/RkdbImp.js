Ext.define('erp.view.master.perchasepriceadjust.store.RkdbImp', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.master.perchasepriceadjust.model.RkdbImp'],
	model: 'erp.view.master.perchasepriceadjust.model.RkdbImp',
	pageSize: 200,
	proxy: {
		type: 'ajax',
		extraParams:{usePaging:true},
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			read: 'perchase/perchase.act?method=getRkdbImpList'
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		}
	},
	sorter: [{
		property: '',
		direction: 'ASC'
	}]
});
