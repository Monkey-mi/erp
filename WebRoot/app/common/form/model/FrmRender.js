Ext.define('erp.common.form.model.FrmRender',{
	extend:'Ext.data.Model',
	idProperty :'fr_id',
	fields:[
		{name:'fr_id',			type:'int'},
		{name:'freg_id',		type:'int'},
		{name:'code'       },
		{name:'name'       },
		{name:'fr_desc'    },
		{name:'render_type'},
		{name:'master_xml'},
		{name:'detail_xml'},
		{name:'print_xml'},
		{name:'use_type'},
		{name:'master_ftid'},
		{name:'detail_ftids',	defaultValue:[]},
		{name:'create_code'},
		{name:'create_name'},
		{name:'create_dtm',	type:'date',	dateFormat: 'Y-m-d H:i:s'},
		{name:'modify_code'},
		{name:'modify_name'},
		{name:'modify_dtm',	type:'date',	dateFormat: 'Y-m-d H:i:s'},
		{name:'remark'     },
		{name:'proc_id',type:'int'}
	]
});