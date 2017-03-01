Ext.define('erp.report.engine.model.ReportScript', {
	extend: 'Ext.data.Model',
	idProperty :'sp_id',
	fields: [
	            {name:'sp_id'          ,type:'int'},
				{name:'sp_name'    },
				{name:'remark'     },
				{name:'list_id'   ,   type:'int'},
				{name:'content'    },
				{name:'create_date' ,   type:'date',	dateFormat: 'Y-m-d H:i:s'},
				{name:'modify_date' ,   type:'date',	dateFormat: 'Y-m-d H:i:s'}
	        ]
});