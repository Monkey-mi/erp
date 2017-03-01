Ext.define('erp.express.model.Tdfd', {
	extend: 'erp.common.basic.model.Model',
	idProperty: 'cybh',
	fields: [
		{ name:'tablename',defaultValue:'cyjhb'}, //出运计划表,部分字段
		{ name: 'cybh' },
		{ name: 'khbh' },
		
		{ name: 'yjbj', type: 'int' },
		{ name: 'yjsj', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'yjrm' },
		{ name: 'fdbj', type: 'int' },
		{ name: 'fdsj', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'fdrm' },
		{ name: 'tdhm' },
		{ name: 'khmc' },
		{ name: 'chje', type: 'float'},
		{ name: 'yjdg', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'ysbj', type: 'int' },
		{ name: 'sjrq', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'xslb' },
		{ name: 'xslbmc' },
		{ name: 'tjbj', type: 'int' },
		{ name: 'tjrm' },
		{ name: 'tjsj', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'tjrq', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'tdqrbj', type: 'int' },
		{ name: 'tdqrrm' },
		{ name: 'tdqrsj', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'yfje', type: 'float' },
		{ name: 'djbj', type: 'int' },
		{ name: 'djsj', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'djrm' },
		{ name: 'chsj', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'tdgdbj', type: 'int' },
		{ name: 'tdgdrm' },
		{ name: 'tdgdsj', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name:'kcrq', type: 'date', dateFormat: 'Y-m-d H:i:s' },//开船日期
		{ name: 'tdbzsm' },
		{ name: 'fktj' }
		
	]
});
