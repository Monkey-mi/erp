Ext.define('erp.express.model.Receiver', {
	extend: 'erp.common.basic.model.Model',
	idProperty: 'sjbh',
	fields: [
		{ name: 'sjbh' },
		{ name: 'sjdw'},
		{ name: 'sjlb' },
		{ name: 'sjdz' },
		{ name: 'sjjc'},
		{ name:'sjbj', type:'int'}
	]
});