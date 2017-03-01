Ext.define('erp.materialInspection.model.MaterialApply', {
	extend: 'Ext.data.Model',
	idProperty: 'wtdh,wtxh',
	fields: [
		{ name: 'wtdh', type: 'float' },
		{ name: 'wtxh', type: 'float' },
		{ name: 'clhh' },
		{ name: 'clmc' },
		{ name: 'htbh', type: 'float' },
		{ name: 'htxh', type: 'float' },
		{ name: 'hth'},
		{ name: 'sjsl', type: 'float' },
		{ name: 'ckbh' },
		{ name: 'ckmc' },
		{ name: 'cghtyq'},
		{ name: 'dhdh', type: 'float' },
		{ name: 'dhxh', type: 'float' },
		{ name: 'dhh'},
		{ name: 'llrq', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'jldw' }
	]
});
