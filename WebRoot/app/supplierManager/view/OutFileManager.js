Ext.define('erp.supplierManager.view.OutFileManager',{
	extend:'erp.ux.Window',
	alias:'widget.outFileManager',
	modal:true,
	autoScroll :'true',
	height:document.body.clientHeight<860?document.body.clientHeight:860,
	width:document.body.clientWidth<1200?document.body.clientWidth:860,
	title:'平台资料管理',
	requires:[
		'erp.supplierManager.store.SupplierMaterialcheck',
		'erp.supplierManager.store.SupplierCheckfactoryReport',
		'erp.supplierManager.view.SupplierFileUpLoadForWs'
	],
	initComponent:function(){
		var  me=this;
		me.cStore=Ext.create('erp.supplierManager.store.SupplierMaterialcheck');
		me.rStore=Ext.create('erp.supplierManager.store.SupplierCheckfactoryReport');
		me.cStore.proxy.extraParams.record_id=me.record_id;
		me.rStore.proxy.extraParams.record_id=me.record_id;
		me.cStore.load();
		me.rStore.load();
		Ext.apply(me,{
			layout:'border',
			tbar:[
				{text: '文件上传',iconCls:'',itemId:"fileUp" ,handler:function(btn){
					var tab=me.down('#tabpanel');
					activeTab=tab.activeTab;
					var type="";
					var store=me.cStore;
					var zrdf = 0;//输出准入得分
					var assess_dt =''; 
					var head_audit = '';
					var AccessScoreArray = '';
					switch(activeTab.itemId){
						case 'reportFile':
							store=me.rStore;
							type="reportFile";
							var result = erp.Const.callServiceMethodSync('supplier/appSupplierAccessLoop.srm?method=getAppSupplierAccessLoopOutList',{company_id:me.company_id});
							if(Ext.typeOf(result)!='array'&&result.data==null){
							Ext.Msg.alert('提示','该记录没有准入评估记录或者准入评估记录未审核！');
	    					return;
							}
							assess_dt = result[0].assess_dt;
							head_audit = result[0].head_audit;
							var loop_id = result[0].loop_id;			
							var result2 = erp.Const.callServiceMethodSync(
									'supplierAccess/SupplierAccessScoreSummary.srm?method=getSupplierScoreCorrelation',
									{
										loop_id : loop_id
									});
					        var data = Ext.decode(result2);
					        var real = data.real;//评估总得分
						    var max = data.max;//总分			    
						    if(max!=0){
							    zrdf = (real/max)*10;
						    }	
						    var result3 = erp.Const.callServiceMethodSync(
									'supplierAccess/SupplierAccessScore.srm?method=getSupplierAccessScoreList',
									{
										loop_id : loop_id
									});
							 AccessScoreArray = Ext.encode(result3);//评分数组
						break;
						case 'checkGrid':
							type="checkGrid";
						break;
					}
					var win =Ext.create('erp.supplierManager.view.SupplierFileUpLoadForWs');
					win.down('#btn_save').on({
						'click':function(btn){
							var accountMap = erp.UInfo.currentUser.accountMap;
							var login_id = '';
							if (accountMap != null) {
								Ext.each(accountMap, function(acc) {
									if (acc.sys_name == 'SRM') {
										login_id = acc.ref_u_id;
									}
								})
							}
							if (login_id == '') {
								Ext.toastInfo('请分配平台对应账户！');
								return;
							}
							if(activeTab.itemId=='reportFile' && zrdf == 0){
								Ext.toastInfo('准入得分为0不允许保存！');
								return;
							}
							var win =btn.up('window');
							var bzsm=win.down('#bzsm').getValue();
							var form = btn.up('form').getForm();
							var fileName=win.getfileName();
           		    		if(form.isValid()){
	                			form.submit({
		                    		url: 'supplier/upAttchedFileForWs.srm',
		                    		method:'POST',
						            timeout : 90000,
						            params: {
						    			bzsm:bzsm,
						    			record_id:me.record_id,
						    			file_name:win.getfileName(),
						    			login_id:login_id,
						    			type:type,
						    			AccessScoreArray:AccessScoreArray,//评分数组
						    			company_id : erp.Const.companyId,
						    			assess_dt:assess_dt,
						    			head_audit:head_audit,
						    			zrdf:zrdf,
						    			company_out_id:me.company_out_id
									},
						            waitMsg : '正在上传文件...',
						            success : function(form, action) {
						            	store.load();
						                if(!Ext.isEmpty(action.result.msg)){
				                    		Ext.Msg.alert("提示", action.result.msg);
				                    		return;
				                    	}
				                    	win.close();
		                			},
				                    failure : function() {
				                        Ext.Msg.alert("提示", "文件保存失败");
				                        win.close();
				                    }
							  })
           		    		}
						}
							  
					})
					win.show();
				}}
			],
			items:[{
				xtype:'tabpanel',
				itemId:'tabpanel',
				region:'center',
				autoScroll :'true',
				flex:1,
				defaults:{padding:2},
				items:[{
		    		title:'验厂报告',
		    		xtype:'grid',
		    		itemId:'reportFile',
					border:false,
					store:me.rStore,
					dockedItems:[{
						    		xtype : 'pagingbar',
			                        stateId : '8081d6f3sss-9db7-470d-b764-dbb70c5e81b1',
						    		store:me.rStore,
						    		dock:'bottom',
						    		displayInfo:true,
						    		defaultPageSize:25
						    	  }],
					columns:[
					{header:'序号', xtype:'rownumberer',width:45},
					{header:'文件名称',dataIndex:'file_name',width:100},
					{header: '上传日期',dataIndex: 'create_dt',align:'center',width:90,xtype: 'datecolumn',format:'Y-m-d'},
					{header:'状态',dataIndex:'mogodb_id',width:60,
									renderer:function(v,metaData){
							            if(Ext.isEmpty(v)){
							            	return '<div style="color:red">未上传</div>';
							            }else{
							            	return '<div style="color:green">已上传</div>';
							            } 
							        }
					}
					,{header:'备注说明',dataIndex:'remark',width:240}
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
									var suffixIndex=rec.get('file_name').lastIndexOf('.');
	                            	var suffixStr=rec.get('file_name').substring(suffixIndex+1).toLowerCase();
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
						},{
						//删除
						tooltip:'删除',
						iconCls:'delete',
						handler:function(grid,rowIndex,colIndex){							
								Ext.Msg.confirm('提示','你确定要删除当前上传文件?',function(btn){
			 					if(btn=='yes')
			 					{
									var rec = grid.getStore().getAt(rowIndex);
									var store=grid.getStore();
							var result = erp.Const.callServiceMethodSync('supplierAccess/common.srm?method=getDeletePfSupplierCheck',{
											id:rec.get('id')
									});
							var data = Ext.decode(result);
							if(data.bool){
								Ext.Msg.alert('提示', '删除成功!');
							}else{
								Ext.Msg.alert('提示', '删除错误!');
							}
							//删除附件记录
							store.remove(rec);							
	 						}
							});
						}
					}
						]
					}
				]
		    	},{
		    		title:'物料确认',
		    		xtype:'grid',
					itemId:'checkGrid',
					store:me.cStore,
					dockedItems : [{
								xtype : 'pagingbar',
								stateId : '8081d6f3sss-9db7-470d-b764-dbb70c5e81b1',
								store : me.cStore,
								dock : 'bottom',
								displayInfo : true,
								defaultPageSize : 25
							}],
					columns : [
					{header:'序号', xtype:'rownumberer',width:45},
					{header:'文件名称',dataIndex:'file_name',width:100},
					{header: '上传日期',dataIndex: 'create_dt',align:'center',width:90,xtype: 'datecolumn',format:'Y-m-d'},
					{header:'状态',dataIndex:'mogodb_id',width:60,
									renderer:function(v,metaData){
							            if(Ext.isEmpty(v)){
							            	return '<div style="color:red">未上传</div>';
							            }else{
							            	return '<div style="color:green">已上传</div>';
							            } 
							        }
					}
					,{header:'备注说明',dataIndex:'remark',width:240}
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
									var suffixIndex=rec.get('file_name').lastIndexOf('.');
	                            	var suffixStr=rec.get('file_name').substring(suffixIndex+1).toLowerCase();
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
						},{
						//删除
						tooltip:'删除',
						iconCls:'delete',
						handler:function(grid,rowIndex,colIndex){							
								Ext.Msg.confirm('提示','你确定要删除当前上传文件?',function(btn){
			 					if(btn=='yes')
			 					{
									var rec = grid.getStore().getAt(rowIndex);
									var store=grid.getStore();
							var result = erp.Const.callServiceMethodSync('supplierAccess/common.srm?method=getDeletePfSupplierMaterialcheck',{
											materialcheck_id:rec.get('materialcheck_id')
									});
							var data = Ext.decode(result);
							if(data.bool){
								Ext.Msg.alert('提示', '删除成功!');
								return;
							}else{
								Ext.Msg.alert('提示', '删除错误!');
								return;
							}
							//删除附件记录
							store.remove(rec);							
	 						}
							});
						}
					}
						]
					}
				]
		    	}]
			},{
			//预览图片
				xtype:'image',
				width:600,
				flex:1,
				region:'south',
				split:true,
				itemId:'PIC2',
				border:true,
				height:600,
				src:'',
				hidden:true,
				style:"position:absolute;left:0;top:0;"
			}]
		
		});
		this.callParent(arguments);
	},//图片展示
   	showPic:function(file_path){
   				var me=this;
   				var panel=me.down('#PIC2');
   				if(file_path!=null&&file_path!=''){
   					var file_path=encodeURIComponent(encodeURIComponent(file_path));
   					var src1='supplierAccess/downloadFromMongdbAttched.srm?file_path='+file_path+'&isimg=true';
   					//var src='supplier/downloadAttched.srm?file_path='+file_path+'&isimg=true';
   					//var src='supplierAccess/downloadAttched.srm?file_path='+file_path+'&isimg=true';
   					panel.setSrc(src1);
   					//panel.setHeight(390);
   				}
   				panel.show();
   	}
});