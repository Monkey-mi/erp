/**
 * 基础数据帮助配置
 */
Ext.define('erp.common.basic.model.CodeConfig',{
	extend:'Ext.data.Model',
	idProperty:'id',
	fields:[
	        {name:'id',type:'int'},
	        {name:'name'},
	        {name:'code'},
	        {name:'type'},
	        {name:'displayField'},
	        {name:'valueField'}
	        ]
});