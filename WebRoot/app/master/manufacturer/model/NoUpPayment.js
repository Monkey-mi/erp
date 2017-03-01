Ext.define('erp.master.manufacturer.model.NoUpPayment', {
	extend: 'Ext.data.Model',
	fields: [		
		{ name: 'fydh' ,type : 'int'},
		{ name: 'fyxh' ,type : 'int'},
		{ name: 'fyrq' , type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'yhbh' },
		{ name: 'cglb' },
		{ name: 'csbh'},
		{ name: 'fyzy' },
		{ name: 'fysl' ,type : 'float'},
		{ name: 'fydj' ,type : 'float'},
		{ name: 'fyje' ,type : 'float'},
		{ name: 'zzsl' ,type : 'float'},
		{ name: 'csdj' ,type : 'float'},
		{ name: 'csje' ,type : 'float'},
		{ name: 'zzse' ,type : 'float'},
		{ name: 'wbje' ,type : 'float'},
		{ name: 'jhh' },
		{ name: 'hth' },
		{ name: 'bzsm'},
		
		{ name: 'czym' },
		{ name: 'czsj' , type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'sdrm'},
		{ name: 'sdsj' , type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'tzdh' ,type : 'int'},
		{ name: 'fplb'},
		{ name: 'fphm' }
	]
});