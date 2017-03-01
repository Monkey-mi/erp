Ext.define('erp.view.master.purchaseDetail.window.UpImg',{
	extend:'erp.ux.Window',
	alias : 'widget.edt_Img_dc',
	title:'图片上传',
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
			        frame: true,
			        items: [{
			            xtype: 'filefield',
			            name: 'fileName',
			            itemId:'fileName',
			            fieldLabel: '选择图片',
			            labelWidth: 70,
			            msgTarget: 'side',
			            emptyText : '请选择图片',  
                        blankText : '图片不能为空', 
			            allowBlank: false,
			            anchor: '90%',
			            buttonText: '选择图片',
			            listeners : {  
                                change : function(view, value, eOpts) {  
                                    me.uploadImgCheck(view, value);  
                                }  
                            }  
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
                                html : '1、上传图片大小不超过10MB.'  
                            }, {  
                                html : '2、支持以下格式的:jpg,jpeg,png,gif,bmp等'  
                            } ]  
			        }],
			        buttons : [ '->', {  
                            text : '保存',  
                            action : 'btn_save',  
                            iconCls : 'save',
                            itemId:'savaPic'
                        }, {  
                            text : '取消',  
                            iconCls : 'page_error',  
                            handler : function(btn) {  
                                me.close();
                            }  
                        }, '->' ]  
			}]
		})
		me.callParent(arguments);
	},
	/** 
     * 上传文件验证 
     */  
    uploadImgCheck : function(fileObj, fileName) {  
        var scope = this;  
        // 文件类型验证  
        if (!(scope.getImgTypeCheck(scope.getImgHZ(fileName)))) {  
            Ext.Msg.alert('提示','上传文件类型有误！');  
            fileObj.reset();// 清空上传内容  
            return;  
        }  
    },
    /***
     * 获取文件名
     */
  	getfileName:function(){
  		return this.down('#fileName').getValue();
  	},
    /** 
     * 获取文件后缀(小写) 
     */  
    getImgHZ : function(imgName) {  
        // 后缀  
        var hz = '';  
        // 文件名称中最后一个.的位置  
        var index = imgName.lastIndexOf('.');  
        if (index != -1) {  
            // 后缀转成小写  
            hz = imgName.substr(index + 1).toLowerCase();  
        }  
        return hz;  
    },  
  
    /** 
     *	文件类型验证 
     */  
    getImgTypeCheck : function(hz) {  
        var typestr = 'jpg,jpeg,png,gif,bmp';  
        var types = typestr.split(',');// 图片类型  
        for (var i = 0; i < types.length; i++) {  
            if (hz == types[i]) {  
                return true;  
            }  
        }  
        return false;  
    },  
    /** 
     * 上传文件 
     */  
    saveUploadFile : function(southTab) {  
       var me=this;
       var form = me.down('#frm_file').getForm();
                if (form.isValid()) {
                    form.submit({
                        url : 'common/uploadAttachement.action',
                        method:'POST',
                        timeout : 60000,
                        params: {
        					urlId: '/rzerp_hfpg/other/'//存储目录
    					},
                        waitMsg : '正在上传您的文件，请耐心等候...',
                        success : function(form, action) {
                        	Ext.Msg.alert('提示', action.result.msg);
                        	var url=action.result.data;
                        	if(url!=null){
	                        	var grid =southTab.down('#pro_grid1');
	                        	var store =grid.getStore();
	                        	var rec=grid.getSelectionModel().getSelection()[0];//选择打样产品
	                        	rec.set('dytp',url);
	                        	me.close();
//                        	store.update(rec);
//                        	store.sync();
                        	}
                        },
                        failure : function() {
                            Ext.Msg.alert("提示", "图片上传失败！");
                        }
                    });
                }
    }
});