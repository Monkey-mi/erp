Ext.define('erp.companyQuot.model.CompanyQuot', {
	extend: 'erp.common.basic.model.Model',
	idProperty: 'bjdh',
	fields: [
		{ name: 'bjdh', type: 'float' },
		{ name: 'bjrq', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'csbh' },
		{ name: 'csmc' },
		{ name: 'czym' },
		{ name: 'czsj', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'gdbj', type: 'int' },
		{ name: 'bzsm' },
		{ name: 'shbj', type: 'int' },
		{ name: 'sdbj', type: 'int' },
		{ name: 'spbj', type: 'int' },
		{ name: 'sprm' },
		{ name: 'spsj', type: 'date', dateFormat: 'Y-m-d H:i:s' }
	]
});
