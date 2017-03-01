Ext.define('erp.master.bakTable.model.BakTable', {
	extend: 'Ext.data.Model',
	idProperty: 'log_id',
	fields: [
		{ name: 'log_id', type: 'int' },
		{ name: 'table_name' },
		{ name: 'bak_table_name' },
		{ name: 'bak_begin_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'begin_time', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'end_time', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'row_nums', type: 'int' },
		{ name: 'show' ,convert:function(v,record){
			return record.get('bak_begin_dt')==null?v:record.get('bak_begin_dt').getFullYear() ;
		}},
		{ name: 'run_sts' }
	]
});
