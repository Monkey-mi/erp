Ext.define('erp.master.group.model.Group',{
     extend:'erp.common.basic.model.Model',
     idProperty :'cgzh',
     fields: [
     { name:'tablename',defaultValue:'cgzmb',hidden: true},
     { name : 'cgzh' ,header:'采购组号'},
     { name : 'cgzm' ,header:'采购组名'},
     { name : 'bzsm' ,header:'备注说明'}
     ]
});