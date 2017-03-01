Ext.define('erp.report.engine.model.SysPrintModel', {
	extend: 'Ext.data.Model',
	idProperty: 'mod_id',
	fields: [
		{ name: 'mod_id', type: 'int' },
		{ name: 'menu_id', type: 'int' },
		{ name: 'name' },
		{ name: 'mod_description' },
		{ name: 'creater' },
		{ name: 'mod_tpl' },
		{ name: 'sql_text' },
		{ name: 'userName' },
		{name:'default_style'},
		{name:'ds_id',type:'int'},
		{name:'is_active'},
		{name:'is_out'},
		{name:'report_type'},
		{name:'tpl_type'},
		{name:'order_seq',type:'int'},
		//虚拟一个list_id值
		//由于多SQL语句需要同普通SQL语句写在一起
	   //所以给它们分配一个相对大的ID值用于保存list_id
		{name:'list_id',type:'int',convert:function(v,rec){
				var value=rec.get('mod_id')+90000;
			return value;
		}
		}
	]
});
