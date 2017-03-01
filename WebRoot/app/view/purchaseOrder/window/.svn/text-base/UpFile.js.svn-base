Ext.define('erp.view.purchaseOrder.window.UpFile',{
	extend:'erp.ux.Window',
	alias : 'widget.edtpurchaseOrder_File',
	title:'文件上传',
	//iconCls:'picture--plus',
	modal:true,
	width: 600,
	initComponent:function(){
		var me=this;
		Ext.apply(me,{
			//iconCls:'page_edit',
    		layout:{
		     type: 'vbox',//垂直分布
		     pack: 'start',/*
    						start - 子组件被包在一起放在容器的左边 (默认)
    						center - 子组件被包在一起放在容器里居中
    						end - 子组件被包在一起放在容器的右边*/
		     align: 'stretch'/*
		              控制子组件在容器中的对齐方式, 此参数的有效值有以下几个:
   		     top : 默认值 各子组件在容器顶部水平对齐.
    		 middle : 各子组件在容器中间水平对齐.
   			 stretch : 各子组件的高度拉伸至与容器的高度相等.
  			  stretchmax : 各子组件的高度拉伸至与最高的子组件的高度相等.
		     */
    	},
    	defaults:{padding:5},//默认样式
				items:[{
					xtype:'form',
					itemId:'frm_file',
			        width: 400,
			        bodyPadding: 10,
			        items: [{
			            xtype: 'filefield',
			            name: 'fileName',
			            itemId:'file',
			            fieldLabel: '选择文件',
			            labelWidth: 70,
			            msgTarget: 'side',
			            emptyText : '请选择文件',  
                        blankText : '文件不能为空', 
			            allowBlank: false,
			            anchor: '90%',
			            buttonText: '选择文件'
			        },{
			        	xtype:'fieldset',
			        	title:'上传须知',
			        	layout : {  
                                type : 'table',  
                                columns : 1 
                            },  
                            collapsible : false,// 是否可折叠  
                            defaultType : 'label',// 默认的Form表单组件  
                            items : [ {  
                                html : '1、上传文件大小不超过20MB.'  
                            }, {  
                                html : '2、支持以下格式的:jpg,jpeg,png,gif,bmp,xls,word等'  
                            } ]  
			        }],
			        buttons : [ '->', {  
                            text : '保存',  
                            iconCls : 'save',
                            itemId:'btn_save'
                        }, {  
                            text : '取消',  
                            itemId:'btn_cancel',
                            iconCls : 'page_error'
//                            handler:function(){
//                            	me.close();
//                            }
                        }, '->' ]  
			}]
		})
		me.callParent(arguments);
	},
	
	/***
     * 获取文件名
     */
  	getfileName:function(){
  		return this.down('#file').getValue();
  	}
});