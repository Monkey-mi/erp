Ext.define('erp.companyQuot.view.QuotFileUpload',{
	extend:'erp.ux.Window',
	alias : 'widget.QuotFileUpload',
	title:'文件上传',
	modal:true,
	width: 600,
	initComponent:function(){
		var me=this;
		
		Ext.apply(me,{
			layout:{
		     type: 'vbox',//垂直分布
		     pack: 'start',
		     align: 'stretch'
    	},
    	defaults:{padding:5},//默认样式
				items:[{
					xtype:'form',
					itemId:'attchedform',
			        width: 400,
			        bodyPadding: 10,
			        items: [{
			            xtype: 'filefield',
			            name : 'fileName',//不得修改,不然后台 空
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
                            }/*, {  
                              html : '2、支持以下格式的:png,jpg,xls'  
                            }*/]  
			        }],
			        buttons : [ '->', {  
                            text : '保存',  
                            glyph:0xf0c7,
                            itemId:'btn_save',
                            handler:function(){
                            	var form=me.down('#attchedform');
                                //获取文件名
                            	var wjmc = form.down('#file').getValue();
                            	var sum = 0;
			                   for ( var i = 0; i < wjmc.length; i++) {
			                       var c = wjmc.charCodeAt(i);
			                    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
			                      sum++;
			                   } else {
			                     sum += 2;
			                   }
			                   }
				                if(sum>40){
				                   Ext.Msg.alert('提示','文件名称超过指定长度40个字符！(汉字算2个)');
				                return;
				                }
                            	if (wjmc.length>20){
                            	   Ext.Msg.alert("提示","文件名称超过指定长度40个字符！");
				                   return;
                            	}
                            	/*var fileStore = Ext.create('erp.companyQuot.store.CompanyQuotFile');*/
                            	 if (form.isValid()) {
                            	form.submit({
				                    url : 'common/uploadAttachement.action',
				                    method:'POST',
				                    timeout : 120000,
				                    params: {
				    					urlId: '/rzerp_hfpg/other/'
									},
				                    waitMsg : '正在上传文件...',
				                    success : function(form, action) {
				                    	//TODO:新增记录
				                    	/*if(!Ext.isEmpty(action.result.msg)){
				                    		Ext.Msg.alert("提示", action.result.msg);
				                    		return;
				                    	}
				                    	if(action.result.file_path.length>60){
				                    	    Ext.Msg.alert("提示","文件路径超过指定长度60个字符！");
				                            return;
				                    	}*/
				                    	Ext.Msg.alert('提示', action.result.msg);
				                    	var wjbh = me.fileStore.max('wjbh') == null ? 1 : me.fileStore.max('wjbh') + 1;;
				                    	var url  = action.result.data;
				                    	sum = 0;
			                            for ( var i = 0; i < url.length; i++) {
			                               var c = url.charCodeAt(i);
			                            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
			                                sum++;
			                            } else {
			                                 sum += 2;
			                            }
			                            }
				                        if(sum>60){
				                            Ext.Msg.alert('提示','文件路径超过指定长度60个字符！(汉字算2个),请删减文件名长度');
				                         return;
				                        }
				                    	if(url!=null){
				                    	/*var src = 'ftp://'+tp_ftpUrl+url;*/
				                    	me.newrec.set('bjdh',me.bjdh);
				                    	me.newrec.set('wjbh',wjbh);
				                    	me.newrec.set('wjmc',wjmc);
				                    	me.newrec.set('wjlj',url);
				                    	me.newrec.set('cjrm',erp.Util.currentUser.userInfo.name);
				                    	me.newrec.set('cjrq',new Date());
				                    	me.newrec.phantom =true;
				                    	me.fileStore.add(me.newrec);
				                    	/* me.fileStore.sync({
	  	         	                      success : function(){
	  	                                  me.fileStore.reload({
	  	                                        params : 
	  	                                       {
	  	                                      bjdh : me.newrec.get('bjdh')
	  	                                    }
	  	                                 });
	  	         	                  }   
	  	                           });*/
				                    	me.close();
				                    }},
				                    failure : function() {
				                        Ext.Msg.alert("提示", "文件保存失败");
				                        me.close();
				                    }
				                });
                            }
                        }}, {  
                            text : '取消',  
                            itemId:'btn_cancel',
                            glyph:0xf057,
                            handler:function(){
                            	me.close();
                            }
                        }, '->' ]  
			}]
		});
		me.callParent(arguments);
	}
});