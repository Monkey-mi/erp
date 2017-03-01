Ext.define('erp.setup.model.ModuleTree', {
	extend: 'Ext.data.Model',
	requires: ['erp.def.Const'],
	fields: [
	            {name:'id'          ,type:'int'},
				{name:'parentId'    },
				{name:'mod_type'    ,	defaultValue:erp.Const.MODULE_TYPE_APP},
				{name:'mod_code'    },
				{name:'text'        }, 
				{name:'textCls'     },
				{name:'expanded'    ,type:'boolean',	defaultValue:erp.Const.YESNO_TYPE_NO},
				{name:'leaf'        ,type:'boolean',	defaultValue:erp.Const.YESNO_TYPE_YES},
				{name:'isvalid'     ,type:'boolean',	defaultValue:erp.Const.YESNO_TYPE_YES},
				{name:'urltype'		,	defaultValue:erp.Const.URL_TYPE_MODULE},
				{name:'url'         },
				{name:'urltarget'   },
				{name:'icon'        },
				{name:'iconCls'     },
				{name:'qtip'        },
				{name:'qtitle'      },
				{name:'order_seq'   ,   type:'int'},
				{name:'remark'      },
				{name:'create_date' ,   type:'date',	dateFormat: 'Y-m-d H:i:s'},
				{name:'modify_date' ,   type:'date',	dateFormat: 'Y-m-d H:i:s'},
				{name:'ctrller'},
				{name:'jsview'},
				{name:'extraCfg'},
				{name:'softSet',	defaultValue:[]},
				{name:'module',	defaultValue:[]}
	        ]
});