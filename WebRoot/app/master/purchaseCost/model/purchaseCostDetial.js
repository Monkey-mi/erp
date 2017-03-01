Ext.define('erp.master.purchaseCost.model.purchaseCostDetial', {
	extend: 'Ext.data.Model',
	idProperty: 'wjbh',
	fields: [
		{ name: 'fydh', type: 'float' },
		{ name: 'wjbh', type: 'float' },
		{ name: 'wjmc' },
		{ name: 'wjlj' },
		{ name: 'wjrq', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'cjrm' }
	]
});
