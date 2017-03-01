Ext.define('erp.view.master.company.model.CompanyShow', {
	extend: 'Ext.data.Model',
	idProperty: 'csbh',
	fields: [
		{ name: 'csbh' ,header:'厂商编号',columnWidth:80},
		{ name: 'cglbmc',header:'厂商类别' ,columnWidth:80},
		{ name: 'csjc',header:'厂商简称',columnWidth:80 },
		{ name: 'csmc' ,header:'厂商名称',columnWidth:160},
		{ name: 'wbbh' ,hidden:true},
		{ name:'ztdw',hidden:true},
		{ name:'lxrm',hidden:true},
		{ name: 'wbmc' ,header:'外币名称',columnWidth:80},
		{ name: 'cglb' ,header:'采购类别',columnWidth:80}
	]
});
