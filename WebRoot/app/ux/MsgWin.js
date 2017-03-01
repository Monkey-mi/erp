/*
 * 用来显示于服务器交互信息
 */
Ext.define('erp.ux.MsgWin',{
	extend:'Ext.window.Window',
	alternateClassName: 'erp.MsgWin',
	//singleton:true,
	title : '调用服务信息',
    layout: 'fit',
    width: 550,
    buttons:[
		{
		    text: '关闭',
		    iconCls: 'page_error',
		    handler: function(btn){
		    	btn.up('window').close();
		    }
		}
    ],
    items:[
	   {
	    	xtype:'form',
	    	bodyPadding: 5,
	    	defaults: {
	    		labelAlign : 'center',
	    		xtype: 'textfield',
		    	anchor:'100%',
		    	labelWidth : 80,
		    	labelStyle : 'font-weight:bold;',
		    	layout: 'fit'		    	    
	    	},
	        items:[
	           {	
	        	    fieldLabel:'信息',
	        	    xtype:'textarea',
	        	    itemId:'msgArea',
	        	    readOnly:true,
	        	    height: 300,
	        	    name:'msg',
	        	   	value:''
	           }
	        ]
	   }
	],
	addMsg:function(msg){
		var msgArea = this.down('#msgArea');
		msgArea.setValue(msgArea.getValue()+'\r\n'+msg);
	}
});