Ext.define('erp.view.plasticPartsPledge.model.PlasticPartsPledge', {
	extend: 'Ext.data.Model',
	idProperty: 'zydh',
	fields: [
		{ name: 'jybj', type: 'int',header:'解押',columnWidth:50,isSign:true,allow_summaryOne:true},
		{ name: 'shbj', type: 'int',header:'审核',columnWidth:50,isSign:true},
		{ name: 'sdbj', type: 'int',header:'锁定',columnWidth:50,isSign:true},
		{ name: 'zydh', type: 'int',header:'质押单号',columnWidth:80},
		{ name: 'zylx', type: 'int',header:'质押类型',columnWidth:80,renderer:function(v){return v==0?'现金':'发票'}},
		{ name: 'czrm' ,header:'操作人名',columnWidth:80},
		{ name: 'czrq', type: 'date', dateFormat: 'Y-m-d H:i:s' ,header:'操作时间',columnWidth:85},
		{ name: 'csmc',header:'供应商',columnWidth:160},
		{ name: 'zyje', type: 'float',header:'质押金额',columnWidth:100,allow_summary:true,summaryFomat:'0,000.000'},
		{ name: 'dqrq', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'到期日期',columnWidth:85},
		{ name: 'bzsm' ,header:'备注',columnWidth:160},
		{ name: 'sdrm' ,header:'锁定人',columnWidth:80},
		{ name: 'sdsj', type: 'date', dateFormat: 'Y-m-d H:i:s' ,header:'锁定时间',columnWidth:85},
		{ name: 'shrm' ,header:'审核人',columnWidth:80},
		{ name: 'shsj', type: 'date', dateFormat: 'Y-m-d H:i:s' ,header:'审核时间',columnWidth:85},
		{ name: 'jyrm' ,header:'解押人',columnWidth:80},
		{ name: 'jysj', type: 'date', dateFormat: 'Y-m-d H:i:s' ,header:'解押时间',columnWidth:85},
		{ name: 'csbh' ,hidden:true}
	]
});
