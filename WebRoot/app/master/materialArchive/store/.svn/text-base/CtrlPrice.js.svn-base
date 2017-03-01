Ext.define('erp.master.materialArchive.store.CtrlPrice', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.materialArchive.model.CtrlPrice'],
	model: 'erp.master.materialArchive.model.CtrlPrice',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'materialarchive/materialarchive.act?method=addCtrlPrice',
			update: 'materialarchive/materialarchive.act?method=updateCtrlPrice',
			read: 'materialarchive/materialarchive.act?method=getCtrlPriceList',
			destroy: 'materialarchive/materialarchive.act?method=deleteCtrlPrice'
		},
		extraParams:{usePaging:true},
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
		property: 'clhh',
		direction: 'ASC'
	}]
});
