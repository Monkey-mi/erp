Ext.define('erp.master.desctemplate.model.TemplateWithoutDetail', {
	extend: 'erp.common.basic.model.Model',
	idProperty: 'mbbh,mbxh',
	fields: [
		{ name: 'mbbh', type: 'string' },
		{ name: 'mbxh', type: 'float' },
		{ name: 'mbmc' },
		{ name: 'mbnr' }
	]
});
