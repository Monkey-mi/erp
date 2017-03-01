/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('erp.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'erp.view.main.MainController',
        'erp.view.main.MainModel',
        'erp.view.main.region.Top',
        'erp.view.main.menu.MainMenuToolbar',
        'erp.view.main.region.LeftMenu',
        'erp.view.main.region.Center',
        'erp.view.main.region.bottom',
        'Ext.ux.TabCloseMenu'
    ],

    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [{
    		xtype:'MainTop',
    		region:'north'
    	},
    	{
    		xtype:'mainmenutoolbar',
    		region:'north',
    		hidden : false,
    		bind:{
    			hidden:'{!isToolbarMenu}'
    		}
    	},{
        xtype:'LeftMenu',
        region: 'west',
        width: 180,
        split:true,
        hidden : true,
        bind:{
        	hidden:'{!isTreeMenu}'
        }
    },{
        region: 'center',
        xtype: 'MainCenter'
    },{xtype:'MainBottom',region:'south',hidden:true}],
    listeners : {
				resize : function(container) {
					container.getController().onMainResize();
				}
    },
    initComponent : function() {  
	    Ext.setGlyphFontFamily('FontAwesome'); 
	    this.callParent();  
	}
});
