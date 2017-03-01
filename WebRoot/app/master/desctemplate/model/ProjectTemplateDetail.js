Ext.define('erp.master.desctemplate.model.ProjectTemplateDetail', {
	extend: 'erp.common.basic.model.Model',
	idProperty: 'mblb,mbbh,mbxh',
	fields: [
		{ name: 'mblb', type: 'int' },
		{ name: 'mbbh', type: 'int' },
		{ name: 'mbxh', type: 'int' },
		{ name: 'xmmc' },
		{ name: 'xmms' },
		{ name:'oo'}//辅助字段
	]
});
