/**
 * 折叠式(accordion)菜单，样式可以自己用css进行美化
 */
Ext.define('erp.view.main.menu.AccordionMainMenu', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.mainmenuaccordion',
			layout : {
				type : 'accordion',
				animate : true
			},
			requires :[
				'erp.setup.store.ModuleTrees'
	        ],
			initComponent : function() {
				var me=this;
				this.items=[];
				var menus = this.up('app-main').getViewModel().get('systemMenu');
               for (var i in menus) {  
                    var menugroup = menus[i];  
                    var accpanel = {  
                        menuAccordion : true,  
                        xtype : 'panel',  
                        title : menugroup.text,  
                        bodyStyle : {  
                            padding : '10px'  
                        },  
                        layout : 'fit',  
                        dockedItems : [{  
                                    dock : 'left',  
                                    xtype : 'toolbar',  
                                    items : []  
                                }],  
                       iconCls : menugroup.iconCls
                    };  
                    
                    getSubMenu=function(menus){
                    	for( var j in menus)
                    	{
                    		var submenu=menus[j];
                    		if(submenu){
	                    		var obj={  
	                                    xtype : 'buttontransparent',  
	                                    moduleId:submenu.id,
	                                    text :me.addSpace(submenu.text, 12),  
	                                    tooltip:submenu.qtip,
	                                    iconCls : submenu.iconCls,  
	                                    handler : 'onModTreeClicked',
	                                    rec:submenu
	                             };
	                             if(submenu.subItem)   
	                             	getSubMenu(submenu.subItem);
	                             else	
	                           		accpanel.dockedItems[0].items.push(obj);
                    		}
                    	}
                    }
                  	getSubMenu(menugroup.subItem);
                    this.items.push(accpanel);  
                }  
				this.callParent(arguments);
				//me.loadTotalModuleTree(this);
			},
			addSpace : function(text, len) {
				var result = text;
				for (var i = text.length; i < len; i++) {
					result += '　';
				}
				return result;
			},
			//导入菜单树
		    loadTotalModuleTree : function(cmp) {
				var menus = this.up('app-main').getViewModel().get('systemMenu');
				for (var i in menus) {
					var menugroup = menus[i];
					var accpanel = {
						title : menugroup.text,
						layout : "fit",
						xtype : "panel",
						items : [{
							xtype : "treepanel",
							border : false,
							collapsed : false,
							listeners : {
								itemclick : 'onModTreeClicked'
							},
							store : Ext.create("erp.setup.store.ModuleTrees", {
										proxy : {
											type : "ajax",
											actionMethods : {
												"read" : "post"
											},
											extraParams : {
												u_id : erp.Util.currentUser.u_id
											},
											url : "main/Modules.do?method=getModuleWithParent",
											reader : {
												type : "json",
												rootProperty : "data",
												messageProperty : "message"
											}
										},
										root : {
											id : menus[i].id,
											expanded : true,
											leaf : false
										}
									}),
							rootVisible : false
						}]
					}
					cmp.add(accpanel);
				}
	}
})