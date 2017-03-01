Ext.define('erp.view.master.caterialPrice.model.CaterialPrice', {
	extend: 'erp.common.basic.model.Model',
	idProperty: 'gsbh',
	fields: [
		{ name: 'sdbj', type: 'int',header:'锁定',columnWidth:40,isSign:true},
		{ name: 'gsbh', type: 'int',header:'公式编号',columnWidth:80},
		{ name: 'gsmc' ,header:'公式名称',columnWidth:160},
		{ name: 'jggs' ,header:'价格公式',columnWidth:240},
		{ name: 'bzsm' ,header:'备注说明',columnWidth:160},
		{ name: 'czym' ,header:'操作员',columnWidth:80},
		{ name: 'czrq', type: 'date', dateFormat: 'Y-m-d H:i:s' ,header:'操作日期',columnWidth:90},
		{ name: 'sdrm' ,header:'锁定人',columnWidth:60},
		{ name: 'sdrq', type: 'date', dateFormat: 'Y-m-d H:i:s' ,header:'锁定日期',columnWidth:90}
	]
});
