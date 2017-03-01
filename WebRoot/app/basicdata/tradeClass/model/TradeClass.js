Ext.define('erp.basicdata.tradeClass.model.TradeClass', {
	extend: 'erp.basic.model.Model',
	idProperty: 'class_id',
	identifier:'negative',
	fields: [
		{ name: 'class_id', type: 'int' },
		{ name: 'class_name' },
		{ name: 'leaf'},
		{ name: 'f_id', type: 'int' },
		{ name:'oo'}
	]
});
