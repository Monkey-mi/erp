Ext.define('erp.view.master.caterialPriceApproval.model.CaterialPriceApproval', {
	extend: 'erp.common.basic.model.Model',
	idProperty: 'jlbh',
	fields: [
		{ name: 'qybj', type: 'int' ,header:'启用',columnWidth:40,isSign:true},
		{ name: 'qfbj', type: 'int' ,header:'签发',columnWidth:40,isSign:true},
		{ name: 'sdbj', type: 'int' ,header:'锁定',columnWidth:40,isSign:true},
		{ name: 'jlbh', type: 'int' ,header:'记录编号',columnWidth:80},
		{ name: 'jlrq', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'记录日期',columnWidth:90 },
		{ name: 'gsbh', type: 'int' ,hidden:true},
		{ name: 'gsmc', header:'应用公式',columnWidth:90},
		{ name: 'bzsm', header:'审批摘要',columnWidth:160},
		{ name: 'sdrm', header:'锁定人',columnWidth:80},
		{ name: 'sdrq', type: 'date', dateFormat: 'Y-m-d H:i:s' ,header:'锁定时间',columnWidth:90 },
		{ name: 'qfrm', header:'签发人',columnWidth:80 },
		{ name: 'qfrq', type: 'date', dateFormat: 'Y-m-d H:i:s' ,header:'签发日期',columnWidth:90 },
		{ name: 'qyrm' , header:'启用人',columnWidth:80 },
		{ name: 'qyrq', type: 'date', dateFormat: 'Y-m-d H:i:s' ,header:'启用时间',columnWidth:90 },
		{ name: 'czrm' , header:'操作人',columnWidth:80 },
		{ name: 'czrq', type: 'date', dateFormat: 'Y-m-d H:i:s' ,header:'操作日期',columnWidth:90 },
		{ name: 'gdbj', type: 'int' ,hidden:true},
		{ name: 'gdrm' , header:'归档人',columnWidth:80 },
		{ name: 'gdrq', type: 'date', dateFormat: 'Y-m-d H:i:s' ,header:'归档时间',columnWidth:90 }
	]
});
