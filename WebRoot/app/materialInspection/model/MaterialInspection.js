Ext.define('erp.materialInspection.model.MaterialInspection', {header:'',
	extend: 'Ext.data.Model',
	idProperty: '',
	fields: [
	    {header:'签发',name: 'qfbj', type: 'int' ,columnWidth:40,isSign:true},
		{header:'检验',name: 'jybj', type: 'int' ,columnWidth:40,isSign:true},
		{header:'锁定',name: 'sdbj', type: 'int' ,columnWidth:40,isSign:true},
		{header:'委托单号',name: 'wtdh', type: 'int' ,columnWidth:80},
		{header:'委托部门',name: 'wtlbmc' ,columnWidth:80},
		{header:'委托类别',name: 'wtlb' ,columnWidth:80,hidden:true},
		{header:'委托人',name: 'wtrm' ,columnWidth:80},
		{header:'委托日期',name: 'wtrq', type: 'date', dateFormat: 'Y-m-d H:i:s' ,columnWidth:90},
		{header:'供应厂商',name: 'csmc' ,columnWidth:200},
		{header: '测试类型',name:'cslx',columnWidth:80},
		{header: '测试机构',name:'csjgmc',columnWidth:180},
		{header: '测试机构',name:'csjg',columnWidth:80,hidden:true},
	    {header:'序号',name: 'wtxh', type: 'int' ,columnWidth:60},
	    
	    {header:'材料货号', name: 'clhh',columnWidth:80},
	    {header:'材料名称', name: 'clmc',columnWidth:180},
	    {header:'送检数量',name: 'sjsl', type: 'float' ,columnWidth:80,align:'center'},
		{header:'单位',name: 'jldw' ,columnWidth:60},
		{name: 'htbh', type: 'float',hidden:true},
		{name: 'htxh', type: 'float',hidden:true},
		{name: 'csbh',hidden:true },
		{name: 'cghtyq',hidden:true },
		{header:'合同号',name: 'hth' ,columnWidth:80},
		{header:'订单号',name: 'ddh' ,columnWidth:80},
		{header:'来料日期',name: 'llrq', type: 'date', dateFormat: 'Y-m-d H:i:s' ,columnWidth:90},
		{header:'测试目的',name: 'csmd' ,columnWidth:200},
		{header:'备注说明',name: 'bzsm' ,columnWidth:200},
		{header:'操作员',name: 'czym' ,columnWidth:70},
		{header:'操作时间',name: 'czsj', type: 'date', dateFormat: 'Y-m-d H:i:s' ,columnWidth:90},
		{header:'锁定人名',name: 'sdrm' ,columnWidth:70},
		{header:'锁定时间',name: 'sdsj', type: 'date', dateFormat: 'Y-m-d H:i:s' ,columnWidth:80},
		 {header:'签发人名',name: 'qfrm' ,columnWidth:80},
		{header:'签发时间',name: 'qfsj', type: 'date', dateFormat: 'Y-m-d H:i:s' ,columnWidth:80},
		
		{name: 'jybj', type: 'int' ,hidden:true},
		{name: 'gdbj', type: 'int' ,hidden:true},
		{name: 'gdbj_pd', type: 'int' ,hidden:true},
		
		{name: 'shbj', type: 'int' ,hidden:true},
		{name: 'ckbh' ,hidden:true},
		{name: 'dhdh', type: 'float' ,hidden:true},
		{name: 'dhxh', type: 'float' ,hidden:true},
		{name: 'bzsm' ,hidden:true},
		{name: 'jysj', type: 'date', dateFormat: 'Y-m-d H:i:s' ,hidden:true},
		{name: 'shsj', type: 'date', dateFormat: 'Y-m-d H:i:s' ,hidden:true},
		{name: 'csmd' ,hidden:true},
		{name: 'jjcd' ,hidden:true}
	]
});
