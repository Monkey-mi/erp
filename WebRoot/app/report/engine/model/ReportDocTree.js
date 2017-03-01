Ext.define('erp.report.engine.model.ReportDocTree', {
	extend: 'Ext.data.Model',
	requires: ['erp.def.Const'],
	idProperty :'docId',
	fields: [
	            {name:'docId'          ,type:'int'},
				{name:'parentId'    },
				{name:'text'        },
				{name:'expanded'    ,type:'boolean',	defaultValue:erp.Const.YESNO_TYPE_NO},
				{name:'leaf'        ,type:'boolean',	defaultValue:erp.Const.YESNO_TYPE_NO},
				{name:'order_seq'   ,   type:'int'},
				{name:'create_date' ,   type:'date',	dateFormat: 'Y-m-d H:i:s'},
				{name:'modify_date' ,   type:'date',	dateFormat: 'Y-m-d H:i:s'}
	        ]
});