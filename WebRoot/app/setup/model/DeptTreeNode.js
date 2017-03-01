/**
 * @author Yan.Wang
 * @date 2012.05.11
 * @breif 用于组织和部门分离时使用
 */
Ext.define('erp.setup.model.DeptTreeNode', {
	extend : 'Ext.data.Model',
	idProperty : 'id',
	fields : [ {name : 'id',type:'int'}, 
		{name : 'parentId',type:'int'},
		{name : 'ou_id', type:'int'},
		{name : 'ou_code'}, 
		{name : 'd_code'	},
		{name : 'text'	},
		{name:'func_code' },
        {name:'expanded'    , type:'boolean',defaultValue:erp.Const.YESNO_TYPE_NO},
        {name:'leaf'        ,   type:'boolean',defaultValue:erp.Const.YESNO_TYPE_YES},
        {name:'order_seq'   ,   type:'int'},
        {name:'del_flag'},
		{name:'po'     ,type:'boolean'},
		{name:'pv'     ,type:'boolean'},
		{name:'has_qry'     ,type:'boolean'},
        {name:'has_curd'    ,type:'boolean'},
        {name:'is_default'  ,type:'boolean'},
        {name:'has_op1'     ,type:'boolean'},
        {name:'has_op2'     ,type:'boolean'},
        {name:'has_op3'     ,type:'boolean'},
        {name:'has_op4'     ,type:'boolean'},
        {name:'iconCls', defaultValue: 'dept-tree-node'}
	]
});