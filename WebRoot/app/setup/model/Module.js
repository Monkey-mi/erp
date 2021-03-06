Ext.define('erp.setup.model.Module', {
	extend: 'Ext.data.Model',
	requires: ['erp.def.Const'],
	fields: [
	            {name:'id'          ,type:'int'},
	            {name:'parentId'    },
	            {name:'mod_type'    ,	defaultValue:erp.Const.MODULE_TYPE_APP},
				{name:'mod_code'    },
				{name:'text'        }, 
				{name:'textCls'     },
				{name:'expanded'    ,	defaultValue:erp.Const.YESNO_TYPE_NO},
				{name:'leaf'        ,	defaultValue:erp.Const.YESNO_TYPE_YES},
				{name:'isvalid'     ,	defaultValue:erp.Const.YESNO_TYPE_YES},
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
				{name:'roles',	defaultValue:[]},
				{name:'softSet',	defaultValue:'erp'},
				{name:'module',	defaultValue:[]}
	        ]
});