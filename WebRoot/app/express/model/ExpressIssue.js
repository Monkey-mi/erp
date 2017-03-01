Ext.define('erp.express.model.ExpressIssue', {
	extend: 'erp.common.basic.model.Model',
	idProperty: 'jlbh,jlxh',
	fields: [
		{ name: 'jlbh' },
		{ name: 'jlxh' },
		{ name: 'cybh' },
		{ name: 'chrq', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'kcrq', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'yfje', type: 'float' }
	]
});
