Ext.define('erp.view.purchaseUrge.model.PurchaseUrgeOth', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'qlxh', type: 'int' ,header:'序号',columnWidth:80},
		{ name: 'cgsl', type: 'float',header:'采购未完',columnWidth:80,allow_summary:true,summaryFomat:'0,000.000'},
		{ name: 'jhrq', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'交货日期',columnWidth:85},
		{ name: 'qlrq', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'欠料日期',columnWidth:85},
		{ name: 'tqts', type: 'float',header:'提前天数',columnWidth:80},
		{ name: 'wkjq', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'物控交期',columnWidth:85},
		{ name: 'yqjh', type: 'float' ,header:'采购未完',columnWidth:80,allow_summary:true,summaryFomat:'0,000.000'},
		{ name: 'scwkjq', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'上次物控交期',columnWidth:85},
		{ name: 'hfjl',header:'回复结论',columnWidth:80},
		{ name: 'hfrm',header:'回复人',columnWidth:80},
		{ name: 'hfsj', type: 'date', dateFormat: 'Y-m-d H:i:s' ,header:'回复时间',columnWidth:85},
		
		
		{ name: 'qldh', type: 'int' ,hidden:true},
		{ name: 'jhbh', type: 'int' ,hidden:true},
		{ name: 'jhxh', type: 'int' ,hidden:true},
		{ name: 'jhh' ,hidden:true},
		{ name: 'htbh', type: 'int' ,hidden:true},
		{ name: 'htxh', type: 'int' ,hidden:true},
		{ name: 'hth' ,hidden:true},
		{ name: 'wxdh', type: 'int' ,hidden:true},
		{ name: 'wxxh', type: 'int' ,hidden:true},
		{ name: 'wxh',hidden:true },
		{ name: 'clhh' ,hidden:true},
		{ name: 'cltx1' ,hidden:true},
		{ name: 'cltx2' ,hidden:true},
		{ name: 'cltx3' ,hidden:true},
		{ name: 'jldw' ,hidden:true},
		{ name: 'hfyj' ,hidden:true},
		{ name: 'bzsm' ,hidden:true},
		{ name: 'clmc' ,hidden:true}
	]
});
