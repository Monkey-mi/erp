Ext.define('erp.view.master.perchasepriceadjust.store.Cgjgtzmxb', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.master.perchasepriceadjust.model.Cgjgtzmxb'],
	model: 'erp.view.master.perchasepriceadjust.model.Cgjgtzmxb',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
//		extraParams:{usePaging:true},
		api: {
			create: 'perchase/perchase.act?method=addCgjgtzmxb',
			update: 'perchase/perchase.act?method=updateCgjgtzmxb',
			read: 'perchase/perchase.act?method=getCgjgtzmxbList',
			destroy: 'perchase/perchase.act?method=deleteCgjgtzmxb'
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
		property: 'tjdh,tjxh',
		direction: 'ASC'
	}]
});
