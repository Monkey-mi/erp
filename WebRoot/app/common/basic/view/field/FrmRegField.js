Ext.define('erp.common.basic.view.field.FrmRegField',{
	extend:'erp.common.basic.view.field.CodeField',
	alias:'widget.frmregfield',
	hideTrigger:true,
	initComponent:function(){
		var me=this;
		me.callParent(arguments);
	},
	/**
	 * 创造数据仓库
	 */
	createStore:function(){
		var me=this;
		me.store=erp.FormUtil.createStore(me.code);
		me.store.proxy.extraParams={mode:"main"};
	}
});