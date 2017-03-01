Ext.define('erp.purchaseInspectionManage.model.PurchaseInspectionManager', {
	extend: 'Ext.data.Model',
	idProperty: '',
	fields: [
		{ name: 'yhno', type: 'int' ,hidden:true},
		{ name: 'yhxh', type: 'int' ,hidden:true},
		{header:'分配', name: 'fpbj', type: 'int',columnWidth:40,isSign:true },
		{header:'验货号',name: 'yhh' ,columnWidth:80},	
		{header:'验货次数',name: 'yhcs', type: 'int' ,columnWidth:80},
		{header:'验货结论',name: 'yhjl' ,columnWidth:80},
		{header:'审核结果',name: 'shjg' ,columnWidth:80},
		{header:'合同号',name: 'hth' ,columnWidth:80},
		{header:'订单号',name: 'ddh' ,columnWidth:80},
		{header:'PO.NO',name: 'pono' ,columnWidth:80},
		{header:'客户型号',name: 'khxh' ,columnWidth:100},
		{header:'客户名称',name: 'khmc' ,columnWidth:160},
		{header:'产品编号',name: 'cpbh' ,columnWidth:80},
		{header:'产品名称',name: 'cpmc' ,columnWidth:160},
		{header:'单位',name: 'jldw' ,columnWidth:80},
		{header:'通知数量',name: 'tzsl' ,type: 'float',columnWidth:80},
		{header:'采购数量',name: 'cgsl' ,type: 'float',columnWidth:100},
		{header:'生产单号',name: 'scdh' ,columnWidth:80},
		{header:'外协号',name: 'wxh' ,columnWidth:80},
		{header:'拆分号',name: 'cfh' ,columnWidth:80},
		{header:'箱规',name: 'xgg' ,columnWidth:80},
		{header:'箱长',name: 'xc' ,type: 'float',columnWidth:80},
		{header:'箱宽',name: 'xk' ,type: 'float',columnWidth:80},
		{header:'箱高',name: 'xg' ,type: 'float',columnWidth:80},
		{header:'箱体积',name: 'xtj' ,type: 'float',columnWidth:80},
		{header:'箱只数',name: 'xzs' ,type: 'float',columnWidth:80},
		{header:'箱毛重',name: 'xmz' ,type: 'float',columnWidth:80},
		{header:'箱净重',name: 'xjz' ,type: 'float',columnWidth:80},
		{header:'供应商名称',name: 'gysmc' ,columnWidth:160},
		{header:'业务员',name: 'ywy' ,columnWidth:80},
		{header:'验货日期',name: 'yhrq', type: 'date', dateFormat: 'Y-m-d H:i:s' ,columnWidth:90},
		{header:'验货地点',name: 'yhdd' ,columnWidth:80},
		{header:'出货地点',name: 'chdd' ,columnWidth:80},
		{header:'包装资料路径',name: 'bzzl' ,columnWidth:160},
		{header:'备注说明',name: 'bzsm' ,columnWidth:160},
		{header:'提交人',name: 'tjrm' ,columnWidth:80},
		{header:'提交时间',name: 'tjsj', type: 'date', dateFormat: 'Y-m-d H:i:s' ,columnWidth:90},
		{header:'分配对象',name: 'fpdx' ,columnWidth:80},
		{header:'分配时间',name: 'fpsj', type: 'date', dateFormat: 'Y-m-d H:i:s' ,columnWidth:90},
		{header:'合同序号',name: 'htxh' ,columnWidth:80 ,type: 'float'},
		{header:'合同编号',name: 'htbh' ,columnWidth:80 ,type: 'float'},
		{header:'订单序号',name: 'ddxh' ,columnWidth:80 ,type: 'float'},
		{header:'订单编号',name: 'ddbh' ,columnWidth:80 ,type: 'float'},
		{header:'英文描述',name: 'ywms' ,columnWidth:80,hidden:true},
		{ name: 'wxbh', type: 'float',hidden:true }
	]
});
