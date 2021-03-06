Ext.define('erp.companyQuot.model.QuotDetail', {
	extend: 'Ext.data.Model',
	idProperty: '',
	fields: [
		{ name: 'bjdh', type: 'float' },
		{ name: 'bjxh', type: 'float' },
		{ name: 'shbj', type: 'int' },
		{ name: 'spbj', type: 'int' },
		{ name: 'clhh' },
		{ name: 'csbh' },
		{ name: 'csmc' },
		{ name: 'clmc' },
		{ name: 'jldw' },
		{ name: 'csbj', type: 'float' },
		{ name: 'wbbh' },
		{ name: 'wbbj', type: 'float' },
		{ name: 'mxbz' },
		{ name: 'shrm' },
		{ name: 'shsj', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'fzkj', type: 'float' },
		{ name: 'jzj', type: 'float' },
		{ name: 'sdbj', type: 'int' },
		{ name: 'sdrm' },
		{ name: 'bjrq', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'jzj_str'},
		{ name: 'gxbj_jg',type : 'float'},
		{ name: 'plmth'},
		{ name: 'plmtx'},
		{ name: 'fzdw'},
		{ name: 'wbdh'}
	]
});
