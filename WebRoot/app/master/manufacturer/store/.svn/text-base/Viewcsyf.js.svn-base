Ext.define('erp.master.manufacturer.store.Viewcsyf', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.manufacturer.model.Viewcsyf'],
	model: 'erp.master.manufacturer.model.Viewcsyf',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'manufacturer/manufaccountdetial.act?method=addmanufAccountDetial',
			update: 'manufacturer/manufaccountdetial.act?method=updatemanufAccountDetial',
			read: 'manufacturer/manufaccountdetial.act?method=getmanufAccountDetial',
			destroy: 'manufacturer/manufaccountdetial.act?method=deletemanufAccountDetial'
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
		property: 'csbh',
		direction: 'ASC'
	}]
});
