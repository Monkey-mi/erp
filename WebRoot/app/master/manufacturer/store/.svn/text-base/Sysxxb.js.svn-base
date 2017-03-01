Ext.define('erp.master.manufacturer.store.Sysxxb', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.manufacturer.model.Sysxxb'],
	model: 'erp.master.manufacturer.model.Sysxxb',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'manufacturer/sysxxb.act?method=addSysxxb',
			update: 'manufacturer/sysxxb.act?method=updateSysxxb',
			read: 'manufacturer/sysxxb.act?method=getSysxxb',
			destroy: 'manufacturer/sysxxb.act?method=deleteSysxxb'
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
		property: 'yhbh',
		direction: 'ASC'
	}]
});
