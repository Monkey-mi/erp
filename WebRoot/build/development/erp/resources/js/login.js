Ext.Loader.setConfig({
    enabled: true,
    paths: {'erp':'app'}  //指定命名空间的实际目录,要和上面的name、appFolder对应
});
Ext.require(['erp.def.Const'
             ,'erp.def.ui.ErrorWin']);
Ext.onReady(function(){
	Ext.require(['erp.view.user.LoginForm']);
	Ext.onReady(function(){
		Ext.Ajax.on('requestexception',erp.Const.onAjaxResponse);
		Ext.Ajax.on('requestcomplete',erp.Const.onAjaxResponse);
		Ext.tip.QuickTipManager.init();
		Ext.widget('frm_login',{renderTo:'login_form'});
	});
	
});
