Ext.define('erp.view.master.perchasepriceadjust.model.Cgjgtzb', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'qfbj', type: 'int' ,header:'签发',columnWidth:40,isSign:true},
		{ name: 'tjbj', type: 'int',header:'提交',columnWidth:40 ,isSign:true},
		{ name: 'sdbj', type: 'int' ,header:'锁定',columnWidth:40,isSign:true},
		{ name: 'tjdh', type: 'int',header:'调价单号',columnWidth:80 },
		{ name: 'tjzt' ,header:'调价主题',columnWidth:360},
		{ name: 'hsbm' ,hidden:true},
		{ name: 'hsbmmc' ,header:'核算部门',columnWidth:100},
		{ name: 'czym' ,header:'操作员',columnWidth:80},
		{ name: 'czsj', type: 'date', dateFormat: 'Y-m-d H:i:s' ,header:'操作时间',columnWidth:90},
		{ name: 'sdrm' ,header:'锁定人',columnWidth:80},
		{ name: 'sdsj', type: 'date', dateFormat: 'Y-m-d H:i:s' ,header:'锁定时间',columnWidth:90},
		{ name: 'qfrm' ,header:'签发人',columnWidth:80},
		{ name: 'qfsj', type: 'date', dateFormat: 'Y-m-d H:i:s' ,header:'签发时间',columnWidth:90},
		{ name: 'tjrm' ,header:'提交人',columnWidth:80},
		{ name: 'tjsj', type: 'date', dateFormat: 'Y-m-d H:i:s' ,header:'提交时间',columnWidth:90},
		{ name: 'tjdx' ,header:'提交对象',columnWidth:80,hidden:true},
		{ name: 'czy_xm' ,header:'提交对象',columnWidth:80},
		{ name: 'gdbj', type: 'int' ,hidden:true},
		{ name: 'spbj', type: 'int' ,hidden:true}
	]
});
