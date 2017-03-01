/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('erp.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
	requires:['erp.util.Util'],
    alias: 'viewmodel.main',
	constructor:function(){
		var me=this;
		//获取模块相关信息
		
		this.callParent(arguments);
		Ext.apply(me.data,erp.Util.SysEnv);
	},
    data: {
    	system_info:{
    		name:'<font color = "#333333">供应商管理系统</font>',
    		btn_account:{
    			title:'账户管理',
    			tooltip:''
    		},
    		btn_help:{
    			title:'帮助',
    			tooltip:''
    		},
    		btn_logout:{
    			title:'注销',
    			tooltip:''
    		}
    	}
    },

    //TODO - add data, formulas and/or methods to support your view
    
    formulas : {
				isButtonMenu : function(get) {
					return get('menuType.value') == 'button';
				},
				isToolbarMenu : function(get) {
					return get('menuType.value') == 'toolbar';
				},
				isTreeMenu : function(get) {
					return get('menuType.value') == 'tree';
				}

			},
    getModuleDefine : function(moduleId) {
				var result = null;
				var exp=moduleId;
				if(Ext.typeOf(moduleId)=="string")
					 exp=Ext.String.trim(moduleId);
			    var findMenu=function(menus,exp){
			    	var result=null;
			    	for(var i in menus)
			    	{
			    		var menu=menus[i];
			    		if(menu.m_id==exp)
			    			result= menu;
			    		else if(menu.subItem&&menu.subItem.length>0)
			    			result=findMenu(menu.subItem,exp);
			    		if(result)
			    			break;
			    	}
			    	return result;
			    }		 
				
				result=findMenu(this.get('systemMenu'),exp);
				return result;
			},
    
    getMenus:function(){
    	var items, me = this;
    	userMenu=this.get('systemMenu');
    	makeMenu=function(allMenus) {
    		var items=[];
    		Ext.Array.each(allMenus,function(item){
    			if(item.add_separator=="true")
    				items.push('-');
    			if(item.leaf=="true")
    				return items.push({
							mainmenu : 'true',
							moduleId:item.id,
							moduleName : item.text,
							text : item.text,
							tooltip:item.qtip,
							icon : item.icon,
							iconCls :item.iconCls,
							rec:item,
							handler :'onModTreeClicked' // MainController中的事件处理程序
						});
    			else
    				items.push({
	    				text : item.text,
	    				icon : item.icon,
						iconCls :item.iconCls,
	    				glyph : parseInt(item.icon_cls),
						icon : item.icon_path,
	    				menu:makeMenu(item.subItem)})
    		});	
    		return items;
    	}
    	items=makeMenu(userMenu);
		return items;
    }
});