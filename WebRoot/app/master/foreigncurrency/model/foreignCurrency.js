Ext.define('erp.master.foreigncurrency.model.foreignCurrency', {
	extend: 'erp.basic.model.Model',
	identifier:'negative',
	idProperty: 'wbbh',
	fields: [
		{ name: 'wbbh' },
		{ name: 'wbdh' },
		{ name: 'wbfh' },
		{ name: 'wbmc' }
	]
});
