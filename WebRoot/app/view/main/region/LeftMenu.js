Ext.define('erp.view.main.region.LeftMenu',{
	extend:'Ext.panel.Panel',
	uses:['erp.view.main.menu.AccordionMainMenu'],
	alias:'widget.LeftMenu',
	layout:'fit',
	title:'导航菜单',
	glyph : 0xf0c9,
	collapsible:true,
	tools : [{
					itemId : 'up',
					type : 'up',
					tooltip : '在上面显示菜单条',
					handler : 'showMainMenuToolbar'
					},
			 {
					itemId : 'refresh',
					type : 'refresh',
					tooltip : '刷新菜单',
					hidden:true,
					handler : 'refreshMenuToolbar'
					}		
					],
	initComponent : function() {
		var me=this;
		Ext.apply(me,{
			items:[{xtype:'mainmenuaccordion'}]
		});
		me.callParent();
	}
});