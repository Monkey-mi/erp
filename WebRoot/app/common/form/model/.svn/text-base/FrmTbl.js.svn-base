Ext.define('erp.common.form.model.FrmTbl',{
	extend:'Ext.data.Model',
	requires:['erp.def.Const',
	          'erp.common.form.model.FrmFld'],
	idProperty :'ft_id',
	fields:[
		{name:'ft_id',		type:'int'},
		{name:'freg_id',	type:'int'},
		{name:'from_attr',	defaultValue:erp.Const.FRMTBL_FROM_TYPE_USERDEFINE},
		{name:'dscode'	 },
		{name:'type'     ,	defaultValue:erp.Const.FRMTBL_TYPE_MASTER},
		{name:'name'     },
		{name:'code'     },
		{name:'bo_def_id',type:"int"}
	],
	hasMany:[
		{
			  model:'erp.common.form.model.FrmFld',
			  name:'frmFlds',
			  primaryKey:'ff_id',
			  foreignKey:'ft_id'
		}
	]
});