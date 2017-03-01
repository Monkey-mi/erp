//注册附件
Ext.define('erp.supplierManager.view.AccSupplierFileShow',{
	extend:'erp.ux.Panel',
	alias:'widget.AccSupplierFileShow',
	isAdd:false,
	isEdit:false,
	//overflowY: 'auto',
	//height:800,
	company_id:-1,
	initComponent:function(){
		var me=this;
		me.on('beforedestroy',function(panel){
	 		panel.removeAll();
	 	});
		//附件store
		me.registerAttchedStore=Ext.create('erp.supplierManager.store.AppRegisterAttched');
		me.registerAttchedStore.proxy.api.read='supplierAccess/common.srm?method=getAccAttchedOutList';
		me.customAttchedStore=Ext.create('erp.supplierManager.store.AppCustomAttched');
		me.customAttchedStore.proxy.api.read='supplierAccess/common.srm?method=getAccAttchedOutList';
		me.toBeDeleteFileArray=[];
		Ext.apply(me,{
			layout:{type:'vbox',align:'stretch'},
			items:[{
				flex:1,
				layout:{type:'hbox',align:'stretch'},
				overflowY:'auto',
				overflowX:'hidden',
				items:[{
					flex:1,
					xtype:'grid',
					itemId:'fileGrid',
					border:false,
					store:me.registerAttchedStore,
					columns:[
					{header:'序号', xtype:'rownumberer',width:45},
					{header:'文件类型',dataIndex:'type_name',width:100},
					{header:'文件名称',dataIndex:'file_name',width:100},
					{header:'格式',dataIndex:'file_format',width:50},
					{header:'必传',dataIndex:'ismust',width:40,renderer:function(value){
	   	  	  					if(value==true)
	   	  	  					{return '<img class="x-grid-checkcolumn x-grid-checkcolumn-checked" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
	   	  	  					}
	   	  	  					else
	   	  	  					{return '<img class="x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';}
	   	  	  				}},
					{header:'状态',dataIndex:'mogodb_id',width:60,
									renderer:function(v,metaData){
							            if(Ext.isEmpty(v)){
							            	return '<div style="color:red">未上传</div>';
							            }else{
							            	return '<div style="color:green">已上传</div>';
							            } 
							        }
								}
	
					,{header:'说明',dataIndex:'remark',width:100}
					,{
						header:'操作',xtype:'actioncolumn',width:60,
						items:[{
							tooltip:'下载',
							iconCls:'download',
							handler:function(grid,rowIndex,colIndex){
								var rec = grid.getStore().getAt(rowIndex);
								if(Ext.isEmpty(rec.get('mogodb_id')))
								{
									Ext.Msg.alert('提示','未上传，无法下载');return;
								}
								var src1='supplierAccess/downloadFromMongdbAttched.srm?file_path='+rec.get('mogodb_id')+'&fileName='+rec.get('file_name');
								window.open(src1, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
							}
						},{
							tooltip:'预览',
							iconCls:'application_view_list',
							handler:function(grid,rowIndex,colIndex){
								var rec = grid.getStore().getAt(rowIndex);
								var file_path=rec.get('mogodb_id');
								if(!Ext.isEmpty(file_path)){
									var suffixIndex=rec.get('file_format').lastIndexOf('.');
	                            	var suffixStr=rec.get('file_format').substring(suffixIndex+1).toLowerCase();
	                            	if(suffixStr=='bmp'||suffixStr=='jpg'||suffixStr=='jpeg'||suffixStr=='png'||suffixStr=='gif'){
	                            		me.showPic(file_path,'PIC1');
	                            	}
	                            	else{
	                            		Ext.Msg.alert('提示','当前格式不可直接预览,请通过下载方式查看');
										return;
	                            	}
								}
								else{
									Ext.Msg.alert('提示','当前还没有上传文件');
									return;
								}
							}
						}
						]
					}
				]
			},
			{
			//预览图片
				xtype:'image',
				width:600,
				itemId:'PIC1',
				border:true,
				height:'100%',
				src:'',
				style:"position:absolute;left:0;top:0;"
			}
			]
			}
			,{
				flex:1,
				hidden:true,
				layout:{type:'hbox',align:'stretch'},
				overflowY:'auto',
				items:[{
				flex:1,
				xtype:'grid',
				itemId:'customGrid',
				columns:[{header:'序号', xtype:'rownumberer',width:40},
				{header:'文件类型',dataIndex:'file_name',flex:1},
				{header:'文件名称',dataIndex:'file_name',flex:1,editor: {xtype: 'textfield',allowBlank: false},renderer:function(v,metaData){
					metaData.tdAttr='data-qtip="'+v+'"';
					return v;
				}},
				{header:'格式',dataIndex:'file_format',width:100,editor:{xtype:'combo',store:[['jpg/jpeg/png/gif/bmp','jpg/jpeg/png/gif/bmp'],['word','word'],['excel','excel'],['pdf','pdf'],['rar/zip','rar/zip']],allowBlank: false},renderer:function(v,metaData){
					metaData.tdAttr='data-qtip="'+v+'"';
					return v;
				}},
					{header:'状态',dataIndex:'file_path',width:60,
								renderer:function(v,metaData){
						            if(Ext.isEmpty(v)){
						            	return '<div style="color:red">未上传</div>';
						            }else{
						            	return '<div style="color:green">已上传</div>';
						            } 
						        }
					},
					{
					header:'操作',xtype:'actioncolumn',width:80,
					items:[{
						//预览
						
						iconCls:'download',
						tooltip:'下载',
						handler:function(grid,rowIndex,colIndex){
							var rec = grid.getStore().getAt(rowIndex);
							if(Ext.isEmpty(rec.get('file_path')))
							{
								Ext.Msg.alert('提示','未上传，无法下载');return;
							}
							
							var file_path=encodeURIComponent(encodeURIComponent(rec.get('file_path')));
							window.open('supplierAccess/downloadAttched.srm?file_path='+file_path, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
						}
					},{
						//预览
						iconCls:'application_view_list',
						tooltip:'预览',
						handler:function(grid,rowIndex,colIndex)
						{
							var rec = grid.getStore().getAt(rowIndex);
							var file_path=rec.get('file_path');
							if(!Ext.isEmpty(file_path))
							{
								var suffixIndex=file_path.lastIndexOf('.');
                            	var suffixStr=file_path.substring(suffixIndex+1).toLowerCase();
                            	
                            	if(suffixStr=='bmp'||suffixStr=='jpg'||suffixStr=='jpeg'||suffixStr=='png'||suffixStr=='gif')
                            	{
                            		me.showPic(file_path,'PIC2');
                            	
                            	}
                            	else
                            	{
                            		Ext.Msg.alert('提示','当前格式不可直接预览,请通过下载方式查看');
									return;
                            	}
							}
							else
							{
								Ext.Msg.alert('提示','当前还没有上传文件');
								return;
							}
						}
					}
					]
				}
				],
				store:me.customAttchedStore
			},{
			//预览图片
				xtype:'image',
				width:600,
				itemId:'PIC2',
				border:true,
				height:'100%',
				src:'',
				style:"position:absolute;left:0;top:0;"
				}
				]
				}
			]
			
		});
		this.callParent(arguments);		
   },
   //加载当前供应商的所有已上传附件
   loadGridData:function(rec){
		var me=this;
		company_id=rec.get('company_id');
		if(company_id>0){
			me.company_id=company_id;
			//修改时加载数据库中当前供应商的所有附件
			me.registerAttchedStore.load({
				params:{
					record_id:company_id
				},
				callback:function(records, operation, success){
						if(records[0]==null)
						{
							
						}
						
					}
			});
		}
	},
	//图片展示
   	showPic:function(file_path,id){
   				var me=this;
   				var panel=me.down('#'+id);
   				if(file_path!=null&&file_path!=''){
   					var file_path=encodeURIComponent(encodeURIComponent(file_path));
   					var src1='supplierAccess/downloadFromMongdbAttched.srm?file_path='+file_path+'&isimg=true';
   					//var src='supplier/downloadAttched.srm?file_path='+file_path+'&isimg=true';
   					//var src='supplierAccess/downloadAttched.srm?file_path='+file_path+'&isimg=true';
   					panel.setSrc(src1);
   					//panel.setHeight(390);
   				}
   	}
});