Ext.define('erp.ux.UploadInsertExcelWin',{
	extend:'erp.ux.Window',
	alias:'widget.imp_InsertByExcel',
	glyph:0xf1c3,
	title:'Excel上传新增',
	width:500,
	initComponent:function(){
		var me=this;
		Ext.apply(this,{
			bodyPadding:5,
			items:[{
				xtype:'form',
				items:[{
					xtype:'filefield',
					fieldLabel:'请选择上传文件',
					name:'uploadFile',
					allowBlank: false,
					anchor: '100%',
					emptyText:'请选择Excel文件格式上传.',
	        		buttonText: '浏览'
				},{
						xtype : 'fieldset',
						title:'上传须知',
				        defaultType: 'displayfield',
				        padding:5,
				        defaults: {anchor: '100%',padding:'5 0 0 20'},
				        layout: 'anchor',
				        items:[
				        	{value:'1.请选择一个小于10M的文件;'},
				        	{value:'2.此窗口用于将下载的新增Excel表格填制好新增的记录后，上传导入新增;'},
				        	{value : Ext.String.format(
								'3.下载用于新增记录的Excel文件－＞<a href="module/DownloadInsertExcelRecord.do?imp_id={0}'
										+ ' " >【请点击此处】</a>;', this.imp_id)}
				        ]
					}]
			}],
			buttons:[{text:'上传',glyph:0xf093,handler:function(btn){
				var win=this.up('window');
		            var form = win.down('form').getForm();
		            if(form.isValid()){
		            	var fn = form.findField('uploadFile').getValue();
		            	var pos = fn.lastIndexOf(".");
						var lastname = fn.substring(pos, fn.length);
						// 上传的文件名统一为c:\fadepath\文件名.xls
						if (lastname != '.xls') {
							Ext.MessageBox.show({
										title : '选择文件错误',
										msg : '上传的文件格式错误,请选择【xls】的文件格式上传!',
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
							return;
						}
						var params={};
						params['imp_id']=me.imp_id;
						params[erp.Const.USE_UPLOAD]='true';
		                form.submit({
		                	 url:'main/uploadExcelInsertRecord.do',
		                     params: params,
		                    waitMsg: '文件正在上传,请稍后...',
		                    success: function(fp, o) {
		                        Ext.Msg.alert('提示', o.result[erp.Const.AJAX_SERVICE_MESSAGE] );
		                       	win.close();
		                       	me.store.reload();
		                    },
		                    failure: function(form, action) {
//                        		Ext.Msg.alert('提示', action.result ? action.result.message : 'No response');
                    		}
		                });
		            }
				
				
			}},
			{text:'关闭',glyph:0xf057,
	 		    action:'ACT_CLOSE',
	 		    handler:function(){this.up('window').close();}}
			]
		});
		this.callParent();
	}
})