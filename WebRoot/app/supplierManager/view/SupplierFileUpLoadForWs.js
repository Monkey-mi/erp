Ext.define('erp.supplierManager.view.SupplierFileUpLoadForWs',{
	extend:'erp.ux.Window',
	alias:'widget.supplierFileUpLoadForWs',
	title:'文件上传',
	modal:true,
	width: 500,
	
	initComponent:function(){
		var me=this;
		Ext.apply(me,{
			//iconCls:'page_edit',
    		layout:{
		     type: 'vbox',
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
			            name: 'file',
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
			        	fieldLabel: '备注说明',
			        	labelWidth: 70,
			        	anchor: '90%',
			        	xtype:'textarea',
			        	name: 'bzsm',
			            itemId:'bzsm'
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