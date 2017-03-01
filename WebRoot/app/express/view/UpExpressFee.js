Ext.define('erp.express.view.UpExpressFee',{
	extend:'erp.ux.Window',
	alias : 'widget.upExpressfee',
	title:'导入快递费用',
	modal:true,
	width: 600,
	initComponent:function(){
		var me=this;
		Ext.apply(me,{
			//iconCls:'page_edit',
    		layout:{
		     type: 'vbox',//垂直分布
		     pack: 'start',
		     align: 'stretch'
    	},
    	defaults:{padding:5},//默认样式
				items:[{
					xtype:'form',
					itemId:'frm_file',
			        width: 400,
			        bodyPadding: 10,
			        items: [{
			            xtype: 'filefield',
			            name : 'file',//不得修改,不然后台 空
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
                                html : '1、上传文件大小不超过10MB.'  
                            }, {  
                                html : '2、第一二列文本,日期2016-10-24,第三四列常规' 
                            }, {  
                                html : '3、支持以下格式的:xls,xlsx'  
                            }, {  
                                html : '4、不允许包含公式等其他数据,否则上传解析可能失败'  
                            } , {  
                                html : '5、解决常见的上传失败：新建excel->复制->选择性粘贴->数值->保存->上传新excel'  
                            } ]  
			        }],
			        buttons : [ '->', {  
                            text : '保存',  
                            iconCls : 'save',
                            itemId:'btn_save'
                        }, {  
                            text : '取消',  
                            itemId:'btn_cancel',
                            iconCls : 'page_error',
                            handler:function(){
                            	me.close();
                            }
                        }, '->' ]  
			}]
		})
		me.callParent(arguments);
	}
});