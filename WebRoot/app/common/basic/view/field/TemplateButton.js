Ext.define('erp.common.basic.view.field.TemplateButton',{
	extend:'Ext.container.Container',
	alias:'widget.btn_Template',
	requires:['erp.common.basic.view.TemplateHelp'],
	winParam:{},
	targetId:'',
	layout:'fit',
	fieldConfig:{},
	minWidth:80,
	value:'mbnr',
	initComponent: function() {
		var btn=this.createButton();
		this.addEvents('setTargetValue')
		Ext.apply(this,{items:btn});
		this.callParent(arguments);
		this.on('setTargetValue',function(value){
			var panel=this.up('panel')||this.up('formpanel');
			var ctl=panel.down('#'+this.targetId)
			ctl.setValue(value);
		});
	},
createButton:function(){
  var me=this;
  var btn=Ext.widget('button',{
  	text:'模板维护',
  	iconCls:'template',listeners:{
				click:function(){
					callback=function(value,target){
		    					me.fireEvent('setTargetValue',value);
		    				};
		    				var win=Ext.widget('tpl_help',{winParam:me.winParam});
		    				win.initWindow(callback, me.value, me.targetId);
		    				win.show();
		}}
  });
  Ext.apply(btn,this.fieldConfig);
	return btn;
}
});