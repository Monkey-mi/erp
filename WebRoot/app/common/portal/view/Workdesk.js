Ext.define('erp.common.portal.view.Workdesk',{
	extend: 'erp.common.portal.view.PortalPanel',
	alias: 'widget.workdesk',
	requires : [    
	        'erp.common.portal.view.PortalPanel'
            ,'erp.bi.view.CustomQueryPortlet'
	],
	//最小宽度
	minWidth: 1180,
	// 修改背景图
	baseCls:'x-plain',
    // style : 'style="background-image:url(resources/images/index_bg.jpg);
	// background-repeat:repeat;"',
   /* style :{
    	background: 'url(resources/images/index_bg.jpg) repeat'
    },*/
	initComponent:function(){    	
    	var me = this;
    	if(erp.Util.currentUser.loginId) {
    		//这里可以改造成根据配置完全动态加载的工作台
    		var items = me.getItemsByConfig(me.config);
    		
    		Ext.apply(me, {
    			items: items
    		}); 	
    		me.callParent();
    	}
    	
    },
    getPortlet1:function(pc_id,user_code,portlet_type,row,col,params){
    	var me = this;
    	
    	if(typeof(portlet_type) == 'string'){
    		var config = portlet_type.split(':');
    		return {
    			xtype: config[0] || 'portlet',
    			columnNumber: col,
    			rowNumber: row,
    			pc_id:pc_id,
    			user_code:user_code,
    			params:params,
    			height: config.length > 1 ? parseInt(config[1]) : (me.initHeight ? (me.initHeight - 10*4) / 3 : 225), //假设10是panel间距
				resizable: {
					handles: 's'
				}
    		};    		
    	} else {
    		return {
    			xtype: 'portlet',
    			columnNumber: col,
    			rowNumber: row,
    			pc_id:pc_id,
    			user_code:user_code,
    			params:params,
    			height: (me.initHeight - 10*4) / 3, //假设10是panel间距
				resizable: {
					handles: 's'
				}
    		}
    	}
    },
    getPortlet: function(xtype, column, row) {
    	var me = this;
    	if(typeof(xtype) == 'string'){
    		var config = xtype.split(':');
    		return {
    			xtype: config[0] || 'portlet',
    			columnNumber: column,
    			rowNumber: row,
    			height: config.length > 1 ? parseInt(config[1]) : (me.initHeight ? (me.initHeight - 10*4) / 3 : 225), //假设10是panel间距
				resizable: {
					handles: 's'
				}
    		};    		
    	} else {
    		return {
    			xtype: 'portlet',
    			columnNumber: column,
    			rowNumber: row,
    			height: (me.initHeight - 10*4) / 3, //假设10是panel间距
				resizable: {
					handles: 's'
				}
    		};
    	}
    },
    resetWorkdesk: function(config) {        	
    	var me = this;
    	me.removeAll();
    	var items = me.getItemsByConfig(config);
    	me.add(items);
    	//更新workdesk的config
    	me.updateConfig(config);
    },
    insertPortlet: function(pc_id,user_code,portlet_type,params, column, row) {
    	var me = this;
    	var portlet = me.getPortlet1(pc_id,user_code,portlet_type,row,column,params);
    	var columnCmp = me.items.items[column];
    	columnCmp.insert(row, portlet);
    },
    removePortlet: function(column, row) {
    	var me = this;
    	var columnCmp = me.items.items[column];
    	columnCmp.remove(row);
    },
    getItemsByConfig: function(config){
    	var me=this;
    	var items=new Array();
    	var portletArray=config;
    	var array=new Array();
    	var tempCol;
    	var portletClasses =[];
    	for(var i=0;i<3;i++){
    		tempCol=i;
    		array[i]=new Array();
    		for(var k=0;k<portletArray.length;k++){
    		   //取每个config数组对应的Json对象的详细信息
    		   var pc_id,user_code,portlet_class,portlet_type,row,col,params;
    		   if(portletArray[k].col==tempCol){
    		      pc_id=portletArray[k].pc_id;
    		      user_code=portletArray[k].user_code;
    		      portlet_class=portletArray[k].portlet_class;
    		      portlet_type=portletArray[k].portlet_type;
    		      row=portletArray[k].row;
    		      col=portletArray[k].col;
    		      params=portletArray[k].params;
    		      portletClasses.push(portlet_class);
    		      var portlet=me.getPortlet1(pc_id,user_code,portlet_type,row,col,params);
    		      array[i].push(portlet);
    		   }
    	    }
    	    items.push({
    	    	id:'col'+i,
    	    	items:array[i]
    	    });
    	}
    	return items;
    },
    updateConfig: function(config) {
    	var me = this;
    	me.config = config;
    }
});