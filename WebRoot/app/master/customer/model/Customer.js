Ext.define('erp.master.customer.model.Customer',{
	extend: 'Ext.data.Model',
	idProperty :'khbh',
	fields:[
	{ name: 'khbh',alias:'客户编号'},
	{ name: 'khjc',alias:'客户简称'},
	{ name: 'khmc',alias:'客户名称'},
	{ name: 'ywmc',alias:'英文名称'},
	{ name: 'yhbh',alias:'用户编号'},
	{ name: 'xslb'},
	{ name: 'ztdw'},
	{name:'fzrq',type:'date',dateFormat: 'Y-m-d H:i:s',alias:'发展日期'},
	{ name: 'khzt',type:'int',alias:'客户状态'},
	{ name: 'khlb'},
	{ name: 'qyxz'},
	{ name: 'ywym',alias:'业务员名'},
	{ name: 'qybh'},
	{ name: 'wbbh'},
	{ name:'zczb',type:'number'},
	{ name:'xyed',type:'number'},
	{ name:'hkzq',type:'number'},
	{ name:'kpqx',type:'number'},
	{ name: 'khly',alias:'客户来源'},
	{ name: 'khdz'},
	{ name: 'lxrm',alias:'联系人名'},
	{ name: 'khdh',alias:'电话'},
	{ name: 'khcz',alias:'传真'},
	{ name: 'khsh'},
	{ name: 'khzh',alias:'账户'},
	{ name: 'khyb',alias:'邮编'},
	{ name: 'http',alias:'网址'},
	{ name: 'khyx',alias:'客户邮箱'},
	{ name: 'bzsm'},
	{ name: 'gdbj',type:'int'},
	{ name: 'czrm',alias:'操作人名'},
	{name:'czsj',type:'date',dateFormat: 'Y-m-d H:i:s',alias:'注册时间',alias:'操作时间'},
	{ name: 'spbj',type:'int'},
	{ name: 'sprm',alias:'审批人'},
	{name:'spsj',type:'date',dateFormat: 'Y-m-d H:i:s',alias:'审批时间'},
	{ name: 'khxh'},
	{ name: 'lbbh'},
	{ name: 'hzkh'},
	{ name: 'dfzh'},
	{ name: 'zhbh'},
	{ name: 'scbj',type:'int'},
	{ name: 'mfdm'},
	{name:'khqx',type:'number'},
	{ name: 'zffs'},
	{ name: 'glkh'},
	{ name: 'khdm'},
	{name:'xbxyed',type:'number'},
	{ name: 'zydj'},
	{ name: 'zldj'},
	{ name: 'xydj'},
	{ name: 'fktj'},
	{ name: 'hdxx'},
	{ name: 'fkbz'},
	{ name: 'zkmybj',type:'int'},
	{ name: 'qymc'},
	{ name: 'lbmc'},
	{ name: 'khztmc'},
	{ name: 'ztmc'},
	{ name: 'ckxb',convert:function(value,record){
		if(value!=null){
			return Ext.String.trim(value);
		}
		return value;
	}},
	{ name: 'khgslbmc'},//客户归属类别名称
	{ name: 'zhmc'},
	{name: 'xslbmc'},//销售类别名称
	{name: 'zdkh'}//销售类别名称
]
});