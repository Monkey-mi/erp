/*物料确认样品明细列表页面*/
Ext.define('erp.materialConfirmation.view.MaterialSample',{
	extend:'erp.ux.Panel',
	alias:'widget.MaterialSample',
	initComponent:function(){
		var me = this;
		//样品明细
		me.materialSampleStore=Ext.create('erp.materialConfirmation.store.MaterialSample');
		//检测情况
		me.checkDetailStore=Ext.create('erp.materialConfirmation.store.MaterialCheckDetail');
		//附件
		me.materialAccessoryStore=Ext.create('erp.materialConfirmation.store.MaterialCheckAccessory');
		me.materialAccessoryStore.proxy.extraParams.company_id=me.company_id;
		me.materialAccessoryStore.load();
		//检测类型
		me.checkClassStore=Ext.create('erp.materialConfirmation.store.MaterialCheckclass');
		me.checkClassStore.load();
		var rowEditing1=Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToMoveEditor: 1,
			autoCancel: false,
			itemId:'rowEditing1',
			pluginId: 'rowEditing1',
			listeners: {
				'edit':function(editor,e){
					e.store.sync({
						success:function(batch,options){
//							me.materialSampleStore.reload();
//							Ext.Msg.alert('提示','保存成功！');
						},
						failure:function(batch,options)
						{
						Ext.Msg.alert('提示','保存失败！');
						}
					});
					e.record.commit();
				},
				'canceledit':function(editor,e)
				{
					var id=e.record.get('sample_id');
					if(id==null||id<=0)
					{
						e.store.remove(e.record);
					}
				},
				'validateedit':function(editor,e,eOpts)
				{
					if(e.newValues.material_name==null||e.newValues.material_name=='')
					{
						Ext.Msg.alert('提示','请输入品名与规格！');
						return false;
					}
					if(e.newValues.material_num<=0)
					{
						Ext.Msg.alert('提示','样品数量必须大于零！');
						return false;
					}
					else
						return true;
				}
			}
		});
		var rowEditing2=Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToMoveEditor: 1,
			autoCancel: false,
			itemId:'rowEditing2',
			pluginId: 'rowEditing2',
			listeners: {
				'edit':function(editor,e){
					e.grid.getStore().sync({
						success:function(batch,options){
							me.checkDetailStore.load({params:{sample_id:e.record.get('sample_id')}});
							me.checkDetailStore.sort([{property:'checkclass_id',direction:'ASC'}]);
						},
						failure:function(batch,options)
						{
						Ext.Msg.alert('提示','保存失败！');
						}
					});
					e.record.commit();
				},
				'canceledit':function(editor,e)
				{
					var id=e.record.get('check_id');
					var cancelRec=e.record;
					if(id==null||id<=0)
					{
						e.store.remove(cancelRec);
					}
				}
			}
		});
		Ext.apply(me,{
			layout:{type:'vbox',align:'stretch'},
			items:[{
				//物料确认明细表
				title:'物料样品明细',
				itemId:'samplePanel',
				//region:'center',
				flex:1,
				layout:'fit',
				overflowY: 'auto',
    			overflowX:'auto',
    			dockedItems: [
    				{xtype: 'toolbar',
                    dock: 'top',
                    itemId: 'top_bar2',
                    margin: '0 20 0 0',
                    items: [{text:'添加',glyph:0xf055,itemId:'wl_btn_add',hidden:!me.canEdit,
							handler:function(){
								var mainPanel=me.up('window');
								var isAdd=mainPanel.isAdd;
								if(isAdd){
									Ext.toastInfo("请先保存主要信息");
									return ;
								}
								if(!me.isAdd && me.ConfirmRec && Ext.String.trim(me.ConfirmRec.get('proposer'))!= Ext.String.trim(erp.Util.currentUser.userInfo.name)){
						 			Ext.Msg.alert('提示','当前操作员【'+erp.Util.currentUser.name+'】与申请人【'+me.ConfirmRec.get('proposer')+'】不一致');
						 			return;
						 		}
								var samplegrid=me.down('#sampleGrid');
								var store=samplegrid.getStore();
								var rowEditing=samplegrid.getPlugin('rowEditing1');
								rowEditing.cancelEdit();
								var rec=Ext.create('erp.materialConfirmation.model.MaterialSample',
									{confirmation_id:mainPanel.confirmation_id,createon:new Date()});
								store.insert(store.getCount(),rec);
								rowEditing.startEdit(rec);
							}},{text:'删除',glyph:0xf014,itemId:'wl_btn_del',hidden:!me.canEdit,
							handler:function(){
								if(!me.isAdd && me.ConfirmRec && Ext.String.trim(me.ConfirmRec.get('proposer'))!= Ext.String.trim(erp.Util.currentUser.name)){
						 			Ext.Msg.alert('提示','当前操作员【'+erp.Util.currentUser.userInfo.name+'】与申请人【'+me.ConfirmRec.get('proposer')+'】不一致');
						 			return;
						 		}
								Ext.Msg.confirm("提醒", "你确定要删除当前样品及其检测情况吗?", function(btn){
									if(btn=='yes')
									{
										var samplegrid=me.down('#sampleGrid');
										var samplestore=samplegrid.getStore();
   										var currenrec=samplegrid.getSelectionModel().getSelection()[0];
   										//检测情况
   										var checkgrid=me.down('#confirmCheckGrid');
   										var checkstore=checkgrid.getStore();
   										var checkRecs=me.checkDetailStore.getRange();
   										
   										samplestore.remove(currenrec);
   										samplestore.sync({
   										success:function(e,batch){
   											for(var i=0;i<checkRecs.length;i++)
	   										{
	   											var checkrec=checkRecs[i];
	   											if(checkrec.get('sample_id')==currenrec.get('sample_id'))
	   											{
	   												checkstore.remove(checkrec);
	   												checkstore.sync({
	   													success:function(e,batch){
			   											Ext.Msg.alert('提示','删除成功！');
			   										 },
			   										 failure:function(batch, options){
			   										 	Ext.Msg.alert('提示', '删除失败!');
			   										 }
			   									 });
	   											}
	   										}
   										 },
   										 failure:function(batch, options){
   										 	Ext.Msg.alert('提示', '删除失败!');
   										 }
   										
   										});
									}
								});
							}}]
                    }],
    			/*tbar:[{text:'添加',glyph:0xf055,itemId:'wl_btn_add',hidden:!me.canEdit,
							handler:function(){
								var mainPanel=me.up('window');
								var isAdd=mainPanel.isAdd;
								if(isAdd){
									Ext.toastInfo("请先保存主要信息");
									return ;
								}
								var samplegrid=me.down('#sampleGrid');
								var store=samplegrid.getStore();
								var rowEditing=samplegrid.getPlugin('rowEditing1');
								rowEditing.cancelEdit();
								var rec=Ext.create('erp.materialConfirmation.model.MaterialSample',
									{confirmation_id:mainPanel.confirmation_id,createon:new Date()});
								store.insert(store.getCount(),rec);
								rowEditing.startEdit(rec);
							}},
						{text:'删除',glyph:0xf014,itemId:'wl_btn_del',hidden:!me.canEdit,
							handler:function(){
								Ext.Msg.confirm("提醒", "你确定要删除当前样品及其检测情况吗?", function(btn){
									if(btn=='yes')
									{
										var samplegrid=me.down('#sampleGrid');
										var samplestore=samplegrid.getStore();
   										var currenrec=samplegrid.getSelectionModel().getSelection()[0];
   										//检测情况
   										var checkgrid=me.down('#confirmCheckGrid');
   										var checkstore=checkgrid.getStore();
   										var checkRecs=me.checkDetailStore.getRange();
   										for(var i=0;i<checkRecs.length;i++)
   										{
   											var checkrec=checkRecs[i];
   											if(checkrec.get('sample_id')==currenrec.get('sample_id'))
   											{
   												checkstore.remove(checkrec);
   											}
   										}
   										samplestore.remove(currenrec);
									}
								});
							}}
						],*/
				items:[{
					xtype:'grid',
					itemId:'sampleGrid',
					plugins: [
  	  						rowEditing1
   	  	  					],
   	  	  			listeners:{
   	  	  				itemclick:function(view,record,item,index,e,o){
   	  	  					me.down('#confirm_result_combo').setValue(record.get('confirm_result'));
   	  	  				}
   	  	  			},
  					selModel:Ext.create('Ext.selection.CheckboxModel',{simpleSelect:true}),
   	  	  			columns:[
   	  	  				/*{header:'序号',xtype:'rownumberer',width:40,align:'center'},*/
		    			{header:'品名与规格',dataIndex:'material_name',editor:{xtype:'textfield',allowBlank: false},flex:1},
		    			{header:'样品数量',dataIndex:'material_num',editor:{xtype:'numberfield'},width:80,align:'center'},
		    			{header:'图号/版本号',dataIndex:'version',editor:{xtype:'textfield'},width:150},
		    			{header:'客户名称',dataIndex:'customer_name',editor:{xtype:'textfield'},width:150},
		    			{header:'产品名称/型号',dataIndex:'product_name',editor:{xtype:'textfield'},width:150},
		    			{header:'有无特性要求',dataIndex:'haskey_point',editor:{xtype:'combo',store:[['0','没有'],['1','有']]},align:'center',width:100,
		    				renderer:function(value){if(value=='0') return '没有';else return '有';}},
		    			{header:'特性要求',dataIndex:'key_point',editor:{xtype:'textfield'},width:160},
		    			{header: '<div style="text-align:center">最终结论</div>',dataIndex: 'confirm_result',align:'center',width:160,
						renderer:function(value){
						if(value==0)
						{
						return '合格，可以进行小批试制';
						}
						if(value==1)
						{return '暂时让步接收，可以进行样品试装，样品改进后必须重新送样';}
						if(value==2)
						{return '不合格，要求改进后重新送样';}
						else if(value==3)
						{return '要求补充、完善上栏所列文件';}
						
						else return '';
						}}
   	  	  			],
   	  	  			store:me.materialSampleStore
					}]
				
			},{
				xtype:'tabpanel',
				itemId:'tabpanel',
				autoScroll :'true',
				flex:2,
				defaults:{padding:2},
				items:[{
				//物料检测明细表，与上一个gird是子父级关系
				title:'物料与技术要求符合确认情况',
				itemId:'confirmCheckPanel',
				layout:'border',
				overflowY: 'auto',
    			overflowX:'auto',
				dockedItems: [
    				{xtype: 'toolbar',
                    dock: 'top',
                    itemId: 'top_bar3',
                    margin: '0 20 0 0',
                    items: [{text:'确认',itemId:'btn_confirm',hidden:!me.canEdit},
                   		{text:'取消确认',itemId:'btn_cancel_confirm',hidden:!me.canEdit},
						{text:'添加',glyph:0xf055,itemId:'confirm_btn_add',hidden:!me.canEdit,
							handler:function(){								
								var grid=me.down('#confirmCheckGrid');
								var store=grid.getStore();
								var rowEditing=grid.getPlugin('rowEditing2');
								rowEditing.cancelEdit();
								var samplegrid=me.down('#sampleGrid');
								var currenrec=samplegrid.getSelectionModel().getSelection()[0];
								if(currenrec==null){
									Ext.Msg.alert('提示','请选择一个样品明细');
									return ;
								}
								sample_id=currenrec.get('sample_id');
								var rec=Ext.create('erp.materialConfirmation.model.MaterialCheckDetail',
									{checkclass_id:me.confirmation_id,sample_id:sample_id,createon:new Date()});
								store.add(rec);
								rowEditing.startEdit(rec);
							}},
						{text:'删除',glyph:0xf014,itemId:'confirm_btn_del',hidden:!me.canEdit,
							handler:function(){
								var grid=me.down('#confirmCheckGrid');
   								var store=grid.getStore();
   								var recs=grid.getSelectionModel().getSelection();
								store.remove(recs);
								store.sync({
									success:function(e,o){									
									},
									failure:function(e,o){
									}
								});
							}},'-',{
                    xtype: 'textfield',
 					fieldLabel:'最终确认人',
 					labelWidth:70,
 					flex:1,
 					name:'final_confirrmor',
 					itemId:'final_confirrmor', 					
 					readOnly:true
 				},{
 					fieldLabel:'确认时间',
 					labelWidth:60,
 					flex:1,
 					name:'confirm_date',
 					itemId:'confirm_date',
 					xtype:'datefield',
 					format:'Y-m-d',
 					readOnly:true
 				}]
    				}],
				/*tbar:[
					    {text:'确认',itemId:'btn_confirm',hidden:!me.canEdit},
						{text:'添加',glyph:0xf055,itemId:'confirm_btn_add',hidden:!me.canEdit,
							handler:function(){								
								var grid=me.down('#confirmCheckGrid');
								var store=grid.getStore();
								var rowEditing=grid.getPlugin('rowEditing2');
								rowEditing.cancelEdit();
								var samplegrid=me.down('#sampleGrid');
								var currenrec=samplegrid.getSelectionModel().getSelection()[0];
								if(currenrec==null){
									Ext.Msg.alert('提示','请选择一个样品明细');
									return ;
								}
								sample_id=currenrec.get('sample_id');
								var rec=Ext.create('erp.materialConfirmation.model.MaterialCheckDetail',
									{checkclass_id:me.confirmation_id,sample_id:sample_id,createon:new Date()});
								store.add(rec);
								rowEditing.startEdit(rec);
							}},
						{text:'删除',glyph:0xf014,itemId:'confirm_btn_del',hidden:!me.canEdit,
							handler:function(){
								var grid=me.down('#confirmCheckGrid');
   								var store=grid.getStore();
   								var recs=grid.getSelectionModel().getSelection();
								store.remove(recs);
							}}
						],*/
				items:[{
					xtype:'form',
				    itemId:'confirmCheckForm',
				    layout:'column',
				    height:35,
				    region:'north',
				    defaults:{
 					labelWidth:90,
 					xtype:'textfield',
 					labelStyle : 'font-weight:nomal;text-align:left;color:#000',
 					padding:'0 2 2 2',
					msgTarget : 'side',
					autoFitErrors : true
 				   },
 				   items:[
 					/*{
 				//提供文件的完整性、正确性
 					xtype:'container',
 					columnWidth:3/10,
 					layout:{type:'hbox'},
 					defaults:{
 						labelWidth:90,xtype:'textfield',
 						labelStyle : 'font-weight:nomal;text-align:left;color:#000'
 						},
 					items:[{
 						flex:1,
 						xtype:'combo',
 						itemId:'integritystatus_combo',
 						fieldLabel:'是否完整/正确',
 						emptyText:'提供文件的完整性、正确性',
 						name:'integrity_status',
 						store:[['0','完整、正确'],['1','需补充完善,否则不予发放订单']],
 						listeners:{
 						  	afterrender:function(combo){
 						  		if(me.isAdd || (me.ConfirmRec && Ext.isEmpty(me.ConfirmRec.get('integrity_status')))){
 						  		combo.setValue('');
 						  		}
 						  	}
 						}
 					}]
 				},*/
 				{
 					//结论
 					xtype:'combo',
 					columnWidth:0.98,
 					itemId:'confirm_result_combo',
 					fieldLabel:'最终结论',
 					labelWidth:60,
 					name:'confirm_result',
 					store:[['0','合格，可以进行小批试制'],['1','暂时让步接收，可以进行样品试装，样品改进后必须重新送样'],['2','不合格，要求改进后重新送样'],['3','要求补充、完善上栏所列文件']],
 					listeners:{
 						  	afterrender:function(combo){
 						  		if(me.isAdd ||(me.ConfirmRec && Ext.isEmpty(me.ConfirmRec.get('confirm_result')))){
 						  		combo.setValue('');
 						  		}
 						  	},
 						  	select:function(combo,records,eOpts){
 						  		if(!Ext.isEmpty(records.data.field1)){
 						  			var sample_grid = me.down('#sampleGrid');
 						  			var sample_recs = sample_grid.getSelectionModel().getSelection();
 						  			var sample_rec;
 						  			if(sample_recs.length>0){
 						  				for(i in sample_recs){
 						  				sample_rec = sample_recs[i];
										var confirm_result = records.data.field1;
	 						  			var result = erp.Const.callServiceMethodSync('materialConfirmation/MaterialConfirmation.srm?method=getConfirm_result',{
	 						  				sample_id:sample_rec.get('sample_id'),confirm_result: confirm_result
	 						  			})
	 						  			var data = Ext.decode(result);
									    if (data.bool) {
									    sample_rec.set('confirm_result',confirm_result)
	//								   	me.materialSampleStore.reload();
										Ext.toastErrorInfo('最终结论修改成功');												   
									   }else{
									   	Ext.toastErrorInfo('最终结论修改失败');	
									   	return;
									   }
						  											  				
						  			}						  				
	 						  		} 						  			
 						  		}
 						  	}
 						}
 				}/*,
 				{
 					fieldLabel:'最终确认人',
 					labelWidth:70,
 					name:'final_confirrmor',
 					itemId:'final_confirrmor',
 					columnWidth:3/20,
 					readOnly:true
 				},{
 					fieldLabel:'确认时间',
 					labelWidth:60,
 					name:'confirm_date',
 					itemId:'confirm_date',
 					xtype:'datefield',
 					format:'Y-m-d',
 					columnWidth:3/20,
 					readOnly:true
 				}*/
 				]
			     	},
					{
					xtype:'grid',
					itemId:'confirmCheckGrid',
					split:true,
					region:'center',
					multiSelect:true,
					selModel:Ext.create('Ext.selection.CheckboxModel'),
					columns:[/*{header:'序号',xtype:'rownumberer',width:40,align:'center'},*/
					{header:'检测类型',dataIndex:'checkclass_id',editor:{
						xtype:'combo',
						//editable:false,
						forceSelection:true,
						store:me.checkClassStore,
						displayField:'checkclass_name',
						valueField:'checkclass_id'
						},
						renderer:function(value, metaData, record, rowIndex, colIndex, store){
							var classrecord=me.checkClassStore.findRecord('checkclass_id',value);
							if(classrecord!=null){return classrecord.get('checkclass_name');}
							else return value;
					}},
					{header:'检验项目',dataIndex:'check_item',editor:{xtype:'textfield'},flex:1},
					{header:'标准要求',dataIndex:'check_request',editor:{xtype:'textfield'},flex:1},
					{header:'实测数据/报告',dataIndex:'check_report',editor:{xtype:'textfield'},flex:1},
					{header:'检测结果',dataIndex:'check_result',width:100,
						editor:{xtype:'combo',store:[['0','OK'],['1','NG']]},
						renderer:function(value){if(value=='0') return 'OK';else return 'NG';}},
					{header:'检测人',dataIndex:'check_person',editor:{xtype:'textfield'},width:100},
					{header:'备注',dataIndex:'remark',editor:{xtype:'textfield'},width:160}
					],
//					features:[{
//						groupHeaderTpl:'品名与规格:{name}',
//						ftype:'grouping'
//						}],
					plugins: [
  	  						rowEditing2
   	  	  					],
					store:me.checkDetailStore
				}]
				},{
				title:'附件',
				itemId:'accessory',
				layout:'fit',
				tbar:[
					    {text:'附件上传',iconCls:'',itemId:'btn_upload',hidden:!me.canEdit,handler:function(btn){
					    	var confirmWin = btn.up('window');
					    	var form = confirmWin.down('#panelMainInfo');
					    	var rec = form.getRecord();
					    	var store=me.materialAccessoryStore;
					    	var company_id = rec.get('company_id');					    	
					    	var isAdd=confirmWin.isAdd;
							if(isAdd){
								Ext.toastInfo("请先保存主要信息");
								return ;
							}
							if(company_id==0){
					    	    Ext.toastInfo("请先填写供应名称并保存");
								return ;
					    	}
					        var win =Ext.create('erp.supplierManager.view.SupplierFileUpLoadForWs');
					        win.down('#btn_save').on({
							'click':function(btn){
								var login_id = erp.Util.currentUser.userInfo.login_id;								
								var win =btn.up('window');
								var bzsm=win.down('#bzsm').getValue();
								var form = btn.up('form').getForm();
								var fileName=win.getfileName();
	           		    		if(form.isValid()){
		                			form.submit({
			                    		url: 'materialConfirmation/upConfirmation.srm',
			                    		method:'POST',
							            timeout : 90000,
							            params: {
							    			bzsm:bzsm,
							    			file_name:win.getfileName(),
							    			login_id:login_id,
							    			company_id : company_id,
							    			cjrm:erp.Util.currentUser.userInfo.name
										},
							            waitMsg : '正在上传文件...',
							            success : function(form, action) {	
							            	me.materialAccessoryStore.proxy.extraParams.company_id=company_id;
	                                       	me.materialAccessoryStore.load();
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
					    }}],
			    items:[{
					xtype:'grid',
					itemId:'confirmCheckGrid',
					split:true,
					multiSelect:true,
					selModel:Ext.create('Ext.selection.CheckboxModel'),
					columns:[{header:'文件编号',dataIndex:'wjbh',width:60},
					{header:'文件名称',dataIndex:'wjmc',width:250},
					{header:'创建人名',dataIndex:'cjrm',width:60},
					{header:'创建日期',dataIndex:'scrq',width:120,renderer : Ext.util.Format.dateRendererOne},
					{header:'文件路径',dataIndex:'wjlj',width:250},
					{header:'备注',dataIndex:'bzsm',width:250},
					{header: '操作',xtype:'actioncolumn',width:150,
					   items : [
					   {iconCls:'download',tooltip:'下载',
					   handler: function(grid,rowIndex,colIndex){
					      var rec = grid.getStore().getAt(rowIndex);
					      if(Ext.isEmpty(rec.get('wjlj')))
							{
								Ext.Msg.alert('提示','未上传，无法下载');
								return;
							}
						  file_path=rec.get('wjlj');
						  window.open('ftp://'+tp_ftpUrl+file_path, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=no, status=no');
					   }},{
						//删除
						//icon:'resources/images/icon/delete.gif',
						tooltip:'删除',
						iconCls:'delete',
						hidden:true,
						handler:function(grid,rowIndex,colIndex){							
								Ext.Msg.confirm('提示','你确定要删除当前上传文件?',function(btn){
			 					if(btn=='yes')
			 					{
									var rec = grid.getStore().getAt(rowIndex);
									var store=grid.getStore();
//									me.toBeDeleteFileArray.push(rec.get('file_path'));
//									rec.set('file_path',null);
//									me.hiddenPic('PIC1');
							var patharray=[];
							be_path = 'ftp://'+tp_ftpUrl;
							patharray.push(rec.get('wjlj'));
							erp.Const.callServiceMethodSync('materialConfirmation/deleteAttchedByPath.srm',{
											patharray:patharray.join(',')
									});
									//删除附件记录
							rec.set('file_path',null);
							store.remove(rec);
							store.sync({
 								success:function(){		
 									Ext.Msg.alert('提示', '删除上传成功!');
										return;
 								}
 								,failure : function(batch, options) {
										Ext.Msg.alert('提示', '删除上传失败!');
										return;
									}
 								
 								});
			 					}
								});
						}
					},{
						//预览
						tooltip:'预览',
						iconCls:'application_view_list',
						handler:function(grid,rowIndex,colIndex)
						{
							var rec = grid.getStore().getAt(rowIndex);
							var file_path=rec.get('wjlj');
							if(!Ext.isEmpty(file_path))
							{
								var suffixIndex=file_path.lastIndexOf('.');
                            	var suffixStr=file_path.substring(suffixIndex+1).toLowerCase();
                            	
                            	if(suffixStr=='bmp'||suffixStr=='jpg'||suffixStr=='jpeg'||suffixStr=='png'||suffixStr=='gif')
                            	{
                            		/*me.showPic(file_path,'PIC1');*/
                            		 window.open('ftp://'+tp_ftpUrl+file_path, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=no, status=no');
                            	
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
				    ]}],
				    store:me.materialAccessoryStore
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
			        
				}]
			}]
		});
		me.callParent(arguments);
	},
	/*将主表ID赋值给样品明细表*/
	setconfirmationIdToSimply:function(confirmationid){
		var me=this;
		
		me.confirmation_id=confirmationid;

  		var recs= me.materialSampleStore.getRange();
		
			for(var i=0;i<recs.length;i++)
			{
				
				recs[i].set('confirmation_id',confirmationid);
			}
	},
	//图片展示
   	showPic:function(file_path,id){
   			var me=this;
   			var panel=me.down('#'+id);
   			if(file_path!=null&&file_path!=''){
   				var file_path=encodeURIComponent(encodeURIComponent(file_path));
   				var src='supplier/downloadAttched.srm?file_path='+file_path+'&isimg=true';
   				panel.setSrc(src);
   				//panel.setHeight(390);
   			}
   	},
	/*根据主表ID加载详细表*/
	loadDetailData:function(confirmationid){
		var me=this;
		if(me.ConfirmRec){
//			var form = me.down('#confirmCheckForm').loadRecord(me.ConfirmRec);
			me.down('#final_confirrmor').setValue(me.ConfirmRec.get('final_confirrmor'));
			me.down('#confirm_date').setValue(me.ConfirmRec.get('confirm_date'));
		}
		
		me.confirmation_id=-1;
		
		if(confirmationid>0)
		{
			me.confirmation_id=confirmationid;
			me.materialSampleStore.load({
				params:{confirmation_id:me.confirmation_id},
				callback:function(records,operation,success){
					if(records.length>0)
					{
						//默认取第一条样品数据，加载检测明细
						var rec=records[0];
						me.down('#sampleGrid').getSelectionModel().select(rec);
						/*me.checkDetailStore.load({
							params:{sample_id:rec.get('sample_id')}
						});*/
						
						me.checkDetailStore.sort([{property:'checkclass_id',direction:'ASC'}]);
					}
					else
					{
					me.checkDetailStore.load({
						params:{sample_id:0}
					});
					}
				}
			});
		}
		else
		{			
			me.materialSampleStore.load({
				params:{confirmation_id:0}
			});
			me.checkDetailStore.load({
				params:{sample_id:0}
			});
		}		
	}
});