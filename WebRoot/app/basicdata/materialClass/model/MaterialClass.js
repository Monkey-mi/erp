Ext.define('erp.basicdata.materialClass.model.MaterialClass', {
	extend: 'erp.basic.model.Model',
	identifier:'negative',
	idProperty: 'mc_id',
	fields: [
		{ name: 'mc_id'},
		{ name: 'mc_name' },
		{ name:'leaf'},
		{ name: 'f_id', type: 'int' },
		{ name: 'level_id', type: 'int' },
		{ name:'erp_id'},
		{ name:'oo'},
		{ name:'lbbh'}
	]
});
