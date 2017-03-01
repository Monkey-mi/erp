Ext.define('erp.view.master.purchaseDetail.model.MainUnit', {
	extend: 'Ext.data.Model',
	idProperty: 'ztbh',
	fields: [
		{ name:'tablename',defaultValue:'ztdwb'}, //表名  主体单位表
		{ name: 'ztbh' },
		{ name: 'ztjc' },
		{ name: 'ztmc' },
		{ name: 'ztmc_eng' },
		{ name: 'lxdz' },
		{ name: 'lxdz_eng' },
		{ name: 'lxrm' },
		{ name: 'dhhm' },
		{ name: 'czhm' },
		{ name: 'hgdm' },
		{ name: 'jnhyd' },
		{ name: 'wtlx' },
		{ name: 'ofad' },
		{ name: 'mrbj' },
		{ name: 'gdbj',type:'int'}
	]
});
