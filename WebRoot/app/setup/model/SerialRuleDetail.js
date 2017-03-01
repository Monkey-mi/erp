Ext.define('erp.setup.model.SerialRuleDetail', {
	extend: 'Ext.data.Model',
	idProperty: 'sd_id',
	fields: [
		{ name: 'sd_id', type: 'int' },
		{ name: 'sr_id', type: 'int' },
		{ name: 'code' },
		{ name: 'field_code' },
		{ name: 'fixed_text' },
		{ name: 'data_format' },
		{ name: 'uparam_type' },
		{ name: 'len', type: 'int' },
		{name:'sub_start',	type:'int',		defaultValue:1},
		{name:'sub_end',	type:'int',		defaultValue:1},
		{name:'fill_char',	type:'string',	defaultValue:'0'},
		{name:'is_fillafter',	type:'bool',	defaultValue:false},
		{name:'seed',	type:'int',defaultValue:0},
		{name:'step',	type:'int',	defaultValue:1},
		{name:'step_jmp',	type:'int',defaultValue:0},
		{ name: 'min_value', type: 'int' },
		{ name: 'max_value', type: 'int' },
		{ name: 'reset_mode' },
		{ name: 'order_seq', type: 'int' }
	]
});
