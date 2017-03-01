Ext.define('tp.common.ErrorWin',{
	extend:'Ext.window.Window',
	alternateClassName: 'tp.ErrorWin',
	singleton:true,
	title : '调用服务出错',
    layout: 'fit',
    width: 550,
    closeAction:'hide',
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
		    	labelStyle : 'font-weight:bold;color:red',
		    	layout: 'fit'		    	    
	    	},
	        items:[
	           {
	        	   	fieldLabel:'HTTP状态',
	        	   	readOnly:true,
	        	   	name:'response_status'
	           },
	           {
	        	   	fieldLabel:'请求地址',
	        	   	readOnly:true,
	        	   	name:'request_url'
	           },
	           {	
	        	    fieldLabel:'错误信息',
	        	    xtype:'htmleditor',
	        	    readOnly:true,
	        	    height: 300,
	        	    name:'response_text',
	        	   	value:'显示一些错误信息!'
	           }
	        ]
	   }
	],

	showError:function(errObj){
		if(errObj){
			this.down('form').getForm().setValues({
				response_status  :errObj.responseStatus,
				request_url : errObj.requestUrl ,
				response_text : errObj.responseText
			});
		}
		tp.ErrorWin.doLayout();
		tp.ErrorWin.show();
	}
});