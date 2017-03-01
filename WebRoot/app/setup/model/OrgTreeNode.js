Ext.define('erp.setup.model.OrgTreeNode', {
	extend: 'Ext.data.Model',
	requires: ['erp.def.Const'],
	fields: [
	            {name:'id'          ,type:'int'},
				{name:'parentId'    ,type:'int'},
				{name:'text'        },
				{name:'orv_id'		,	type:'int'},
				{name:'ou_id'		,	type:'int'},
				{name:'ou_code'},
				{name:'expanded'    ,	type:'boolean',defaultValue:erp.Const.YESNO_TYPE_NO},
				{name:'leaf'        ,	type:'boolean',defaultValue:erp.Const.YESNO_TYPE_YES},
				{name:'order_seq'   ,   type:'int'},
				{name:'pv'          ,type:'boolean'},
                {name:'po'          ,type:'boolean'},
                {name:'has_qry'     ,type:'boolean'},//是否有查询权限
                {name:'has_curd'    ,type:'boolean'},//是否有操作权限
                {name:'is_default'  ,type:'boolean'},//是否是默认组织
                {name:'has_op1'     ,type:'boolean'},
                {name:'has_op2'     ,type:'boolean'},
                {name:'has_op3'     ,type:'boolean'},
                {name:'has_op4'     ,type:'boolean'}
	        ]
});