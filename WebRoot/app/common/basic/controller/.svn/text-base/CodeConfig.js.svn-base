/**
 * 基础数据配置控制器
 */
Ext.define('erp.common.basic.controller.CodeConfig',{
	extend:'Ext.app.Controller',
	views:['erp.common.basic.view.MngCodeConfig',
	       'erp.common.basic.view.EditCodeConfig'],
	refs:[{ref:'CodeConfig',selector:'mng_codeconfig'},
	      {ref:'CodeConfigGrid',selector:'mng_codeconfig grid'}],
	init:function(){
		var me=this;
		if(this.isinited)
			return;
		this.control({
			"mng_codeconfig":{
				afterrender:function(cmp){
					this.CodeConfig=this.getCodeConfig()
					this.CodeConfigGrid=this.getCodeConfigGrid();
					this.CodeConfigStore=this.CodeConfigGrid.getStore();
					this.CodeConfigStore.load();
				}
			},
			"mng_codeconfig grid":{
				itemdblclick:me.dbClick
			},
			"mng_codeconfig button":{
				click:me.BtnClick
			},
			"edt_codeconfig button":{
				click:me.EditBtnClick
			}
		});
		this.isinited=true;
	},
	BtnClick:function(btn){
		var me=this;
		switch(btn.itemId){
		case erp.Const.FUNC_ITEMID_BTN_ADD:
			me.CodeConfig.addCodeConfig();
			break;
		case erp.Const.FUNC_ITEMID_BTN_EDT:
			me.CodeConfig.updateCodeConfig();
			break;
		case erp.Const.FUNC_ITEMID_BTN_DEL:
			me.CodeConfig.deleteCodeConfig();
			break;
		case erp.Const.FUNC_ITEMID_BTN_REFRESH:
			me.CodeConfigStore.load();
			break;
		}
	},
	EditBtnClick:function(btn){
		var me=this;
		var window=btn.up('window');
		 switch(btn.action){
		 case "ACT_SAVE":
			 window.SaveCodeConfig();
			 break;
		 case "ACT_CLOSE":
			 window.close();
			 break;
		 }
	},
	dbClick:function(){
		var me=this;
		this.CodeConfig.updateCodeConfig();
	}
});