Ext.define('erp.view.main.region.Center',{
	extend:'Ext.tab.Panel',
	alias:'widget.MainCenter',
	requires:['erp.bi.view.CustomQueryPortlet',
			  'erp.common.portal.view.PortalPanel'],
	closeAction : 'hide',
	autoDestroy : false,
	tabPosition : 'top',
	plugins : [{
		ptype : 'tabclosemenu',
		closeAllTabsText : '关闭所有',
		closeOthersTabsText : '关闭其他',
		closeTabText : '关闭',
		extraItemsTail : ['-', {
					text : '可关闭',
					itemId : 'canclose',
					checked : true,
					hideOnClick : false,
					handler : function(item) {
						item.ownerCt.tabPanel.tab.setClosable(item.checked);
					}
				}],
		listeners : {
			beforemenu : function(menu, tabPanel) {
				// 此插件有bug,需要加入这个参数
				menu.tabPanel = tabPanel;
				if (tabPanel.tab.reorderable) {
					menu.down('#canclose').setChecked(tabPanel.tab.closable);
					menu.down('#canclose').enable();
				} else {
					menu.down('#canclose').setChecked(false);
					menu.down('#canclose').disable();
				}
			}
		}
	}, Ext.create('Ext.ux.TabReorderer')],
	listeners:{'beforetabchange':'onBeforeTabChange',
		'tabchange':'onAfterTabChange'
	},
	initComponent:function(){

		var me = this;		
		Ext.apply(me,{ 
	        id: 'content-panel',
	        split:true,
	        activeTab: 0, 
	        border: false,
	        items:[{title : '首页',
            		glyph : 0xf015,
            		id: 'desktop', 
			        border: false,
			        xtype:'container',
			       	layout:'fit',
			        items:[{xtype:'portalpanel',
			  			 	layout:{ 
			        		 	type: 'hbox',
			        		 	align:'stretch',
                			 	padding: '0 5 5 5'
                			},
			         items:[{
                        id: 'col-1',
                        items: [{
            			xtype:'customQueryPortlet',height:550	
            			}]
			        }]
            		}]
            	 }]
	    }); 
		/*this.items = [{title: '首页',
	            			glyph : 0xf015}]*/
		this.callParent()
	}
});