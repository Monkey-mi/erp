Ext.define('erp.view.purchaseOrder.model.IssueBack', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'clmc' ,header:'材料名称',columnWidth:240},
		{ name: 'cltx1',header:'规格尺寸',columnWidth:120 },
		{ name: 'cgsl', type: 'float',header:'采购数量',columnWidth:120  },
		{ name: 'jldw' ,header:'单位',columnWidth:80 },
		{ name: 'cgdj', type: 'float',header:'采购单价',columnWidth:100  },
		{ name: 'jhrq', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'交货日期',columnWidth:100  },
		{ name: 'hqjq', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'回签交期',columnWidth:100  },
		{ name: 'htbh', type: 'int' ,hidden:true},
		{ name: 'clhh' ,hidden:true},
		{ name: 'cltx2' ,hidden:true},
		{ name: 'cltx3' ,hidden:true},
		{ name: 'plmth' ,hidden:true},
		{ name: 'plmtx' ,hidden:true}
		
	]
});
