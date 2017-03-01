Ext.define('erp.master.purchaseCost.view.UpPurchaseCostFile',{
	extend:'erp.ux.Window',
	alias : 'widget.UpPurchaseCostFile',
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
                                html : '1、上传文件大小不超过3MB.'  
                            }]  
			        }],
			        buttons : [ '->', {  
                            text : '保存',  
                            glyph:0xf0c7,
                            itemId:'btn_save',
                            handler:function(){
                            	var form=me.down('#attchedform');
                            	//获取文件名
                            	var wjmc = form.down('#file').getValue();
                            	console.log(wjmc)
                            	if (wjmc.length>40){
                            	   Ext.Msg.alert("提示","文件名称超过指定长度40个字符！");
				                   return;
                            	}
                            	var fileStore = Ext.create('erp.master.purchaseCost.store.purchaseCostDetial');
                            	 if (form.isValid()) {
                            	form.submit({
				                    url : 'common/uploadAttachement.action',
                                    method:'POST',
                                    timeout : 60000,
				                    params: {
				    					urlId: '/rzerp_hfpg/other/'
									},
				                    waitMsg : '正在上传您的文件，请耐心等候...',
				                    success : function(form, action) {
				                    	//TODO:新增记录
				                    	console.log('a')
				                    	Ext.Msg.alert('提示', action.result.msg);
				                    	console.log(action.result.data)
				                    	var url  = action.result.data;
				                    	if(url!=null){
				                    	me.newrec.set('fydh',me.fydh);
				                    	me.newrec.set('wjbh',me.wjbh);
				                    	me.newrec.set('wjmc',wjmc);
				                    	me.newrec.set('wjlj',url);
				                    	me.newrec.set('wjrq',new Date());
				                    	me.newrec.set('cjrm',erp.Util.currentUser.userInfo.name);
				                    	me.newrec.phantom =true;
				                    	fileStore.add(me.newrec);
				                    	 fileStore.sync({
	  	         	                      success : function(){
	  	                                  fileStore.reload({
	  	                                        params : 
	  	                                       {
	  	                                     fydh : me.newrec.get('fydh')
	  	                                    }
	  	                                 });
	  	         	                  }   
	  	                           });
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