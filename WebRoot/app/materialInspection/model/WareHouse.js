Ext.define('erp.materialInspection.model.WareHouse', {
	extend: 'Ext.data.Model',
//	requires: ['erp.ux.Const'],
	idProperty :'nodeId',
	fields: [
	            {name:'nodeId' 		},
				{name:'parentId'    },
				{name:'text'        },
				{name:'expanded'    ,type:'boolean',	defaultValue:erp.Const.YESNO_TYPE_NO},
				{name:'leaf'        ,type:'boolean',	defaultValue:erp.Const.YESNO_TYPE_NO},
				{name:'iconCls'        ,convert:function(v,rec){
					return  rec.get('leaf')?'leaf':'';
				}},
				{name:'order_seq'   ,   type:'int'},
				{name:'create_date' ,   type:'date',	dateFormat: 'Y-m-d H:i:s'},
				{name:'modify_date' ,   type:'date',	dateFormat: 'Y-m-d H:i:s'},
				{name:'type'        },
				{name:'ckbh'        },
				{name:'ckmc'        }
	        ]
});