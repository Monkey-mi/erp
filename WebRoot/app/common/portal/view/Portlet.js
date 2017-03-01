Ext.define('erp.common.portal.view.Portlet', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.portlet',
    layout: 'fit',
    anchor: '100%',
    frame:false,
    /*closable: true,*/
    /*collapsible: true,
    animCollapse: true,*/
    draggable: {
        moveOnDrag: false    
    },
    cls: 'x-portlet',
    //默认页行数
    pageSize: 5,
    //默认行高度
    lineHeight: 30,
    //默认双击状态
    dblStatus: 0,
    // Override Panel's default doClose to provide a custom fade out effect
    // when a portlet is removed from the portal
//    doClose: function() {
//        if (!this.closing) {
//            this.closing = true;
//            this.el.animate({
//                opacity: 0,
//                callback: function(){
//                    this.fireEvent('close', this);
//                    this[this.closeAction]();
//                },
//                scope: this
//            });
//        }
//    },
    
    constructor: function(){
    	var me = this;
    	this.callParent(arguments);
    	if(me.params && Ext.isString(me.params)){
    		me.params = Ext.JSON.decode(me.params);
    	}else{
    		// TODO
    	}
    
    },
    
    afterRender: function(){
    	var me = this;
    	me.callParent(arguments);
    	me.on('resize', me.onPorletResize);
    	//对应于双击磁铁放大及缩小效果
    	if(me.header){
    		me.header.el.on('dblclick', function(){
    			if(!me.collapsed){
    				if(me.dblStatus == 0){
    					me.originalHeight = me.getHeight();
    					me.setHeight(me.getHeight() * 2 + 10);
    					me.dblStatus = 1;
    				}else{
    					me.setHeight(me.originalHeight);
    					me.dblStatus = 0;
    				}
    			}
    		});
    	}
    	/*me.addEvents('pageSizeChange');*/
    	me.calcPageSize();
    },
    
    onPorletResize: function(scope, w, h, ow, oh){
    	var me = this;
    	me.calcPageSize(oh);
    	
//    	//保存配置
//		var me = this;
//		var ctrller = gp.Const.application.getController('gp.controller.Main');
//		var currentXtype = scope.xtype;
//		Ext.Ajax.request({
//			url: 'oa/OA.do?method=getPortalConfig',
//			params: {
//    			user_code: gp.Util.currentUser.loginId
//    		},
//    		success: function(response) {
//    			var obj = Ext.JSON.decode(response.responseText);
//    			var oldConfig = new String(obj.data);
//    			var colArray = oldConfig.split(';'); //每一列配置信息构成的数组
//    			var singleConfigArray = new Array(); //用于存放每个portlet信息的数组
//    			for(var i = 0; i < colArray.length; i++) {//把每个portlet信息保存到singleConfigArray数组里
//    				var singleArray = colArray[i].split(','); //每列中的单个portlet信息构成的数组
//    				for(var j = 0; j < singleArray.length; j++) {
//    					singleConfigArray.push(singleArray[j]);
//    				}			    				
//    			}
//    			var items = scope.up('workdesk').items.items;
//	    		var xtypeArray = new Array();
//	    		var config = '';
//	    		for(var i = 0; i < items.length; i++) {
//	    			xtypeArray[i] = '';
//	    			var column = items[i];
//	    			for(var j = 0; j < column.items.length - 1; j++) {
//	    				var xtype = column.items.items[j].xtype;	
//	    				xtypeArray[i] += ctrller.getConfig(xtype, singleConfigArray) + ',';
//	    			}
//	    			var xtype = column.items.items[j].xtype;
//	    			xtypeArray[i] += ctrller.getConfig(xtype, singleConfigArray);
//	    		}
//	    		for(var i = 0; i < items.length - 1; i++) {
//	    			config += xtypeArray[i] + ';';
//	    		}
//	    		config += xtypeArray[i];
//	    		//正则表达式替换
//	    		var re = new regExp(currentXtype + "(:?.*?),", "g");
//	    		config = config.replace(re, ":"+height);
//	    		Ext.Ajax.request({
//	    			url: 'oa/OA.do?method=setPortalConfig',
//	    			params: {
//	    				user_code: gp.Util.currentUser.loginId,
//	    				config: config
//	    			}
//	    		});
//    		}
//		});
	
    },
    /**
     * 根据porlet高度动态计算pagesize
     * @param h
     */
    calcPageSize: function(oh,h){
    	var me = this;
    	var h = h || me.body.getHeight();
    	var pagesize = parseInt(h / me.lineHeight) || 5;
    	if(pagesize != me.pageSize){
    		me.pageSize = pagesize;
    		me.fireEvent('pageSizeChange', me, pagesize, oh);
    	}
    }
});