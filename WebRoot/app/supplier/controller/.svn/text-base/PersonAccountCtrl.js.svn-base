Ext.define('erp.supplier.controller.PersonAccountCtrl', {
	extend : 'Ext.app.Controller',
	requires : [
				'erp.ux.PagingBar',
				'erp.ux.RemoteValidator',
				'erp.ux.ButtonTransparent'
				],
	views : [
				'erp.supplier.view.PersonAccountView'
			],
	refs : [
			{ref : 'personAccountView',selector : 'personAccountView'}
			
	],

	init : function() {
		// controller只初始化一次
		var me = this;
		if (me.isInited){
			return;
		}
		me.control({
			'personAccountView  #sub_menu_panel button':{
				click:function(btn){
					var itemId=btn.itemId;
					var second_mod_code=itemId.substring(4,itemId.length);
					
					var mainview=me.getPersonAccountView();
					var moduleArray=mainview.moduleArray;
					var middleView=mainview.down('#middleView');
					if(moduleArray.length>0){
						var modRec; 
						for (var i=0;i<moduleArray.length;i++) {
							if(moduleArray[i].mod_code==second_mod_code){
								modRec = Ext.create('erp.module.model.Module',moduleArray[i]);
								break;
							}
						}
						erp.Util.loadModuleMC(modRec,middleView);
					}
				}
			},
			'personAccountView  #sub_menu_panel_2 button':{
				click:function(btn){
					var itemId=btn.itemId;
					var mainview=me.getPersonAccountView();
					var moduleArray=mainview.moduleArray;
					var middleView=mainview.down('#middleView');
					if(moduleArray.length>0){
						var modRec; 
						for (var i=0;i<moduleArray.length;i++) {
							if(moduleArray[i].mod_code=='100012'){
								modRec = Ext.create('erp.module.model.Module',moduleArray[i]);
								break;
							}
						}
						erp.Util.loadModuleMC(modRec,middleView);
						
						var to_itemId=itemId.substring(5,itemId.length);
						//上级组件(容器)必须可以，并配置scrollable :true,
						var suppliermiddleView=mainview.down('#suppliermiddleView');//上级组件(容器)
						if(suppliermiddleView){
							var panel=suppliermiddleView.down('#'+to_itemId);//目标组件(要移动到的位置)
						
							if(panel){
								var x=panel.getLocalX();//在上级组件的X位置
								var y=panel.getLocalY();//在上级组件的Y位置
								suppliermiddleView.scrollTo(x,y,true);//上级组件滚动条移动到指定坐标
							}
						}
						
					}
				}
			}
		});
		// controller初始化完成
		this.isInited = true;
	}
});