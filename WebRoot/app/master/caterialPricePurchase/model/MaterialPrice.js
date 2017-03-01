//厂商控价
Ext.define('erp.master.caterialPricePurchase.model.MaterialPrice', {
	extend: 'Ext.data.Model',
	idProperty: '',
	fields: [
		{ name: 'clhh' },
		{ name: 'clmc' },
		{ name: 'csbh' },
		{ name: 'zdcgl', type: 'float' },
		{ name: 'zxbzl', type: 'float' },
		{ name: 'ghzq', type: 'float' },
		{ name: 'kzdj', type: 'float' },
		{ name: 'csxh' },
		{ name: 'bzsm' },
		{ name: 'czym' },
		{ name: 'czsj', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'fzkj', type: 'float' },
		{ name: 'spbj_kj', type: 'int' },
		{ name: 'sprm_kj' },
		{ name: 'spsj_kj', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'csmc' },
		{ name: 'wbbh'},
		{ name: 'yhbh'},
		{ name: 'cglb'},
		{ name: 'fzdw'},
		{ name: 'jldw'},
		{ name: 'wbdh'},
		{ name: 'cglbmc'}
	]
});