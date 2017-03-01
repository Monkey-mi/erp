Ext.define('erp.view.master.purchaseDetail.view.EdtPurchaseContract',{
	extend:'erp.ux.Panel',
	alias:'widget.EdtPurchaseContract',
	requires:[
		'erp.view.master.purchaseDetail.store.PurchaseContract',
		'erp.view.master.purchaseDetail.window.MateCombo',
		'erp.view.master.purchaseDetail.store.MainUnit',
		'erp.view.master.purchaseDetail.store.ContractDetail',
		'erp.view.master.purchaseDetail.store.ContractSubsidiary',
		'erp.view.master.category.store.CategoryTree',
		'erp.view.master.purchaseDetail.window.UpImg',
		'erp.view.master.purchaseDetail.store.StoreQuote',
		'erp.view.master.purchaseDetail.store.AccountDeptTree',
		'erp.common.basic.view.TemplateHelp',
		'erp.view.purchaseOrder.store.PurchaseOrderDetail',
		'erp.view.purchaseOrder.store.OutSourcePicking',
		'erp.view.master.purchaseDetail.PurchaseDetailModel',
		'erp.view.purchaseOrder.window.PriceSearch'
	],
	controller:'PurchaseDetailCtl',
	xtype: 'EdtPurchaseContract',
	layout: {
        type: 'border'
    },
    viewModel: {
        type: 'purchaseDetailModel'
    },
	initComponent:function(){
		var me=this;
		me.isSave=false;
		me.isinit=me.isAdd;
		me.mStore=Ext.create('erp.view.master.purchaseDetail.store.PurchaseContract');
		me.dStore=Ext.create('erp.view.purchaseOrder.store.PurchaseOrderDetail',{
			listeners:{
				'load':function(s,recs){
					if(recs.length>0){
						me.down('#ContractDetailGrid').getSelectionModel().select(recs[0]);
						me.down('#MaterialGrid4').getSelectionModel().select(recs[0]);
					}
				},
				beforeload:function(store){
					erp.Util.storeSync(store);
				}
			}
		});
		var login_id=erp.Util.currentUser.loginId;
    	var ip=erp.Util.currentUser.IP;
		me.dStore.proxy.extraParams.usePaging=true;
		me.dStore.proxy.extraParams.login_id=login_id;
		me.dStore.proxy.extraParams.ip=ip;
		me.dStore.proxy.api.read='purchaseorder/purchaseorderdetail.act?method=getPurchaseOrderDetailListForEdt';
		
		me.cateTreeStore=Ext.create('erp.view.master.category.store.CategoryTree',{autoLoad:true});
		me.MainUnitStore=Ext.create('erp.view.master.purchaseDetail.store.MainUnit');
		me.MainUnitStore.load();
		me.subsidiaryStore=Ext.create('erp.view.purchaseOrder.store.OrderSubsidiary',{
			listeners:{
				'load':function(s,recs){
					if(recs.length>0){
						me.down('#ContractSubsidiaryGrid').show();
					}else{
						me.down('#ContractSubsidiaryGrid').hide();
					}
				},
				beforeload:function(store){
					erp.Util.storeSync(store);
				}
			}
		});
		me.subsidiaryStore.proxy.extraParams.login_id=login_id;
		me.subsidiaryStore.proxy.extraParams.ip=ip;
		me.subsidiaryStore.proxy.api.read='purchaseorder/purchaseorderdetail.act?method=getOrderSubsidiaryForEdtList';
		
		
		me.accountDeptStore=Ext.create('erp.view.master.purchaseDetail.store.AccountDeptTree');
		me.storeQuote=Ext.create('erp.view.master.purchaseDetail.store.StoreQuote');
		
		me.outSourceStore=Ext.create('erp.view.purchaseOrder.store.OutSourcePicking',{
			listeners:{
				beforeload:function(store){
					erp.Util.storeSync(store);
				}
			}
		});
		me.outSourceStore.proxy.api.read='purchaseorder/outsourcepicking.act?method=getOutSourcePickingForEdtList';
		me.outSourceStore.proxy.extraParams.login_id=login_id;
		me.outSourceStore.proxy.extraParams.ip=ip;
		this.dockedItems=[{
	    	xtype: 'toolbar',
	    	dock: 'top',
	    	itemId:'EdtPurchaseContractBar',
	    	hidden:!me.isEdit,
	    	items:[
	    		  {text: '导入',	iconCls:'page_go',		itemId:'btn_imp1',hidden:true},
	    		  {text: '拆分信息导入',	iconCls:'page_go',		itemId:'btn_imp2',hidden:true},
			   	  {text: '增加',	iconCls:'page_add',		itemId:'Add'/*, disabled:true*/,handler:function(btn){
			   	  		var tabPanel=me.down('#southPanel');
			   	  		var myMask = new Ext.LoadMask({
							target : me
						});
			   	  		var activeTab=tabPanel.activeTab;
			   	  		switch(activeTab.title){
			   	  			case '领料明细':
		    					var grid=activeTab.down('#MaterialGrid4');
		    					var outSourceStore=me.outSourceStore;
		    					var srecs=grid.getSelectionModel().getSelection();
		    					if(srecs.length==0){
		    						Ext.toastInfo('请选中某行或多行再使用此功能！');
		    						break;
		    					}
		    					var srec=srecs[0];
		    					var htbh=srec.get('htbh'),
		    					htxh=srec.get('htxh');
							    var s_jgsl=srec.get('cgsl')
		    					var win =Ext.create('erp.view.purchaseOrder.window.MateSelect',{
		    						onSubmit:function(rec,recs){
		    							var nrec;
		    							if(recs!=null&&recs.length!=0){
		    								Ext.each(recs,function(rec){
		    									var tzxh=outSourceStore.max('tzxh');
			    								if(tzxh==null){
			    									tzxh=1;
			    								}else{
			    									tzxh++;
			    								}
		    									var ls_clhh=rec.get('clhh'),
		    									ls_jldw=rec.get('jldw'),
		    									ls_lbbh=rec.get('lbbh'),
		    									ls_jgyl=rec.get('jgyl'),
		    									ls_tzll=rec.get('tzll'),
		    									ls_jsbl=rec.get('jsbl');
		    									
		    									nrec=Ext.create('erp.view.purchaseOrder.model.OutSourcePicking',{
		    										htbh:htbh,
		    										htxh:htxh,
		    										tzxh:tzxh,
		    										lbbh:ls_lbbh,
		    										clhh:ls_clhh,
		    										jldw:ls_jldw,
		    										login_id:login_id,ip:ip
		    									})
		    									if(ls_jgyl!=0){
		    										nrec.set('jgyl',me.round(ls_jgyl,3));
		    										nrec.set('tzll',me.round(ls_tzll,3));
		    										if(s_jgsl!=0){
		    											nrec.set('djyl',me.round(ls_jgyl/s_jgsl,3))
		    										}
		    									}else{
		    										nrec.set('jgyl',me.round(s_jgsl,3));
		    										nrec.set('tzll',me.round(s_jgsl,3));
		    										if(s_jgsl!=0){
		    											nrec.set('djyl',me.round(ls_jgyl/s_jgsl,3))
		    										}
		    									}
		    									nrec.set('jsbl',me.round(ls_jsbl,4))
		    									nrec.phantom=true;
		    									outSourceStore.add(nrec)
		    								})
		    							}else{
		    								var tzxh=outSourceStore.max('tzxh');
			    							if(tzxh==null){
			    								tzxh=1;
			    							}else{
			    								tzxh++;
			    							}
		    								var ls_clhh=rec.get('clhh'),
		    									ls_jldw=rec.get('jldw'),
		    									ls_lbbh=rec.get('lbbh'),
		    									ls_jgyl=rec.get('jgyl'),
		    									ls_tzll=rec.get('tzll'),
		    									ls_jsbl=rec.get('jsbl');
		    								
		    								nrec=Ext.create('erp.view.purchaseOrder.model.OutSourcePicking',{
		    										htbh:htbh,
		    										htxh:htxh,
		    										tzxh:tzxh,
		    										lbbh:ls_lbbh,
		    										clhh:ls_clhh,
		    										jldw:ls_jldw,
		    										login_id:login_id,ip:ip
		    									})
		    									if(ls_jgyl!=0){
		    										nrec.set('jgyl',me.round(ls_jgyl,3));
		    										nrec.set('tzll',me.round(ls_tzll,3));
		    										if(s_jgsl!=0){
		    											nrec.set('djyl',me.round(ls_jgyl/s_jgsl,3))
		    										}
		    									}else{
		    										nrec.set('jgyl',me.round(s_jgsl,3));
		    										nrec.set('tzll',me.round(s_jgsl,3));
		    										if(s_jgsl!=0){
		    											nrec.set('djyl',me.round(ls_jgyl/s_jgsl,3))
		    										}
		    									}
		    									nrec.set('jsbl',me.round(ls_jsbl,4))
		    									nrec.phantom=true;
		    									outSourceStore.add(nrec)
		    							} 
		    							outSourceStore.load({params:{htbh:nrec.get('htbh'),htxh:nrec.get('htxh')}});
		    						}
		    					});
		    					
		    					win.show();
		    				break
			   	  			case '合同明细':
			   	  				var dStore=me.dStore;
			   	  				erp.Util.storeSync(dStore);
			   	  				var dGrid=activeTab.down('#ContractDetailGrid');
		    					myMask.mask('数据验证中...');
		    					var form=me.down('#PurchaseContractForm');
						    	var rec=form.getRecord();
						    	form=form.updateRecord(rec);
						    	var result = erp.Const.callServiceMethodSync(
									'purchaseorder/purchaseorderdetail.act?method=getAddPurchaseorderDetail', {
									rec:Ext.encode(rec.data),login_id:login_id,ip:ip
								});
								myMask.unmask();
								var data = Ext.decode(result);
								if (!data.bool) {
									Ext.toastErrorInfo(data.msg);
									break;
								}
								var pagingbar=dGrid.getDockedItems('pagingbar[dock = "bottom"]')[0];
								dStore.load({callback:function(recs){
									if(recs.length>=dStore.pageSize){
										pagingbar.moveLast();
									}
								}});
			   	  			break;
			   	  			case '采购要求':
			   	  				var win =Ext.create('erp.view.master.purchaseDetail.window.UpImg');
			   	  				win.down('#savaPic').on('click',function(btn){
			   	  					var form = btn.up('form').getForm();
					                if (form.isValid()) {
					                    form.submit({
					                        url : 'common/uploadAttachement.action',
					                        method:'POST',
					                        timeout : 120000,
					                        params: {
					        					urlId: '/rzerp_hfpg/other/'//存储目录
					    					},
					                        waitMsg : '正在上传您的文件，请耐心等候...',
					                        success : function(form, action) {
					                        	Ext.Msg.alert('提示', action.result.msg);
					                        	var url=action.result.data;
					                        	if(url!=null){
						                        	me.down('#http').setValue(url);
						                        	var src='ftp://'+tp_ftpUrl+url;
						                        	me.down('#httpPic').setSrc(src);
						                        	btn.up('window').close();
					                        	}
					                        },
					                        failure : function() {
					                            Ext.Msg.alert("提示", "图片上传失败！");
					                        }
					                    });
					                }
			   	  				})
			   	  				win.show();
			   	  			break;
			   	  		}
			   	  }},
			   	  {text: '删除',	iconCls:'page_delete',		itemId:'Del'/*, disabled:true*/,handler:function(btn){
			   	  		var tabPanel=me.down('#southPanel');
			   	  		var activeTab=tabPanel.activeTab;
			   	  		var myMask = new Ext.LoadMask({
							target : me
						});
						var dStore=me.dStore;
			   	  		switch(activeTab.title){
			   	  			case '领料明细':
		    					var grid=activeTab.down('#MaterialGrid4');
		    					var outSourceStore=me.outSourceStore;
		    					var srecs=grid.getSelectionModel().getSelection();
		    					if(srecs.length==0){
		    						Ext.toastInfo('请选中某行或多行再使用此功能！');
		    						break;
		    					}
		    					Ext.Msg.confirm('提示', '是否确认删除所选明细?', function(btn) {
										if (btn == 'yes') {
											outSourceStore.remove(srecs);
					    					myMask.mask('数据保存中...');
					    					outSourceStore.sync({callback:function(){
					    						myMask.unmask();
					    					}});
										}
								})
		    				break;
			   	  			case '合同明细':
			   	  				var grid=activeTab.down('#ContractDetailGrid');
			   	  				var dsrecs=grid.getSelectionModel().getSelection();
			   	  				//验证
	    						myMask.mask('数据验证中...');
	    						var htxh=new Array();
	    						Ext.each(dsrecs,function(drec){
	    							htxh.push("'"+drec.get('htxh')+"'");
	    						})
						    	var result = erp.Const.callServiceMethodSync(
									'purchaseorder/purchaseorderdetail.act?method=getBeforDelPurchaseorderDetail', {
									 htbh:dsrecs[0].get('htbh'),htxh:htxh.join(',')
								});
								myMask.unmask();
								var data = Ext.decode(result);
								if (!data.bool) {
									Ext.toastErrorInfo(data.msg);
									break;
								}
								Ext.Msg.confirm('提示', '是否确认删除所选明细?', function(btn) {
									if (btn == 'yes') {
										var result = erp.Const.callServiceMethodSync(
											'purchaseorder/purchaseorderdetail.act?method=getDelPurchaseorderDetail', {
											 htbh:dsrecs[0].get('htbh'),htxh:htxh.join(','),login_id:login_id,ip:ip
										});
										var data = Ext.decode(result);
										if (!data.bool) {
											Ext.toastErrorInfo(data.msg);
											return ;
										}
										dStore.load();
										Ext.toastInfo('删除成功！');
									}
								})
			   	  			break;
			   	  			case '采购要求':
			   	  				Ext.Msg.confirm('提示','是否取消原来的照片?',function(btn){
								   		if(btn=='yes'){
								   			erp.Util.ftpDel(me.down('#http').getValue());
								   			me.down('#http').setValue('');
									        var src='ftp://'+tp_ftpUrl+url;
									        me.down('#httpPic').setSrc('');
								   		}
								})
			   	  			break;
			   	  		}
			   	  }},
			   	  {text: '材料导入',iconCls:'page_go',itemId:'materialImp', disabled:true,handler:function(btn){
			   	  		var grid=me.down('#MaterialGrid4');
		    			var outSourceStore=me.outSourceStore;
		    			var srecs=grid.getSelectionModel().getSelection();
		    			if(srecs.length==0){
		    				Ext.toastInfo('请选中某行或多行再使用此功能！');
		    				return ;
		    			}
		    			var srec=srecs[0];
		    			var htbh=srec.get('htbh'),
		    			htxh=srec.get('htxh'),
		    			s_jgsl=srec.get('cgsl');
		    			var sql = "	select count(*)  from jhmxb where jhbh='"+srec.get('jhbh')+"' and jhxh="+srec.get('jhxh')+"; ";
						var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',{
							sql : sql
						});
						var data = Ext.decode(result);
						if (!data.bool) {
							Ext.toastErrorInfo(data.msg);
							return;
						}
						if(data.val==0){
							Ext.toastInfo('该计划不存在!');
							return;
						}
		    			var win=Ext.create('erp.view.purchaseOrder.window.OutSourceImp',{
		    				jhh:srec.get('jhh')
		    			});
		    			win.down('#btn_confirm').on({
		    				click:function(btn){
		    					var win=btn.up('window');
		    					var grid=win.down('#OutSourceImpDetailGrid');
		    					var recs=grid.getSelectionModel().getSelection();
		    					Ext.each(recs,function(rec){
		    						var tzxh = outSourceStore.max('tzxh');
									if (tzxh == null) {
										tzxh = 1;
									} else {
										tzxh++;
									}
		    						nrec = Ext.create('erp.view.purchaseOrder.model.OutSourcePicking',{
										htbh : htbh,
										htxh : htxh,
										tzxh : tzxh,
										lbbh : rec.get('lbbh'),
										cllbmc : rec.get('cllbmc'),
										clhh : rec.get('clhh'),
										jldw : rec.get('jldw'),
										jgbh : rec.get('jgbh'),
										jsbl : rec.get('jsbl'),
										jgyl : rec.get('bcyl'),
										tzll : rec.get('bcyl'),
										login_id : login_id,
										ip : ip
									})
									nrec.phantom = true;
									if(s_jgsl!=0){
										nrec.set('djyl',me.round(rec.get('bcyl')/s_jgsl,3))
									}
									outSourceStore.add(nrec)
		    					})
		    					outSourceStore.load({params:{htbh:htbh,htxh:htxh}});
		    					win.close();
		    				}
		    			})
		    			win.show();
			   	  }},
	   	  		  {text: '材料复制',iconCls:'page_go',itemId:'materialCopy', disabled:true,handler:function(btn){
	   	  		  	var grid=me.down('#outSourcePicking');
	    			var outSourceStore=me.outSourceStore;
	    			var srecs=grid.getSelectionModel().getSelection();
	    			if(srecs.length==0){
	    				Ext.toastInfo('请选中某行或多行再使用此功能！');
	    				return ;
	    			}
	    			me.copy=new Array();
	    			Ext.each(srecs,function(rec){
						me.copy.push(rec.copy());
	    			})
	    			Ext.toastInfo('共复制 '+srecs.length+' 行材料!');
	   	  		  }},
	   	  		  {text: '材料粘贴',iconCls:'page_go',itemId:'materialPaste', disabled:true,handler:function(btn){
	   	  		  		var outSourceStore=me.outSourceStore;
	   	  		  		var grid=me.down('#MaterialGrid4');
		    			var srecs=grid.getSelectionModel().getSelection();
		    			var srec=srecs[0];
		    			var s_jgsl=srec.get('cgsl');
		    			if(me.copy==null||me.copy.length==0){
		    				Ext.toastInfo('当前粘贴板无数据!');
		    			}
		    			Ext.each(me.copy,function(rec){
		    				var tzxh = outSourceStore.max('tzxh');
							if (tzxh == null) {
								tzxh = 1;
							} else {
								tzxh++;
							}
		    				nrec = Ext.create('erp.view.purchaseOrder.model.OutSourcePicking',{
										htbh : rec.get('htbh'),
										htxh : srec.get('htxh'),
										tzxh : tzxh,
										lbbh : rec.get('lbbh'),
										lbmc : rec.get('lbmc'),
										clmc : rec.get('clmc'),
										cllbmc : rec.get('cllbmc'),
										clhh : rec.get('clhh'),
										jldw : rec.get('jldw'),
										jgbh : rec.get('jgbh'),
										jsbl : rec.get('jsbl'),
										jgyl : rec.get('jgyl'),
										tzll : rec.get('tzll'),
										login_id : login_id,
										ip : ip
							})
							nrec.phantom = true;
							outSourceStore.add(nrec);
		    			})
		    			outSourceStore.load({params:{htbh:srec.get('htbh'),htxh:srec.get('htxh')}});
	   	  		  }},
			   	  {text: '模版导入',	iconCls:'template',		itemId:'template', disabled:true,handler:function(btn){
				   	  	var tabPanel=me.down('#southPanel');
				   	  		var activeTab=tabPanel.activeTab;
				   	  		switch(activeTab.title){
				   	  			case '合同条款':
				   	  				var win=Ext.create('erp.common.basic.view.TemplateHelp',{
				   	  					winParam:{mbbh:'0301'},
				   	  					title:'合同条款模版'
				   	  				});
				   	  				callback=function(value,target){
				   	  					me.down('#httk').setValue(value);
				    				};
				    				win.initWindow(callback, 'mbnr', 'httk');
				   	  				win.show();
				   	  			break;
				   	  			case '采购要求':
				   	  				var win=Ext.create('erp.common.basic.view.TemplateHelp',{
				   	  					winParam:{mbbh:'0302'},
				   	  					title:'采购要求模版'
				   	  				});
				   	  				callback=function(value,target){
				   	  					me.down('#mle').setValue(value);
				    				};
				    				win.initWindow(callback, 'mbnr', 'mle');
				   	  				win.show();
				   	  			break;
				   	  		}
			   	  }},
			   	  {text: '箱唛导入',	iconCls:'page_go',		itemId:'btn_imp3', menu: new Ext.menu.Menu({
	   	  		    			itemId:'sp_split',
	   	  		    			items:[
	   	  		    				{text:'箱唛导入',itemId:'btn_imp4',handler:function(btn){
	   	  		    					var jhhs=new Array();
	   	  		    					me.dStore.each(function(r){
	   	  		    						var jhh=r.get('jhh');
	   	  		    						if(jhh!=null&&jhh!=''){
	   	  		    							jhhs.push(r.get('jhh'));
	   	  		    						}
	   	  		    					})
	   	  		    					var jhhstr=Ext.encode(jhhs);
	   	  		    					var result = erp.Const.callServiceMethodSync(
											'purchasedetail/purchasecontract.act?method=getShippingLoadList', {
											jhhs:jhhstr
										});
										var data=Ext.decode(result);
										if(data.cgyq!=null&&data.cgyq!=''){
											me.down('#mle').setValue(data.cgyq);
										}
	   	  		    				}},
	   	  		    				{text:'箱唛备注导入',itemId:'btn_imp5',handler:function(btn){
	   	  		    					var drecs=new Array();
	   	  		    					me.dStore.each(function(r){
	   	  		    						drecs.push(r.data);
	   	  		    					})
	   	  		    					var recstr=Ext.encode(drecs);
	   	  		    					var result = erp.Const.callServiceMethodSync(
											'purchasedetail/purchasecontract.act?method=getShippingNotesLoadList', {
											recstr:recstr
										});
										var data=Ext.decode(result);
										var cdList=data.cdList;
										if(cdList!=null&&cdList!=''){
											me.dStore.each(function(r){
												Ext.each(cdList,function(rec){
													if(r.get('htxh')==rec.htxh){
														r.set('bzsm',rec.bzsm);
													}
												})
											})
										}
	   	  		    				}}
	   	  		    			]
	   	  		   }), disabled:true},
			   	  {text: '单价信息同步',	iconCls:'',		itemId:'PriceSync', menu: new Ext.menu.Menu({
	   	  		    			itemId:'sp_split',
	   	  		    			items:[
	   	  		    				{text:'合同单价',itemId:'btn_imp6',handler:function(btn){
	   	  		    					var s_htbh=me.down('#htbh').getValue();
	   	  		    					var csbh=me.down('#csbh').getValue();
	   	  		    					var grid=me.down('#ContractDetailGrid');
	   	  		    					var recs=grid.getSelectionModel().getSelection();
	   	  		    					var recArr=new Array();
	   	  		    					if(recs.length==0){
	   	  		    						Ext.toastInfo('请选择所要同步的记录(可多选)！');
	   	  		    						return ;
	   	  		    					}
	   	  		    					//如果是全选从后台刷新数据
										if(recs.length==grid.getStore().getCount()){
											//在单价信息同步前先 同步订单明细信息
    										erp.Util.storeSync(grid.getStore());
											var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getPriceLoadList',
											{
												csbh : csbh,
												htbh :"'"+s_htbh+"'",
												ip:ip,
												login_id:login_id
											});
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											grid.getStore().load();
										}else{
		   	  		    					Ext.each(recs,function(rec){
		   	  		    						recArr.push(rec.data);
		   	  		    					});
		   	  		    					var recStr=Ext.encode(recArr);
		   	  		    					var csbh=me.down('#csbh').getValue();
		   	  		    					var result = erp.Const.callServiceMethodSync(
												'purchasedetail/purchasecontract.act?method=getPriceLoadList', {
												recstr:recStr,csbh:csbh
											});
											var data=Ext.decode(result);
											if(!data.bool){
												Ext.toastErrorInfo(data.msg);
												return ;
											}
											var cdList=data.cdList;
											if(cdList!=null&&cdList!=''){
												me.dStore.each(function(r){
													Ext.each(cdList,function(rec){
														if(r.get('htxh')==rec.htxh){
															r.set('wbdj',rec.wbdj);
															r.set('wbje',rec.wbje);
															r.set('cgdj',rec.cgdj);
															r.set('cgje',rec.cgje);
														}
													})
												})
											}
										}
										Ext.toastInfo('以最新合同价格同步完成!');
	   	  		    				}},
	   	  		    				{text:'入库单价',itemId:'btn_imp7',handler:function(btn){
	   	  		    					var s_htbh=me.down('#htbh').getValue();
	   	  		    					var csbh=me.down('#csbh').getValue();
	   	  		    					var grid=me.down('#ContractDetailGrid');
	   	  		    					var recs=grid.getSelectionModel().getSelection();
	   	  		    					if(recs.length==0){
											Ext.toastErrorInfo("请至少选择一条记录！！！");
											return;
										}
										//如果是全选从后台刷新数据
										if(recs.length==grid.getStore().getCount()){
											//在单价信息同步前先 同步订单明细信息
    										erp.Util.storeSync(grid.getStore());
											var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getSippingPriceLoadList',
											{
												csbh : csbh,
												htbh :"'"+s_htbh+"'",
												ip:ip,
												login_id:login_id
											});
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											grid.getStore().load();
										}else{
		   	  		    					var recArr=new Array();
		   	  		    					Ext.each(recs,function(rec){
		   	  		    						recArr.push(rec.data);
		   	  		    					})
		   	  		    					var recStr=Ext.encode(recArr);
		   	  		    					var csbh=me.down('#csbh').getValue();
		   	  		    					var result = erp.Const.callServiceMethodSync(
												'purchasedetail/purchasecontract.act?method=getSippingPriceLoadList', {
												recstr:recStr,csbh:csbh
											});
											var data=Ext.decode(result);
											if(!data.bool){
												Ext.toastErrorInfo(data.msg);
												return ;
											}
											var cdList=data.cdList;
											if(cdList!=null&&cdList!=''){
												me.dStore.each(function(r){
													Ext.each(cdList,function(rec){
														if(r.get('htxh')==rec.htxh){
															r.set('wbdj',rec.wbdj);
															r.set('wbje',rec.wbje);
															r.set('cgdj',rec.cgdj);
															r.set('cgje',rec.cgje);
														}
													})
												})
											}
										}
										Ext.toastInfo('以最新入库价格同步完成!');
	   	  		    				}},
	   	  		    				{text:'控制单价',itemId:'btn_imp8',handler:function(btn){
	   	  		    					var s_htbh=me.down('#htbh').getValue();
	   	  		    					var csbh=me.down('#csbh').getValue();
	   	  		    					var grid=me.down('#ContractDetailGrid');
	   	  		    					var recs=grid.getSelectionModel().getSelection();
	   	  		    					if(recs.length==0){
											Ext.toastErrorInfo("请至少选择一条记录！！！");
											return ;
										}
										//如果是全选从后台刷新数据
										if(recs.length==grid.getStore().getCount()){
											//在单价信息同步前先 同步订单明细信息
    										erp.Util.storeSync(grid.getStore());
											var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getCtlPriceLoadList',
											{
												csbh : csbh,
												htbh :"'"+s_htbh+"'",
												ip:ip,
												login_id:login_id
											});
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											grid.getStore().load();
										}else{
		   	  		    					var recArr=new Array();
		   	  		    					Ext.each(recs,function(rec){
		   	  		    						recArr.push(rec.data);
		   	  		    					})
		   	  		    					var recStr=Ext.encode(recArr);
		   	  		    					var csbh=me.down('#csbh').getValue();
		   	  		    					var result = erp.Const.callServiceMethodSync(
												'purchasedetail/purchasecontract.act?method=getCtlPriceLoadList', {
												recstr:recStr,csbh:csbh
											});
											var data=Ext.decode(result);
											if(!data.bool){
												Ext.toastErrorInfo(data.msg);
												return ;
											}
											var cdList=data.cdList;
											if(cdList!=null&&cdList!=''){
												me.dStore.each(function(r){
													Ext.each(cdList,function(rec){
														if(r.get('htxh')==rec.htxh){
															r.set('wbdj',rec.wbdj);
															r.set('wbje',rec.wbje);
															r.set('cgdj',rec.cgdj);
															r.set('cgje',rec.cgje);
															r.set('kzdj',rec.kzdj);
														}
													})
												})
											}
										}
										Ext.toastInfo('以最新控制价格同步完成!');
	   	  		    				}},
	   	  		    				{text:'模具号',itemId:'btn_imp9',handler:function(btn){
	   	  		    					var s_htbh=me.down('#htbh').getValue();
	   	  		    					var csbh=me.down('#csbh').getValue();
	   	  		    					var grid=me.down('#ContractDetailGrid');
	   	  		    					var recs=grid.getSelectionModel().getSelection();
	   	  		    					if(recs.length==0){
											Ext.toastErrorInfo("请至少选择一条记录！！！");
											return;
										}
										//如果是全选从后台刷新数据
										if(recs.length==grid.getStore().getCount()){
											//在单价信息同步前先 同步订单明细信息
    										erp.Util.storeSync(grid.getStore());
											var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getModelLoadList',
											{
												csbh : csbh,
												htbh :"'"+s_htbh+"'",
												ip:ip,
												login_id:login_id
											});
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											grid.getStore().load();
										}else{
		   	  		    					var recArr=new Array();
		   	  		    					Ext.each(recs,function(rec){
		   	  		    						recArr.push(rec.data);
		   	  		    					})
		   	  		    					var recStr=Ext.encode(recArr);
		   	  		    					var csbh=me.down('#csbh').getValue();
		   	  		    					if(csbh==null||Ext.String.trim(csbh)==''){
		   	  		    						Ext.toastInfo('请选选择厂商!');
		   	  		    						return 
		   	  		    					}
		   	  		    					var result = erp.Const.callServiceMethodSync(
												'purchasedetail/purchasecontract.act?method=getModelLoadList', {
												recstr:recStr,csbh:csbh
											});
											var data=Ext.decode(result);
											if(!data.bool){
												Ext.toastErrorInfo(data.msg);
												return ;
											}
											var cdList=data.cdList;
											if(cdList!=null&&cdList!=''){
												me.dStore.each(function(r){
													Ext.each(cdList,function(rec){
														if(r.get('htxh')==rec.htxh){
															r.set('mjh',rec.mjh);
														}
													})
												})
											}
										}
										Ext.toastInfo('模具号同步完成!');
	   	  		    				}},
	   	  		    				{text:'采计数量',itemId:'btn_imp10',handler:function(btn){
	   	  		    					var s_htbh=me.down('#htbh').getValue();
	   	  		    					var grid=me.down('#ContractDetailGrid');
	   	  		    					var csbh=me.down('#csbh').getValue();
	   	  		    					var recs=grid.getSelectionModel().getSelection();
	   	  		    					var recArr=new Array();
	   	  		    					if(recs.length==0){
											Ext.toastErrorInfo("请至少选择一条记录！！！");
											return;
										}
										//如果是全选从后台刷新数据
										if(recs.length==grid.getStore().getCount()){
											//在单价信息同步前先 同步订单明细信息
    										erp.Util.storeSync(grid.getStore());
											var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getNumberLoadList',
											{
												csbh : csbh,
												htbh :"'"+s_htbh+"'",
												ip:ip,
												login_id:login_id
											});
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											grid.getStore().load();
										}else{
		   	  		    					Ext.each(recs,function(rec){
		   	  		    						var recd=rec.copy();
		   	  		    						recArr.push(recd.data);
		   	  		    					})
		   	  		    					var recStr=Ext.encode(recArr);
		   	  		    					var rowCount=me.subsidiaryStore.getCount();
		   	  		    					var dgyl=0;
		   	  		    					if(rowCount>0){
		   	  		    						dgyl=me.subsidiaryStore.getAt(0).get('dgyl');
		   	  		    					}
		   	  		    					var csbh=me.down('#csbh').getValue();
		   	  		    					var result = erp.Const.callServiceMethodSync(
												'purchasedetail/purchasecontract.act?method=getNumberLoadList', {
												recstr:recStr,csbh:csbh,rowCount:rowCount,dgyl:dgyl
											});
											var data=Ext.decode(result);
											if(!data.bool){
												Ext.toastErrorInfo(data.msg);
												return ;
											}
											var cdList=data.cdList;
											if(cdList!=null&&cdList!=''){
												me.dStore.each(function(r){
													Ext.each(cdList,function(rec){
														if(r.get('htxh')==rec.htxh){
															r.set('ycgl',rec.ycgl);
															r.set('cgsl',rec.cgsl);
															r.set('fzsl',rec.fzsl);
															r.set('cgdj',rec.cgdj);
															r.set('cgje',rec.cgje);
															r.set('wbje',rec.wbje);
															r.set('dlgs',rec.dlgs);
														}
													})
												})
											}
										}
										Ext.toastInfo('采计数量同步完成!');
	   	  		    				}}
	   	  		    			]
	   	  		  })},
			   	  {text: '价格计算',hidden:true,iconCls:'',itemId:'PriceCal',handler:function(btn){
			   	  		var grid=me.down('#ContractDetailGrid');
	   	  		    	var recs=grid.getSelectionModel().getSelection();
	   	  		    	if(recs.length==0){
	   	  		    		Ext.toastInfo('请选中某行或多行再使用此功能！');
	   	  		    		return ;
	   	  		    	}else{
	   	  		    		
	   	  		    	}
			   	  }},
			   	  {text: '汇总调整',	iconCls:'',		itemId:'Collect',handler:function(){
			   	  		var dStore=me.dStore;
			   	  		var upRecs=dStore.getUpdatedRecords();
		    			var newRecs=dStore.getNewRecords();
		    			var delRecs=dStore.getRemovedRecords();
		    			var form=me.down('#PurchaseContractForm');
				    	var rec=form.getRecord();
				    	form=form.updateRecord(rec);
		    			if(upRecs.length>0||newRecs.length>0||delRecs.length>0){
		    				dStore.sync({callback:function(batch,options){
			    				me.doCollect(rec.get('htbh'),dStore);
			    			}});
		    			}else{
		    				me.doCollect(rec.get('htbh'),dStore);
		    			}
			   	  }},
			   	  {text: '单价查询',	iconCls:'',		itemId:'priceSearch',handler:function(){
					var htbh=me.down('#htbh').getValue();
					if(htbh==0){
						Ext.toastInfo('请先保存数据！');
						return ;
					}
					var win=Ext.create('erp.view.purchaseOrder.window.PriceSearch',{
	    				htbh:htbh
	    			});
	    			win.show();
				}},
				  {text:'批量修改',iconCls:'page_edit',itemId:'BatchEdit',handler:function(){
				  		var tabPanel=me.down('#southPanel');
			   	  		var activeTab=tabPanel.activeTab;
			   	  		var myMask = new Ext.LoadMask({
							target : me
						});
						var dGrid=me.down('#ContractDetailGrid');
						var recs=dGrid.getSelectionModel().getSelection();
						if(recs.length==0){
							Ext.toastInfo('请选中某行或多行再使用此功能！');
	   	  		    		return ;
						}
						var rec=recs[0];
						if(rec.get('hsbm')==null||rec.get('hsbm')==''){
					        Ext.Msg.alert('提示','请先选择核算部门');
					        return false;
					    }else{
					        me.storeQuote.load({params:{hsbm:rec.get('hsbm')}});
					    }
					    var cglx=me.down('#cglx').getValue();
					    var vmd=me.getViewModel(); 
					    var iswb=vmd.getData().iswb;
						var win=Ext.create('erp.view.master.purchaseDetail.window.BatchChange',{
							width:400,
		    				height:320,
		    				title:'批量编辑',
		    				lay:'column',
		    				item:[{
			                    name      : 'kjlx_c',
			                    xtype 	  :'checkbox',
			                    inputValue: '1',
			                    itemId     : 'kjlx_c',
			                    columnWidth: 0.2
		                	},{
			                    xtype:'combo',
			                    itemId: 'kjlx',
			                    fieldLabel:'控价类型',
			                    name:'kjlx',
			   	  	  			store:[[0,'主控价'],[1,'辅控价']],
			                    columnWidth: 0.8,
			                    listeners:{
									change :function(o,  newValue,  oldValue,  eOpts){
											this.previousSibling().setValue(true);
				                   	}
								}
		                	},
		                	
		                	{
			                    name      : 'jhrq_c',
			                    xtype 	  :'checkbox',
			                    hidden:cglx=='常规',
			                    inputValue: '1',
			                    itemId     : 'jhrq_c',
			                    columnWidth: 0.2
		                	},{
			                    xtype:'combo',
			                    itemId: 'jhrq',
			                    xtype:'datefield',
			                    hidden:cglx=='常规',
			   	  	  			format:'Y.m.d',
			                    fieldLabel:'交货日期',
			                    name:'jhrq',
			                    columnWidth: 0.8,
			                    listeners:{
									change :function(o,  newValue,  oldValue,  eOpts){
											this.previousSibling().setValue(true);
				                   	}
								}
		                	},
		                	
		                	{
			                    name      : 'sdck_c',
			                    xtype 	  :'checkbox',
			                    inputValue: '1',
			                    itemId     : 'sdck_c',
			                    columnWidth: 0.2
		                	},{
			                    xtype:'combo',
			                    itemId: 'sdck',
			                    fieldLabel:'送达仓库',
			                    name:'sdck',
			                    xtype:'combo',
			   	  	  			typeAhead:true,
			   	  	  			store:me.storeQuote,
								queryMode : 'local',
								displayField:'ckmc',
								valueField:'ckbh',
								selectOnFocus:true,
			                    columnWidth: 0.8,
			                    listeners:{
			                    	focus:function(){
			                    		var win=this.up('window');
			                    		var hsbm=win.down('#hsbm').getValue();
			                    		if(rec.get('hsbm')==null||rec.get('hsbm')==''){
			                    			if(hsbm==null||hsbm==''){
										        Ext.Msg.alert('提示','请先选择核算部门');
										        return false;
										    }
									    }
									    if(hsbm!=''&&hsbm!=null){
									        me.storeQuote.load({params:{hsbm:hsbm}});
									    }else{
									        me.storeQuote.load({params:{hsbm:rec.get('hsbm')}});
									    }
									},
									change :function(o,  newValue,  oldValue,  eOpts){
											this.previousSibling().setValue(true);
				                   	}
								}
		                	},
		                	
		                	{
			                    name      : 'cgrq_c',
			                    xtype 	  :'checkbox',
			                    inputValue: '1',
			                    hidden:cglx=='常规',
			                    itemId     : 'cgrq_c',
			                    columnWidth: 0.2
		                	},{
			                    xtype:'combo',
			                    itemId: 'cgrq',
			                    xtype:'datefield',
			                    hidden:cglx=='常规',
			   	  	  			format:'Y.m.d',
			                    fieldLabel:'采购日期',
			                    name:'cgrq',
			                    columnWidth: 0.8,
			                    listeners:{
									change :function(o,  newValue,  oldValue,  eOpts){
											this.previousSibling().setValue(true);
				                   	}
								}
		                	},
		                	
		                	{
			                    name      : 'cgdj_c',
			                    xtype 	  :'checkbox',
			                    inputValue: '1',
			                    itemId     : 'cgdj_c',
			                    hidden:!iswb,
			                    columnWidth: 0.2
		                	},{
			                    itemId: 'cgdj',
			                    xtype:'numberfield',
			   	  	  			decimalPrecision:4,
			   	  	  			hidden:!iswb,
			                    fieldLabel:'采购单价',
			                    name:'cgdj',
			                    columnWidth: 0.8,
			                    listeners:{
									change :function(o,  newValue,  oldValue,  eOpts){
											this.previousSibling().setValue(true);
				                   	}
								}
		                	},
		                	
		                	{
			                    name      : 'wbdj_c',
			                    xtype 	  :'checkbox',
			                    inputValue: '1',
			                    hidden:iswb,
			                    itemId     : 'wbdj_c',
			                    columnWidth: 0.2
		                	},{
			                    itemId: 'wbdj',
			                    xtype:'numberfield',
			   	  	  			decimalPrecision:4,
			                    fieldLabel:'外币单价',
			                    name:'wbdj',
			                    hidden:iswb,
			                    columnWidth: 0.8,
			                    listeners:{
									change :function(o,  newValue,  oldValue,  eOpts){
											this.previousSibling().setValue(true);
				                   	}
								}
		                	},
		                	
		                	{
			                    name      : 'cgbz_c',
			                    xtype 	  :'checkbox',
			                    inputValue: '1',
			                    itemId     : 'cgbz_c',
			                    columnWidth: 0.2
		                	},{
			                    itemId: 'cgbz',
			                    xtype:'textfield',
			   	  	  			decimalPrecision:4,
			                    fieldLabel:'备注说明',
			                    name:'cgbz',
			                    columnWidth: 0.8,
			                    listeners:{
									change :function(o,  newValue,  oldValue,  eOpts){
											this.previousSibling().setValue(true);
				                   	}
								}
		                	},
		                	{
			                    name      : 'zzsl_c',
			                    xtype 	  :'checkbox',
			                    inputValue: '1',
			                    itemId     : 'zzsl_c',
			                    columnWidth: 0.2
		                	},{
			                    itemId: 'zzsl',
			                    xtype:'numberfield',
			   	  	  			decimalPrecision:4,
			                    fieldLabel:'税率',
			                    name:'zzsl',
			                    columnWidth: 0.8,
			                    maxValue:1,
			                    listeners:{
									change :function(o,  newValue,  oldValue,  eOpts){
											this.previousSibling().setValue(true);
				                   	}
								}
		                	},
		                	{
			                    name      : 'hsbm_c',
			                    xtype 	  :'checkbox',
			                    inputValue: '1',
			                    itemId     : 'hsbm_c',
			                    columnWidth: 0.2
		                	},{
			                    xtype:'combo',
			                    itemId: 'hsbm',
			                    fieldLabel:'核算部门',
			                    xtype:'comboxTree',
			   	  	  			store:me.accountDeptStore,
			   	  	  			displayField : 'text',
						   		valueField: 'nodeId',
			                    columnWidth: 0.8,
			                    listeners:{
			                    	beforerender:function(c){
										var picker=c.getPicker();
										picker.expandAll();//展开所有，加载所有
						   			},
			                    	select:function(o,  newValue,  oldValue,  eOpts){
			                    		if(this.previousSibling()){
											this.previousSibling().setValue(true);
			                    		}	
			                    	},
									change :function(o,  newValue,  oldValue,  eOpts){
										this.previousSibling().setValue(true);
				                   	}
								}
		                	}
		                	]
						});
						win.down('#BTN_YES').on({
							click:function(btn){
								var csbh=me.down('#csbh').getValue();
								var win=btn.up('window');
								var kjlx_c=win.down('#kjlx_c').getValue();
								var jhrq_c=win.down('#jhrq_c').getValue();
								var sdck_c=win.down('#sdck_c').getValue();
								var cgrq_c=win.down('#cgrq_c').getValue();
								var cgdj_c=win.down('#cgdj_c').getValue();
								var cgbz_c=win.down('#cgbz_c').getValue();
								var zzsl_c=win.down('#zzsl_c').getValue();
								var wbdj_c=win.down('#wbdj_c').getValue();
								var login_id=erp.Util.currentUser.loginId;
    							var ip=erp.Util.currentUser.IP;
    							var s_htbh=me.down('#htbh').getValue();
    							var hsbm_c=win.down('#hsbm_c').getValue();
								//如果全选刷新所有数据
								if(me.dStore.getCount()==recs.length){
									var sql="	update htmxb_tmp set htxh =htxh ";
						    		if(zzsl_c){
						    			sql+=" ,zzsl ='"+win.down('#zzsl').getValue()+"'";
									}
									if(hsbm_c){
										sql+=" ,hsbm ='"+win.down('#hsbm').getValue()+"'";
									}
									if(cgbz_c){
										sql+=" ,bzsm ='"+win.down('#cgbz').getValue()+"'";
									}
									if(cgdj_c){
						        		sql+=" ,cgdj ='"+win.down('#cgdj').getValue()+"'";
									}
									if(wbdj_c){
										var wbdj=win.down('#wbdj').getValue();
										sql+=" ,wbdj ="+wbdj;
										sql+=" ,cgdj = case when cgsl>0 then "
										sql+="	case when kjlx =0 then "
										sql+="	round(round(round(cgsl*"+wbdj+",2)*wbhl,2)/cgsl,4) "
										sql+="		else case when fzsl >0 then "
										sql+="	round(round(round(cgsl*"+wbdj+",2)*wbhl,2)/fzsl,4) "
										sql+="		else cgdj end end "
										sql+="	else cgdj end "
									}
									if(kjlx_c){
										var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getKjlxWithOutAll',
										{
											htbh :"'"+s_htbh+"'",
											ip:ip,
											login_id:login_id,
											csbh : csbh,
											kjlx:win.down('#kjlx').getValue()
										});
										var data = Ext.decode(result);
										if (!data.bool) {
											Ext.toastErrorInfo(data.msg);
											return;
										}
									}
									if(jhrq_c){
										var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getGhzqWithOutAll',{
											htbh :"'"+s_htbh+"'",
											ip:ip,
											login_id:login_id,
											csbh : csbh,
											jhrq:Ext.util.Format.date(win.down('#jhrq').getValue(),'Y-m-d H:i:s')
										});
										var data = Ext.decode(result);
										if (!data.bool) {
											Ext.toastErrorInfo(data.msg);
											return;
										}
									}
									if(sdck_c){
										sql+=" ,sdck ="+win.down('#sdck').getValue();
									}
									if(cgrq_c){
										var cgrq=win.down('#cgrq').getValue();
										var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getCgrqWithOutAll',
										{
											htbh :"'"+s_htbh+"'",
											ip:ip,
											login_id:login_id,
											csbh : csbh,
											cgrq:Ext.util.Format.date(win.down('#cgrq').getValue(),'Y-m-d H:i:s')
										});
										var data = Ext.decode(result);
										if (!data.bool) {
											Ext.toastErrorInfo(data.msg);
											return;
										}
									}
									sql+=" where htbh='"+me.down('#htbh').getValue()+"'";
						    		sql+=" and ip ='"+ip+"' and login_id='"+login_id+"'";
									var result = erp.Const.callServiceMethodSync(
										'purchaseorder/purchaseorderdetail.act?method=getStringFromSql', {
										sql:sql
									});
									var data = Ext.decode(result);
									if (!data.bool) {
										Ext.toastErrorInfo(data.msg);
										return;
									}
									dGrid.getStore().load();
								}else{
									Ext.each(recs,function(r){
										if(zzsl_c){
											r.set('zzsl',win.down('#zzsl').getValue());
										}
										if(cgbz_c){
											r.set('bzsm',win.down('#cgbz').getValue());
										}
										if(hsbm_c){
											r.set('hsbm',win.down('#hsbm').getValue());
										}
										if(cgdj_c){
											r.set('cgdj',win.down('#cgdj').getValue());
											var s_kjlx=r.get('kjlx'),
						        			s_cgsl=r.get('cgsl'),
						        			s_fzsl=r.get('fzsl'),
						        			s_cgdj=r.get('cgdj');
						        			var s_cgje=0;
						        			if(s_kjlx!=1){
						        				s_cgje=me.round(s_cgsl*s_cgdj,2);
						        			}else{
						        				s_cgje=me.round(s_fzsl*s_cgdj,2);
						        			}
						        			r.set('cgje',s_cgje);
										}
										if(wbdj_c){
											var s_kjlx=r.get('kjlx'),
					        				s_cgsl=r.get('cgsl'),
					        				s_fzsl=r.get('fzsl'),
					        				s_wbhl=r.get('wbhl'),
					        				s_wbje=r.get('wbje'),
					        				s_wbdj=win.down('#wbdj').getValue();
					        				if(s_kjlx!=1){
					        					s_wbje=me.round(s_cgsl*s_wbdj,2);
					        				}else{
					        					s_wbje=me.round(s_fzsl*s_wbdj,2);
					        				}
					        				s_cgje=me.round(s_wbje*s_wbhl,2);
					        				if(s_cgsl!=0){
					        					if(s_kjlx!=1){
					        						s_cgdj=me.round(s_cgje/s_cgsl,4);
					        					}else{
					        						s_cgdj=me.round(s_cgje/s_fzsl,4);
					        					}
					        				}
					        				r.set('wbdj',win.down('#wbdj').getValue());
					        				r.set('cgdj',s_cgdj);
					        				r.set('cgje',s_cgje);
					        				r.set('wbje',s_wbje);
										}
										if(kjlx_c){
											var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getKjlxWithOut',
											{
												recstr : Ext.encode(r.data),
												csbh : csbh
											});
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											var cd=data.cd;
											if(cd!=null){
												r.set('kzdj',cd.kzdj);
												r.set('wbbh',cd.wbbh);
												r.set('wbhl',cd.wbhl);
												r.set('cgdj',cd.cgdj);
												r.set('wbje',cd.wbje);
												r.set('wbdj',cd.wbdj);
												r.set('cgje',cd.cgje);
											}
											r.set('kjlx',win.down('#kjlx').getValue());
										}
										if(jhrq_c){
											r.set('jhrq',win.down('#jhrq').getValue());
											var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getGhzqWithOut',
												{
													recstr : Ext.encode(r.data),
													csbh : csbh
												});
												var data = Ext.decode(result);
												if (!data.bool) {
													Ext.toastErrorInfo(data.msg);
													return;
												}
												var cd=data.cd;
												if(cd!=null){
													r.set('cgje',cd.cgje);
													r.set('cgdj',cd.cgdj);
													r.set('wbhl',cd.wbhl);
													r.set('cgrq',cd.cgrq);
												}
										}
										if(sdck_c){
											var sdck=win.down('#sdck').getValue();
											var srec=me.storeQuote.findRecord('ckbh',sdck);
											r.set('sdck',sdck);
						        			if(srec!=null){
						        				r.set('sdckmc',srec.get('ckmc'));
						        			}
										}
										if(cgrq_c){
											var cgrq=win.down('#cgrq').getValue();
											r.set('cgrq',cgrq);
											var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getCgrqWithOut',
												{
													recstr : Ext.encode(r.data),
													csbh : csbh
												});
												var data = Ext.decode(result);
												if (!data.bool) {
													Ext.toastErrorInfo(data.msg);
													return;
												}
												var cd=data.cd;
												if(cd!=null){
													r.set('cgje',cd.cgje);
													r.set('cgdj',cd.cgdj);
													r.set('wbhl',cd.wbhl);
												}
										}
									})
									dGrid.getStore().load();//批量修改之后实时保存数据
								}
								win.close();
							}
						})
						win.show();
				  }},
				  {text: '保存',iconCls:'page_save',itemId:'BTN_SAVE',disabled:!me.isEdit,handler:function(btn){
				  		var form=me.down('#PurchaseContractForm');
				  		var czym=erp.Util.currentUser.userInfo.name;
				  		var rec=form.getRecord();
				  		form.updateRecord(rec);
				  		var zlbj=me.down('#zlbj').getValue();
				    	if(zlbj){
				    		rec.set('zlbj',1);
				    	}else{
				    		rec.set('zlbj',0);
				    	}
				  		var s_htbh,s_ztdw,cglx,htgz,qzgz,cgym,ls_cgybh,s_cglb,
				  		s_htbh=rec.get('htbh'),
				  		s_ztdw=rec.get('ztdw'),
				  		s_cglx=rec.get('cglx'),
				  		s_htgz=rec.get('htgz'),
				  		s_qzgz=rec.get('qzgz'),
				  		ls_cgybh=rec.get('cgym'),
				  		s_cglb=rec.get('cglb'),
				  		cgbz=rec.get('cgbz'),
				  		s_zlcsbh=rec.get('zlcsbh');
				  		if(rec.get('zlbj')==1&&(s_zlcsbh==null||Ext.String.trim(s_zlcsbh)=='')){
		    				Ext.Msg.alert('提示','专利厂商不能为空！');
		    				return;
		    			}
		    			if(erp.Util.gettextlength(cgbz)>=60){
		    				Ext.toastInfo('备注过长请调整！');
		    				return;
		    			}
				  		if(s_cglx==null||s_cglx==''){
				  			Ext.Msg.alert('提示',"合同类型不能为空！");
				  			return ;
				  		}
				  		if(s_htgz==null||s_htgz==''){
				  			Ext.Msg.alert('提示',"合同规则不能为空！");
				  			return ;
				  		}
				  		if(s_qzgz==null||s_qzgz==''){
				  			Ext.Msg.alert('提示',"取整规则不能为空！");
				  			return ;
				  		}
				  		if(s_cglb==null||s_cglb==''){
				  			Ext.Msg.alert('提示',"采购类别不能为空！");
				  			return ;
				  		}
				  		if(s_ztdw==null||s_ztdw==''){
				  			Ext.Msg.alert('提示',"主体单位不能为空！");
				  			return ;
				  		}
				  		//赋值
						rec.set('httk',me.down('#httk').getValue());
						rec.set('cgyq',me.down('#mle').getValue());
						
						var cgStore=me.down('#cgym').store;
		    			ls_cgym='';
		    			var cgrec=cgStore.findRecord('cgybh',ls_cgybh);
		    			if(cgrec!=null){
		    				ls_cgym=cgrec.get('cgyxm');
		    			}
		    			if(ls_cgybh==null||Ext.String.trim(ls_cgybh)==''){
		    				Ext.Msg.alert('提示','采购员不能为空！');
		    				return ;
		    			}else{
		    				if(Ext.String.trim(ls_cgym)!=Ext.String.trim(czym)){
		    					var bool=confirm('采购员与操作员不一致');
		    					if(!bool){
		    						return ;
		    					}
		    				}
		    			}
				  		/*
		    			 * 检测明细数据
		    			 * 1.将当前数据保存进临时表(先判断是否有脏数据)
		    			 * 2.调用保存方法
		    			 * **/
						/*var dStore=me.dStore;
		    			var upRecs=dStore.getUpdatedRecords();
		    			var newRecs=dStore.getNewRecords();
		    			var delRecs=dStore.getRemovedRecords();
		    			if(upRecs.length>0||newRecs.length>0||delRecs.length>0){
		    				dStore.sync({callback:function(batch,options){
			    				me.saveAll(rec,czym,me,me.mStore);
			    			}});
		    			}else{
		    				me.saveAll(rec,czym,me,me.mStore);
		    			}*/
				  		erp.Util.storeSync(me.dStore);//保存明细数据
		    			erp.Util.storeSync(me.outSourceStore);//保存外协数据
		    			erp.Util.storeSync(me.subsidiaryStore);//保存附加信息
		    			me.saveAll(rec,czym,me,me.mStore);
				  }}
			]
	    }],
	    Ext.apply(me,{
	    	items:[{
		        region: 'center',
		        xtype:'form',
		        reference:'PurchaseContractForm',
		        itemId:'PurchaseContractForm',
				store:me.store,
				flex:140,
				layout:'fit',
				items:[{
					xtype:'fieldset',
					autoScroll:true,
					margin:'5 5 5 5',
					layout:'column',
			    	defaults: {
						xtype: 'textfield',
						readOnly:!me.isEdit,
						margin:'5 5 5 5',
						labelWidth:65,
						columnWidth: .12
					},
					items:[{
			  			fieldLabel:'合同编号',
			  			itemId:'htbh',
					   	name : 'htbh',
					   	readOnly:true
			  		},{
			  			itemId:'http',
					   	name : 'http',
					   	xtype:'textfield',
					   	hidden:true
			  		},{
			  			fieldLabel:'合同类型',
			  			itemId:'cglx',
					   	name : 'cglx',
					   	forceSelection:true,
					   	allowBlank:false,
					   	xtype:'combo',
					   	store:[['常规','常规'],['双经销','双经销'],['外协','外协'],['特殊','特殊'],[1,'空']]
			  		},{
			  			fieldLabel:'合同规则',
			  			itemId:'htgz',
					   	name : 'htgz',
					   	xtype:'combo',
					   	forceSelection:true,
					   	allowBlank:false,
					   	store:[['常规','常规'],['最低采购量','最低采购量']]
			  		},{
			  			fieldLabel:'取整规则',
			  			itemId:'qzgz',
			  			name:'qzgz',
					   	xtype:'combo',
					   	allowBlank:false,
					   	forceSelection:true,
					   	store:[['常规','常规'],['十位取整','十位取整']]
			  		},
			  		{
			  			fieldLabel:'采购类别',
			  			itemId:'cglb',
			  			name:'cglb',
			  			xtype:'comboxTree',
			  			allowBlank:false,
						fieldConfig:{forceSelection:true},
						columnWidth: .25,
						store : me.cateTreeStore,
						displayField : 'text',
						valueField: 'nodeId',
						listeners:{
						   	'select':function(obj,rec){
						   		if(rec!=null){
						   			var lbbh = rec.get('nodeId');
    		                        if(!rec.get('leaf')){
    			                       Ext.Msg.alert('提示','该采购类别不是末级类别，请选择末级列别!');
    			                       me.down('#cglb').setValue("");
    			                       return;
    	                            }
						   		}
						   	}
						}
			  		},
			  		{
						name : 'cglx_fk',
						itemId:'cglx_fk',
						fieldLabel:'采购类型',
						xtype:'combo',
						store:[[0,'正常采购'],[1,'零星采购']],
						fieldConfig:{forceSelection:false},
						listeners:{
						   	'select':function(obj,recs){
						   	}
						}
			  		},
			  		{
						name : 'cgym',
						itemId:'cgym',
						fieldLabel:'采购员名',
						xtype:'helpField',
						columnWidth: .15,
						code : erp.DataConst.PurGroupMan,
						fieldConfig:{forceSelection:false},
						listeners:{
						   	'select':function(obj,recs){
						   	}
						}
			  		},
			  		
			  		{
						name : 'ztdw',
						itemId:'ztdw',
						fieldLabel:'主体单位',
						columnWidth: .3,
						typeAhead:true,
						xtype:'combo',
						queryMode : 'local',
						allowBlank:false,
						displayField:'ztmc',
						valueField:'ztbh',
						selectOnFocus:true,
						store:me.MainUnitStore,
						fieldConfig:{forceSelection:true},
						listeners:{
						   	'select':function(obj,recs){
						   	}
						}
			  		},{
			  			fieldLabel:'供货厂商',
			  			itemId:'csbh',
			  			name:'csbh',
			  			xtype:'helpField',
						code : erp.DataConst.FACTORYINFO,
						fieldConfig:{forceSelection:true},
						columnWidth: .4,
						allowBlank:false,
						listeners:{
							change :function(o,  newValue,  oldValue,  eOpts){
								if(o.displayTplData!=null){
									var data=o.displayTplData;
									if(data.length>0){
										var rec=data[0];
										var vmd=me.getViewModel(); 
										if(rec.wbdh!=null&rec.wbdh!=''){
											vmd.setData({iswb:false});
										}else{
											vmd.setData({iswb:true});
										}
										if(me.isinit){
											me.loadCglbStore(rec.cglb);
											if(rec.cglb!=null&&rec.cglb!=''){
												me.down('#cglb').setValue(rec.cglb);
											}
											me.down('#cslxr').setValue(rec.lxrm);
											me.down('#ztdw').setValue(rec.ztdw);
										}
									}
								}
								if(newValue!=null&&newValue!=''&&me.isinit&&!me.isSave){
									me.csbhChange(newValue);
								}
								me.isinit=true;
		                    }
						}
			  		},{
						name : 'cslxr',
						itemId:'cslxr',
						fieldLabel:'厂商联系人',
						labelWidth:70,
						columnWidth: .3,
						xtype:'textfield'
			  		},{
						name : 'cgbz',
						itemId:'cgbz',
						fieldLabel:'备注说明',
						columnWidth: .4,
						xtype:'textfield'
			  		},{
	           			fieldLabel:"专利费",
	           			itemId:'zlbj',
	           			labelWidth:60,
						name:'zlbj',
						xtype:'checkbox',
						inputValue:'1',
						columnWidth:.08,
						listeners:{
							change :function(o,  newValue,  oldValue,  eOpts){
								if(newValue){
									me.down('#zlcsbh').setVisible(true);
								}else{
									me.down('#zlcsbh').setVisible(false);
									//取消币种和专利单价
									me.down('#zlwbmc').setValue('');
									me.down('#zlcsbh').setValue('');
									me.cancelZldj();
								}
		                    }
						}
	           		},
	           		{
	           			fieldLabel:"专利币种",
	           			itemId:'zlwbmc',
						name:'zlwbmc',
						readOnly:true,
						xtype:'textfield',
						columnWidth:.12
	           		},
	           		{
	           			fieldLabel:"专利厂商",
			  			itemId:'zlcsbh',
			  			name:'zlcsbh',
			  			xtype:'helpField',
			  			allowBlank:false,
						code : erp.DataConst.FACTORYINFO,
						fieldConfig:{forceSelection:true},
						listeners:{
							change :function(o,  newValue,  oldValue,  eOpts){
								if(o.displayTplData!=null){
									var recs=o.displayTplData;
									if(recs[0]!=null){
										me.down('#zlwbmc').setValue(recs[0].wbmc);
									}
								}
		                    }
						},
						columnWidth:.4
	           		}]
				}]
			},{
				xtype:'tabpanel',
				region: 'south',
				itemId:'southPanel',
				split:true,
				flex:680,
				listeners:{
					tabchange:function(tabPanel,newCard,oldCard){
						var title=newCard.title;
						me.down('#materialImp').setDisabled(true);
						me.down('#materialCopy').setDisabled(true);
						me.down('#materialPaste').setDisabled(true);
						switch(title){
							case '领料明细':
								me.down('#materialImp').setDisabled(false);
								me.down('#materialCopy').setDisabled(false);
								me.down('#materialPaste').setDisabled(false);
							break;
							case '合同明细':
								me.down('#template').setDisabled(true);
								me.down('#btn_imp3').setDisabled(true);
								me.down('#Add').setDisabled(false);
								me.down('#Del').setDisabled(false);
								me.down('#PriceSync').setDisabled(false);
							break;
							case '合同条款':
								me.down('#btn_imp3').setDisabled(true);
								me.down('#template').setDisabled(false);
								me.down('#Add').setDisabled(true);
								me.down('#Del').setDisabled(true);
								me.down('#PriceSync').setDisabled(true);
							break;
							case '采购要求':
								me.down('#PriceSync').setDisabled(true);
								me.down('#btn_imp3').setDisabled(false);
								me.down('#template').setDisabled(false);
								me.down('#Add').setDisabled(false);
								me.down('#Del').setDisabled(false);
							break;
							case '包装拆分':
								me.down('#PriceSync').setDisabled(false);
								me.down('#btn_imp3').setDisabled(false);
								me.down('#Add').setDisabled(false);
								me.down('#Del').setDisabled(false);
							break;
						}
					}
				},
			    items:[{
			    	title:'合同明细',
			    	xtype:'panel',
			    	layout: {
				        type: 'vbox',
				        align: 'stretch'
				    },
			    	items:[{
						xtype:'grid',
				    	reference:'ContractDetailGrid',
			        	itemId:'ContractDetailGrid',
				    	flex:2,
				    	selModel:Ext.create('Ext.selection.CheckboxModel'),
				    	plugins: Ext.create('Ext.grid.plugin.CellEditing', {
					        ptype: 'cellediting',
					        autoCancel: false,
					        listeners:{
					        	beforeedit:function(editor,con,e){
					        		if(!me.isEdit){
					        			return false;
					        		}
					        		var field=con.field;
					        		var rec=con.record;
					        		switch(field){
					        			case 'cgdj':
					        			case 'cgje':
					        				var vmd=me.getViewModel(); 
					        				var iswb=vmd.getData().iswb;
					        				if(!iswb){
					        					return false;
					        				}
					        			break;
					        			case 'jhrq':
					        			case 'cgrq':
					        				var cglx=me.down('#cglx').getValue();
					        				if(cglx=='常规'){
					        					return false;
					        				}
					        			break;
					        			case 'fzsl':
					        				if(rec.get('fzzbj')==0){
					        					return false;
					        				}
					        			break;
					        			case 'sdck':
					        				if(rec.get('hsbm')==null||rec.get('hsbm')==''){
					        					Ext.Msg.alert('提示','请先选择核算部门');
					        					return false;
					        				}else{
					        					me.storeQuote.load({params:{hsbm:rec.get('hsbm')}});
					        				}
					        			break;
					        			case 'hsbm':
					        			break;
					        			case 'zldj':
					        				var zlbj=me.down('#zlbj').getValue();
					        				if(!zlbj){
					        					return false;
					        				}
					        			break;
					        			case 'cgsl':
					        				if(rec.get('requestid')!=null){
					        					return false;
					        				}
					        			break;
					        		}
					        	},
					        	edit:function(editor,con,e){
					        		//console.log(editor);
					        		//console.log(con);
					        		var field=con.field;
					        		var rec=con.record;
					        		var s_kjlx,s_clhh,s_cgsl,s_fzsl,s_cgdj,s_cgje,s_wbhl,s_wbje;
					        		if(con.originalValue==con.value){
					        			return ;
					        		}
					        		var csbh=me.down('#csbh').getValue();
					        		switch(field){
					        			case 'hsbm':
					        				var srec=me.accountDeptStore.findRecord('nodeId',con.value);
					        				if(srec!=null){
					        					rec.set('hsbmmc',srec.get('text'));
					        				}
					        			break;
					        			case 'sdck':
					        				var srec=me.storeQuote.findRecord('ckbh',con.value);
					        				if(srec!=null){
					        					rec.set('sdckmc',srec.get('ckmc'));
					        				}
					        			break;
					        			case 'clmc':
					        				var csbh=me.down('#csbh').getValue();
					        				var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getClmcWithOut',
											{
												recstr : Ext.encode(rec.data),
												csbh : csbh
											});
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											var cd=data.cd;
											if(cd!=null){
												//rec.set('clmc',cd.clmc);
												rec.set('clth',cd.clth);
												rec.set('wbbh',cd.wbbh);
												rec.set('wbhl',cd.wbhl);
												rec.set('cgdj',cd.cgdj);
												rec.set('cgje',cd.cgje);
												rec.set('wbdj',cd.wbdj);
												rec.set('wbje',cd.wbje);
												rec.set('cgrq',cd.cgrq);
												rec.set('fzsl',cd.fzsl);
												rec.set('cgsl',cd.cgsl);
												rec.set('ghzq',cd.ghzq);
												rec.set('txgz',cd.txgz);
												rec.set('zzhxs',cd.zzhxs);
												rec.set('fzzbj',cd.fzzbj);
												rec.set('fzdw',cd.fzdw);
												rec.set('fzzbj',cd.fzzbj);
												rec.set('zzhxs',cd.zzhxs);
												rec.set('clhh',cd.clhh);
												rec.set('clmc',cd.clmc);
												rec.set('jldw',cd.jldw);
												rec.set('fzdw',cd.fzdw);
											}
					        			break;
					        			case 'kjlx':
					        				if(con.originalValue==con.value){
					        					break;
					        				}
					        				var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getKjlxWithOut',
											{
												recstr : Ext.encode(rec.data),
												csbh : csbh
											});
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											var cd=data.cd;
											if(cd!=null){
												rec.set('kzdj',cd.kzdj);
												rec.set('wbbh',cd.wbbh);
												rec.set('wbhl',cd.wbhl);
												rec.set('cgdj',cd.cgdj);
												rec.set('wbje',cd.wbje);
												rec.set('wbdj',cd.wbdj);
												rec.set('cgje',cd.cgje);
											}
					        			break;
					        			case 'cgrq':
					        				if(con.originalValue==con.value){
					        					break;
					        				}
					        				var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getCgrqWithOut',
											{
												recstr : Ext.encode(rec.data),
												csbh : csbh
											});
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											var cd=data.cd;
											if(cd!=null){
												rec.set('cgje',cd.cgje);
												rec.set('cgdj',cd.cgdj);
												rec.set('wbhl',cd.wbhl);
											}
					        			break;
					        			case 'jhrq':
					        			case 'ghzq':
					        				if(con.originalValue==con.value){
					        					break;
					        				}
					        				var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getGhzqWithOut',
											{
												recstr : Ext.encode(rec.data),
												csbh : csbh
											});
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											var cd=data.cd;
											if(cd!=null){
												rec.set('cgje',cd.cgje);
												rec.set('cgdj',cd.cgdj);
												rec.set('cgrq',cd.cgrq);
											}
					        			break;
					        			case 'cgsl':
					        				if(con.originalValue==con.value){
					        					break;
					        				}
						        			var dgyl=0;
						        			var rowCount=me.subsidiaryStore.getCount();
		   	  		    					if(rowCount>0){
		   	  		    						dgyl=me.subsidiaryStore.getAt(0).get('dgyl');
		   	  		    					}
		   	  		    					var recd=rec.copy();
		   	  		    					var cltx1=rec.get('cltx1');
		   	  		    					var clgg=0;
					        				var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getCgslWithOut',
											{
												recstr : Ext.encode(recd.data),
												csbh : csbh,
												dgyl : dgyl
											});
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											var cd=data.cd;
											if(cd!=null){
												rec.set('cgdj',cd.cgdj);
												rec.set('dlgs',cd.dlgs);
												rec.set('cgje',cd.cgje);
												rec.set('wbje',cd.wbje);
												rec.set('ycgl',cd.ycgl);
												rec.set('fzsl',cd.fzsl);
											}
					        			break;
					        			case 'cgdj':
					        				s_kjlx=rec.get('kjlx');
					        				s_cgsl=rec.get('cgsl');
					        				s_fzsl=rec.get('fzsl');
					        				s_cgdj=rec.get('cgdj');
					        				var s_cgje=0;
					        				if(s_kjlx!=1){
					        					s_cgje=me.round(s_cgsl*s_cgdj,2);
					        				}else{
					        					s_cgje=me.round(s_fzsl*s_cgdj,2);
					        				}
					        				rec.set('cgje',s_cgje);
					        			break;
					        			case 'cgje':
					        				s_kjlx=rec.get('kjlx');
					        				s_cgsl=rec.get('cgsl');
					        				s_fzsl=rec.get('fzsl');
					        				s_cgje=rec.get('cgje');
					        				if(s_cgsl>0){
					        					if(s_kjlx!=1){
					        						s_cgdj=me.round(s_cgje/s_cgsl,4);
					        					}else{
					        						s_cgdj=me.round(s_cgje/s_fzsl,4);
					        					}
					        				}
					        				rec.set('cgdj',s_cgdj);
					        			break;
					        			case 'wbhl':
					        				s_kjlx=rec.get('kjlx');
					        				s_cgsl=rec.get('cgsl');
					        				s_fzsl=rec.get('fzsl');
					        				s_wbhl=rec.get('wbhl');
					        				s_wbje=rec.get('wbje');
					        				s_cgje=me.round(s_wbje/s_cgsl,4);
					        				if(s_cgsl!=0){
					        					if(s_kjle!=1){
					        						s_cgdj=me.round(s_cgje/s_cgsl,4);
					        					}else{
					        						s_cgdj=me.round(s_cgje/s_fzsl,4);
					        					}
					        				}else{
					        					s_cgdj=0;
					        				}
					        				rec.set('cgdj',s_cgdj);
					        				rec.set('cgje',s_cgje);
					        			break;
					        			case 'wbdj':
					        				s_kjlx=rec.get('kjlx');
					        				s_cgsl=rec.get('cgsl');
					        				s_fzsl=rec.get('fzsl');
					        				s_wbhl=rec.get('wbhl');
					        				s_wbje=rec.get('wbje');
					        				s_wbdj=rec.get('wbdj');
					        				if(s_kjlx!=1){
					        					s_wbje=me.round(s_cgsl*s_wbdj,2);
					        				}else{
					        					s_wbje=me.round(s_fzsl*s_wbdj,2);
					        				}
					        				s_cgje=me.round(s_wbje*s_wbhl,2);
					        				if(s_cgsl!=0){
					        					if(s_kjlx!=1){
					        						s_cgdj=me.round(s_cgje/s_cgsl,4);
					        					}else{
					        						s_cgdj=me.round(s_cgje/s_fzsl,4);
					        					}
					        				}
					        				rec.set('cgdj',s_cgdj);
					        				rec.set('cgje',s_cgje);
					        				rec.set('wbje',s_wbje);
					        			break;
					        			case 'fzsl':
					        				var recd=rec.copy();
					        				var cltx1=rec.get('cltx1');
					        				var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getFzslWithOut',
											{
												recstr : Ext.encode(recd.data),
												csbh : csbh,
												dgyl : dgyl
											});
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											var cd=data.cd;
											if(cd!=null){
												rec.set('cgdj',cd.cgdj);
												rec.set('dlgs',cd.dlgs);
												rec.set('cgje',cd.cgje);
												rec.set('wbje',cd.wbje);
												rec.set('ycgl',cd.ycgl);
												rec.set('fzsl',cd.fzsl);
												rec.set('cgsl',cd.cgsl);
											}
					        			break;
					        			case 'cltx1':
					        				var recd=rec.copy();
					        				var cltx1=rec.get('cltx1');
	   	  		    						var rowCount=me.subsidiaryStore.getCount();
		   	  		    					var dgyl=0;
		   	  		    					var jhsl=0;
		   	  		    					var gjsl=0;
		   	  		    					subRec=me.subsidiaryStore.getAt(0);
		   	  		    					if(rowCount>0){
		   	  		    						dgyl=subRec.get('dgyl');
		   	  		    						jhsl=subRec.get('jhsl');
		   	  		    						gjsl=subRec.get('gjsl')
		   	  		    					}
					        				var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getCltxWithOut',
											{
												recstr : Ext.encode(recd.data),
												csbh : csbh,
												dgyl : dgyl,
												jhsl : jhsl,
												gjsl : gjsl,
												rowCount:rowCount
											});
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											var cd=data.cd;
											if(cd!=null){
												rec.set('cgdj',cd.cgdj);
												rec.set('dlgs',cd.dlgs);
												rec.set('cgje',cd.cgje);
												rec.set('wbje',cd.wbje);
												rec.set('ycgl',cd.ycgl);
												rec.set('fzsl',cd.fzsl);
												rec.set('cgsl',cd.cgsl);
											}
					        			break;
					        			case 'dlgs':
					        				var recd=rec.copy();
					        				var cltx1=rec.get('cltx1');
	   	  		    						var rowCount=me.subsidiaryStore.getCount();
		   	  		    					var dgyl=0;
		   	  		    					var jhsl=0;
		   	  		    					subRec=me.subsidiaryStore.getAt(0);
		   	  		    					if(rowCount>0){
		   	  		    						dgyl=subRec.get('dgyl');
		   	  		    						jhsl=subRec.get('jhsl');
		   	  		    					}
					        				var result = erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=getDlgsWithOut',
											{
												recstr : Ext.encode(recd.data),
												csbh : csbh,
												dgyl : dgyl,
												jhsl : jhsl,
												rowCount:rowCount
											});
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											var cd=data.cd;
											if(cd!=null){
												rec.set('fzsl',cd.fzsl);
												rec.set('cgsl',cd.cgsl);
												rec.set('ycgl',cd.ycgl);
												rec.set('cgje',cd.cgje);
												rec.set('wbje',cd.wbje);
											}
					        			break;
					        		}
					        		//me.dStore.sync();
					        	}
					        },
					        clicksToEdit: 1
					    }),
					    features: [{
					       ftype: 'summary',
			        	   dock:'bottom'
					    }],
						dockedItems : [{
								xtype : 'pagingbar',
								stateId : '8081d6f3-9db7-4dsadas70d-b764-dbb70c5e81b1',
								dock : 'bottom',
								displayInfo : true,
								defaultPageSize : 100,
								store : me.dStore
						}],
						viewConfig:{
					     	getRowClass:function(rec,rowIndex,store){
						     		if(rec.get('kzdj')<rec.get('cgdj')){
						     			return 'x-grid-record-red';
						     		}
						     	}
					    },
				    	columns:[
				    		{header:'首次',dataIndex: 'scbj',width:50,renderer:erp.Util.Staterenderer,summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return '合计';
					        }},
							{header:'序号',dataIndex:'htxh',width:45,align:'center'},
				   	  	  	{header:'材料货号',dataIndex:'clhh',width:85,align:'center'},
			   	  	  		{header:'材料名称',dataIndex:'clmc',width:160,field:{
			   	  	  			//xtype:'helpField',
								//code : erp.DataConst.FACTORYINFO
			   	  	  			xtype:'commonTrigger',
			   	  	  			name:'clmc',
								itemId:'clmc',
								selModel:'MULTI',
								cusConfig:{
									type:'ContractDetail',
									field:'clmc',
									indexNum:4,
									callback:function(v,rec,recs){
										me.clmcCallback(v,rec,recs);
									}
								},
								win:'erp.view.master.purchaseDetail.window.MateCombo',
								listeners:{
									change :function(o,  newValue,  oldValue,  eOpts){
										//console.log(o);
										//console.log(newValue);
				                    }
								}
			   	  	  		}},
			   	  	  		{header:'规格尺寸',dataIndex:'cltx1',width:120,align:'center',field:{
			   	  	  			xtype:'textfield'
			   	  	  		}},
			   	  	  		{header:'短料规格',dataIndex:'dgyl',width:85},
			   	  	  		{header:'备注说明',dataIndex:'bzsm',width:140,field:{
			   	  	  			xtype:'textfield'
			   	  	  		}},
			   	  	  		{header:'单位',dataIndex:'jldw',align:'center',width:60,field:{
			   	  	  			xtype:'textfield'
			   	  	  		}},
			   	  	  		{header:'采计数量',dataIndex:'cjsl',align:'right',width:85,align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value, '0,000.###');
					        }},
			   	  	  		{header:'采购数量',dataIndex:'cgsl',align:'right',width:85,field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:3
			   	  	  		},align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value, '0,000.###');
					        },renderer:function(v,r){
					        	var rec=r.record;
					        	if(rec.get('cgsl')!=rec.get('ycgl')&&rec.get('ycgl')>0){
					               r.css='x-grid-record-red'; 
								}
								return v;
					        }},
			   	  	  		{header:'控制单价',dataIndex:'kzdj',width:85,align:'right'},
			   	  	  		{header:'采购单价',dataIndex:'cgdj',width:85,field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:4
			   	  	  		},align:'right'},
			   	  	  		{header:'税率',dataIndex:'zzsl',width:85,field:{
			   	  	  			xtype:'numberfield',
			   	  	  			maxValue:1,
			   	  	  			decimalPrecision:2
			   	  	  		},align:'right',renderer : Ext.util.Format.percentRenderer},
			   	  	  		{header:'采购金额',dataIndex:'cgje',width:85,field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:7
			   	  	  		},align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value,'0,000.00');;
					        }},
					         {header:'币种',dataIndex:'wbdh',bind:{
						    	 hidden:'{iswb}'
						    }},
			   	  	  		{header:'汇率',dataIndex:'wbhl',align:'right',bind:{
						    	 hidden:'{iswb}'
						    }},
			   	  	  		{header:'外币单价',dataIndex:'wbdj',width:85,bind:{
						    	 hidden:'{iswb}'
						    },field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:4
			   	  	  		},align:'right',renderer:Ext.util.Format.floatRenderer},
			   	  	  		{header:'外币金额',dataIndex:'wbje',width:85,bind:{
						    	 hidden:'{iswb}'
						    },field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:7
			   	  	  		},align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value,'0,000.00');
					        },renderer:Ext.util.Format.floatRendererOne},
			   	  	  		{header:'短料根数',dataIndex:'dlgs',width:85,field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:0
			   	  	  		},align:'right'},
			   	  	  		{header:'专利单价',dataIndex:'zldj',width:85,field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:4
			   	  	  		},align:'right',renderer:Ext.util.Format.floatRenderer},
			   	  	  		{header:'采计交期',dataIndex:'wkjq',align : 'center',width:85,renderer : Ext.util.Format.dateRendererOne},
			   	  	  		{header:'评审交期',dataIndex:'psjq',align : 'center',width:85,renderer : Ext.util.Format.dateRendererOne},
			   	  	  		{header:'交货日期',dataIndex:'jhrq',align : 'center',width:100,renderer : Ext.util.Format.dateRendererOne,field:{
			   	  	  			xtype:'datefield',
			   	  	  			format:'Y.m.d'
			   	  	  		}},
			   	  	  		{header:'生产单号',dataIndex:'htbz',width:120},
			   	  	  		{header:'产品名称',dataIndex:'cpmc',width:85},
			   	  	  		{header:'计划号',dataIndex:'jhh',width:85},
			   	  	  		{header:'采计号',dataIndex:'cgh',width:85},
			   	  	  		{header:'采购日期',dataIndex:'cgrq',align:'center',width:100,renderer : Ext.util.Format.dateRendererOne,field:{
			   	  	  			xtype:'datefield',
			   	  	  			format:'Y.m.d'
			   	  	  		}},
			   	  	  		{header:'客户简称',dataIndex:'khjc',width:120},
			   	  	  		{header:'核算部门',dataIndex:'hsbm',width:180,renderer:function(v,r){
			   	  	  			return r.record.get('hsbmmc')
			   	  	  		},field:{
			   	  	  			xtype:'comboxTree',
			   	  	  			store:me.accountDeptStore,
			   	  	  			displayField : 'text',
						   		valueField: 'nodeId',
						   		listeners:{
						   			beforerender:function(c){
											var picker=c.getPicker();
											picker.expandAll();//展开所有，加载所有
						   			}
						   		}
			   	  	  		}},
			   	  	  		{header:'送达仓库',dataIndex:'sdck',width:90,renderer:function(v,r){
			   	  	  			return r.record.get('sdckmc')
			   	  	  		},field:{
			   	  	  			xtype:'combo',
			   	  	  			typeAhead:true,
			   	  	  			store:me.storeQuote,
								queryMode : 'local',
								displayField:'ckmc',
								valueField:'ckbh',
								selectOnFocus:true
			   	  	  		}},
			   	  	  		{header:'模具号',dataIndex:'mjh',width:85,field:{
			   	  	  		
			   	  	  		}},
			   	  	  		{header:'辅助单位',dataIndex:'fzdw',width:85},
			   	  	  		{header:'辅助数量',dataIndex:'fzsl',align:'right',width:85,summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value,'0,000.00');;
					        },field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:3
			   	  	  		},renderer:Ext.util.Format.floatRenderer},
			   	  	  		{header:'控价类型',dataIndex:'kjlx',width:85,field:{
			   	  	  			xtype:'combo',
			   	  	  			store:[[0,'主控价'],[1,'辅控价']]
			   	  	  		},renderer:function(v){
			   	  	  			return v==0?'主控件':'辅控价'
			   	  	  		}},
			   	  	  		{header:'主转换系数',dataIndex:'zzhxs',width:85},
			   	  	  		{header:'供货周期',dataIndex:'ghzq',width:85/*,field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:0
			   	  	  		}*/,align:'right'},
			   	  	  		{header:'订单号',dataIndex:'ddh',width:85},
			   	  	  		{header:'需求号',dataIndex:'sqh',width:85},
			   	  	  		{header:'申购号',dataIndex:'sgh',width:85},
			   	  	  		{header:'主合同号',dataIndex:'zxhth',width:85},
			   	  	  		{header:'中止原因',dataIndex:'zzyx',width:85},
			   	  	  		{header:'原采购量',dataIndex:'ycgl',width:85,align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value, '0,000.###');
					        }},
			   	  	  		{header:'原规格尺寸',dataIndex:'ysgg',width:140},
			   	  	  		{header:'拆分号',dataIndex:'cfh',width:85},
			   	  	  		{header:'英文描述',dataIndex:'ywms',width:180},
			   	  	  		{header:'PO.NO.:',dataIndex:'pono',width:85},
			   	  	  		{header:'FAC.NO.:',dataIndex:'fach',width:85},
			   	  	  		{header:'客户型号',dataIndex:'khxh',width:85},
			   	  	  		{header:'箱唛补充信息',dataIndex:'xmsjbc',width:85},
			   	  	  		{header:'OA申请ID',dataIndex:'requestid',width:85}
			   	  	  	],
				    	listeners : {
								selectionchange : function(grid, recs) {
									if (recs.length > 0) {
										var rec=recs[0];
										me.down('#Del').setDisabled(false);
										me.subsidiaryStore.load({params:{htbh:rec.get('htbh'),htxh:rec.get('htxh')}});
									} else {
										me.subsidiaryStore.load({params:{htbh:-1,htxh:-1}});
										me.down('#Del').setDisabled(true);
									}
								}
						},
			   	  	  	store:me.dStore			    		
			    	},{
			    		xtype:'splitter'
			    	},{
				    	xtype:'grid',
				    	reference:'ContractSubsidiaryGrid',
			        	itemId:'ContractSubsidiaryGrid',
				    	flex:1,
				    	selModel:Ext.create('Ext.selection.CheckboxModel'),
				    	plugins: Ext.create('Ext.grid.plugin.CellEditing', {
					        ptype: 'cellediting',
					        autoCancel: false,
					        listeners:{
					        	beforeedit:function(editor,con,e){
					        		if(!me.isEdit){
					        			return false;
					        		}
					        		var field=con.field;
					        		var rec=con.record;
					        		switch(field){
					        			
					        		}
					        	},
					        	edit:function(editor,con,e){
					        		var field=con.field,
					        		rec=con.record,
					        		mrec=me.down('#ContractDetailGrid').getSelectionModel().getSelection()[0],
					        		ls_clhh=mrec.get('clhh'),
					        		ls_cltx1=mrec.get('cltx1');
					        		var myMask = new Ext.LoadMask({
										target : me
									});
					        		myMask.mask('正在获取数据，请等待......');
					        		var sql  =" select fzzbj  from clbmb where clhh= '"+ls_clhh+"'";
									var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
									{sql : sql});
									myMask.unmask();
									var data = Ext.decode(result);
									if (!data.bool) {
										Ext.toastErrorInfo(data.msg);
										return ;
									}
									var ls_fzzbj =data.val;
									if(ls_fzzbj==null){
										ls_fzzbj=0;
									}
					        		if(con.originalValue==con.value){
					        			return ;
					        		}
					        		var dgyl=rec.get('dgyl');
					        		switch(field){
					        			case 'yxgg':
					        				var s_yxgg=rec.get('yxgg');
					        				if(me.round(s_yxgg/dgyl,0)!=1){
					        					if(ls_fzzbj!=6){
					        						rec.set('zhgg',me.round((0.005+dgyl)*me.round(s_yxgg/(0.005+dgyl),0),3));
					        					}else{
					        						rec.set('zhgg',me.round(0.05+dgyl*me.round(s_yxgg/(dgyl),0),3));
					        					}
					        				}else{
					        					rec.set('zhgg',dgyl);
					        				}
					        				var s_zhgg=rec.get('zhgg');
					        				if(dgyl>0 && Math.floor(s_zhgg/dgyl)>0){
					        					if(Math.floor(s_zhgg/(dgyl+0.005))>0){
					        						rec.set('zhsl',Math.ceil(rec.get('fdxs')*((rec.get('gjsl')*rec.get('jhsl'))/Math.floor(s_zhgg/(dgyl+0.005)))));
					        					}else{
					        						rec.set('zhsl',Math.ceil(rec.get('fdxs')*((rec.get('gjsl')*rec.get('jhsl'))/1)));
					        					}
					        				}
					        				var s_zhsl=rec.get('zhsl');
					        				rec.set('fzsl',me.round(s_zhsl*s_zhgg,3));
					        				myMask.mask('正在获取数据，请等待......');
							        		var sql  =" select case when zzhxs>0 then round(zhxs/zzhxs,6) else 0 end  from clbmb where clhh= '"+ls_clhh+"'";
											var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
											{sql : sql});
											myMask.unmask();
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return ;
											}
											var s_zhxs= data.val;
											if(s_zhxs==null){
												s_zhxs=0;
											}
											if(s_zhxs!=0){
												rec.set('cgsl',me.round(rec.get('fzsl')/s_zhxs,3));
											}
											//辅助数量变则短料变
											if (ls_fzzbj==5 || ls_fzzbj==6){
												var s_cgbh=mrec.get('cgbh');
												var s_cgxh=mrec.get('cgxh');
												if(s_cgbh==null){
													s_cgbh=0;
												}
												if(s_cgxh==null){
													s_cgxh=0;
												}
												myMask.mask('正在获取数据，请等待......');
								        		var sql  =" select dlgs  from cgjhmxb where cgbh= '"+s_cgbh+"' and cgxh= '"+s_cgxh+"'";
												var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
												{sql : sql});
												myMask.unmask();
												var data = Ext.decode(result);
												if (!data.bool) {
													Ext.toastErrorInfo(data.msg);
													return ;
												}
												var s_dlgs= data.val;
												if(s_dlgs==null){
													s_dlgs=0;
												}
												var ls_djyl=rec.get('dgyl');
												var s_fzsl=rec.get('fzsl');
												var cltx1=mrec.get('cltx1');
			   	  		    					var s_clgg=0;
			   	  		    					if(cltx1!=null){
		   	  		    							s_clgg=eval(cltx1.replaceAll("[A-Za-z]",""));//规格尺寸
						        				}
						        				if(s_clgg!=0 && ls_djyl!=0 && s_dlgs!=0 ){//排除未算出短料的采计部分
						        					mrec.set('dlgs',Math.floor(s_clgg/ls_djyl)*me.round((s_fzsl/s_clgg),0));
						        				}
											}
					        			break;
					        		}
					        		var s_cgsl_hz=0,s_fzsl_hz=0,s_zhgg_max=0;
					        		me.subsidiaryStore.each(function(r){
					        			s_cgsl_hz+=r.get('cgsl');
					        			s_fzsl_hz+=r.get('fzsl');
					        			var zhgg=r.get('zhgg');
					        			if(s_zhgg_max<zhgg){
					        				s_zhgg_max=r.get('zhgg');
					        			}
					        		})
					        		mrec.set('fzsl',s_fzsl_hz);
					        		mrec.set('cgsl',s_cgsl_hz);
					        		mrec.set('ycgl',s_cgsl_hz);
					        		mrec.set('cgje',me.round(s_cgsl_hz*mrec.get('cgdj'),2));
					        		if(mrec){
					        			var s_fzzbj=mrec.get('fzzbj');
					        			if(s_fzzbj==2  || s_fzzbj==5 || s_fzzbj==6){
					        				mrec.set('cltx1',Ext.String.trim(me.f_szzh(s_zhgg_max))+Ext.String.trim(rec.get('fzdw')));
					        			}
					        		}
					        	}
					        },
					        clicksToEdit: 1
					    }),
				    	columns:[
							{header:'构件名称/使用部位',dataIndex:'cggg',width:120,summaryType: 'count',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return '合计';
					        }},
				   	  	  	{header:'(1+放大系数)',dataIndex:'fdxs',width:90},
				   	  	  	{header:'单个用量',dataIndex:'dgyl',width:85,align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value, '0,000.###');
					        }},
				   	  	  	{header:'x 构件数量',dataIndex:'gjsl',width:90,align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value, '0,000.###');
					        }},
				   	  	  	{header:'= 构件用量',dataIndex:'gjyl',width:90,align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value, '0,000.###');
					        }},
				   	  	  	{header:'x 计划数量',dataIndex:'jhsl',width:90,align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value, '0,000.###');
					        }},
				   	  	  	{header:'= 生产需求',dataIndex:'scxq',width:90,align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value, '0,000.###');
					        }},
				   	  	  	{header:'计量单位',dataIndex:'fzdw_sc',width:90,align:'center'},
				   	  	  	{header:'预想规格',dataIndex:'yxgg',width:90,align:'right',field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:6
			   	  	  		}},
				   	  	  	{header:'转换规格',dataIndex:'zhgg',width:90,align:'right'},
				   	  	  	{header:'转换数量',dataIndex:'zhsl',width:90,align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value, '0,000.###');
					        }},
				   	  	  	{header:'转化计量',dataIndex:'zhjl',width:90,align:'center'},
				   	  	  	{header:'辅助数量',dataIndex:'fzsl',width:90,align:'right'},
				   	  	  	{header:'辅助单位',dataIndex:'fzdw',width:90,align:'center'},
				   	  	  	{header:'采购数量',dataIndex:'cgsl',width:90,align:'right'},
				   	  	  	{header:'计量单位',dataIndex:'jldw',width:90,align:'center'}
			   	  	  	],
			   	  	  	store:me.subsidiaryStore,
			   	  	  	listeners : {
								selectionchange : function(grid, recs) {
									if (recs.length > 0) {
										//me.down('#companyDel').setDisabled(false);
									} else {
										//me.down('#companyDel').setDisabled(true);
									}
								}
			   	  	  	}
				    }]
			    },{
		    	title:'领料明细',
	   	  	  	xtype:'panel',
	   	  	  	itemId:'outSouce',
		    	useArrows: true,
		    	layout:'border',
		    	items:[{
					itemId:'MaterialGrid4',
					xtype:'grid',
					store:me.dStore,
					region:'center',
					flex:1,
					features: [{
				        ftype: 'summary',
			       		dock:'bottom'
				    }],
					listeners:{
						selectionchange : function(grid, recs) {
							if (recs.length > 0) {
								me.outSourceStore.load({params:{htbh:recs[0].get('htbh')+'',htxh:recs[0].get('htxh')+''}});
							} else {
								me.outSourceStore.load({params:{htbh:-1,htxh:-1}});
							}
						}
					},
					dockedItems : [{
							xtype : 'pagingbar',
							stateId : '8081d6f3-9db7-4dsadas70d-b764-dbb70c5e81b1',
							dock : 'bottom',
							displayInfo : true,
							defaultPageSize : 100,
							store : me.dStore
					}],
					columns:[
	   	  	  			{header:'序号',dataIndex:'htxh',width:60,summaryType: 'count',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                 return '合计';
			            }},
	   	  	  			{header:'材料货号',dataIndex:'clhh',width:70},
	   	  	  			{header:'材料名称',dataIndex:'clmc',width:160},
	   	  	  			{header:'规格尺寸',dataIndex:'cltx1',width:85},
	   	  	  			{header:'单位',dataIndex:'jldw',width:50},
	   	  	  			{header:'采购数量',dataIndex:'cgsl',width:85,summaryType: 'sum',align:'right',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value>0? Ext.util.Format.number(value, '0,000.###'):'';
			            },renderer:Ext.util.Format.floatRenderer},
			            {header:'箱只数',dataIndex:'mxzs',width:85,renderer:Ext.util.Format.floatRenderer}
		    		]
		    	},{
		    		itemId:'outSourcePicking',
		    		xtype:'grid',
		    		flex:1,
					autoScroll:true,
		    		split:true,
					region:'east',
					store:me.outSourceStore,
					features: [{
				        ftype: 'summary',
			       		dock:'bottom'
				    }],
				    plugins: Ext.create('Ext.grid.plugin.CellEditing', {
					        ptype: 'cellediting',
					        autoCancel: false,
					        listeners:{
					        	beforeedit:function(editor,con,e){
					        		if(!me.isEdit){
					        			return false;
					        		}
					        		var field=con.field;
					        		var rec=con.record;
					        		switch(field){
					        			
					        		}
					        	},
					        	edit:function(editor,con,e){
					        		var field=con.field;
					        		var rec=con.record;
					        		if(con.originalValue==con.value){
					        			return ;
					        		}
					        		var mgrid=me.down('#MaterialGrid4');
					        		var mrec=mgrid.getSelectionModel().getSelection()[0];
					        		var s_jgsl=mrec.get('cgsl')
					        		switch(field){
					        			case 'jgyl':
					        			case 'jsbl':
					        				var s_jgyl=rec.get('jgyl'),
					        				s_jsbl=rec.get('jsbl'),
					        				s_csdj=rec.get('csdj');
					        				rec.set('tzll',me.round(s_jgyl*s_jsbl,3));
					        				rec.set('csje',me.round(s_csdj*s_jgyl*s_jsbl,2));
					        				if(s_jgsl!=0){
					        					rec.set('dhyl',me.round(s_jgyl/s_jgsl,3));
					        				}else{
					        					rec.set('dhyl',0);
					        				}
					        			break;
					        			case 'tzll':
					        				var s_tzll=rec.get('tzll'),
					        				s_jgyl=rec.get('jgyl'),
					        				s_csdj=rec.get('csdj');
					        				if(s_jgyl!=0){
					        					rec.set('jsbl',me.round(s_csdj*s_tzll,2));
					        				}
					        				rec.set('csje',me.round(s_csdj*s_tzll,2));
					        			break;
					        			case 'csdj':
					        				var s_csdj=rec.get('csdj'),
					        				s_tzll=rec.get('tzll');
					        				
					        				rec.set('csje',me.round(s_csdj*s_tzll,2));
					        			break;
					        			case 'djyl':
					        				var s_djyl=rec.get('djyl'),
					        				s_jsbl=rec.get('jsbl'),
					        				s_csdj=rec.get('csdj');
					        				rec.set('jgyl',me.round(s_djyl*s_jgsl,3));
					        				rec.set('tzll',me.round(s_djyl*s_jgsl*s_jsbl,3));
					        				rec.set('csje',me.round(s_csdj*s_djyl*s_jgsl*s_jsbl,2));
					        			break;
					        		}
					        	}
					        },
					      	clicksToEdit: 1
					  }),
					columns:[
						{header:'序号',dataIndex:'tzxh',width:50},
						{header:'材料类别',dataIndex:'lbmc',width:85},
						{header:'材料货号',dataIndex:'clhh',width:85},
						{header:'材料名称',dataIndex:'clmc',width:85},
						{header:'规格尺寸',dataIndex:'cltx1',width:85,field:{}},
						{header:'单位',dataIndex:'jldw',width:45},
						{header:'单件用量',dataIndex:'djyl',width:85,field:{
							xtype:'numberfield',
							decimalPrecision:6
						}},
						{header:'加工用量',dataIndex:'jgyl',width:85,summaryType: 'sum',align:'right',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value>0? Ext.util.Format.number(value,'0,000.######'):'';
			            },renderer:Ext.util.Format.floatRenderer,field:{
							xtype:'numberfield',
							decimalPrecision:3
						}},
						{header:'×(1+损耗率)',dataIndex:'jsbl',width:85,field:{
							xtype:'numberfield',
							decimalPrecision:4
						}},
						{header:'=通知领料',dataIndex:'tzll',width:85,summaryType: 'sum',align:'right',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value>0? Ext.util.Format.number(value,'0,000.######'):'';
			            },renderer:Ext.util.Format.floatRenderer,field:{
							xtype:'numberfield',
							decimalPrecision:3
						}},
						{header:'出售单价',dataIndex:'csdj',width:85},
						{header:'出售金额',dataIndex:'csje',width:85,summaryType: 'sum',align:'right',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value>0? Ext.util.Format.number(value,'0,000.######'):'';
			            },renderer:Ext.util.Format.floatRenderer},
						{header:'备注说明',dataIndex:'jsbl',width:160,field:{
						}}
					]
		    	}]
		    },{
			    	title:'合同条款',
			    	xtype:'textarea',
			    	itemId:'httk',
			    	name:'httk'
			    },{
			    	title:'采购要求',
			    	xtype:'panel',
			    	layout: 'border',
			    	items:[{
			    		region: 'center',
			    		xtype:'textarea',
			    		itemId:'mle',
			    		name:'mle',
			    		flex:1
			    	},{
			    		region:'east',
			    		xtype:'image',
			    		flex:1,
			    		split: true,
			    		itemId:'httpPic',
			    		autoScroll:true,
			    		src:null,
						style:"position:absolute;left:0;top:0;width:100%;height:100%;"
			    	}]
			    },{
			    	title:'包装拆分',
			    	xtype:'panel'
			    }
			    ]
			}],
			listeners:{
	    		afterrender:function(cmp){
	    			cmp.loadRecord(cmp.mrec);
	    		}
	    	}
	    })
		this.callParent();
	},
	loadRecord:function(rec){
		var me=this;
		me.loadCglbStore(rec.get('cglb'));
		me.down('#csbh').setValue('1');
		me.down('#csbh').setValue('');
		me.down('#PurchaseContractForm').loadRecord(rec);
		if(rec.get('http')!=null&&rec.get('http')!=''){
			var src='ftp://'+tp_ftpUrl+rec.get('http');
			me.down('#httpPic').setSrc(src);
		}
		me.dStore.proxy.extraParams.htbh=rec.get('htbh');
		me.dStore.load();
		if(rec.get('zlbj')==1){
			me.down('#zlcsbh').setVisible(true);
		}else{
			me.down('#zlcsbh').setVisible(false);
		}
		/*me.subsidiaryStore.add(me.screcs);
		me.subsidiaryStore.filterBy(function(r) {
			return r.get('htxh') == -1;
		});*/
	},
	// 编辑前，加载类别树，不然不显示文本内容，虽然value存在
	loadCglbStore:function(node){
		var me=this;
		if(node!=null && node!="" && node!=0){//加载树
			var picker=me.down('#cglb').getPicker();
			var path="/0";
			for(var i=0;i<node.length/2-1;i++){
				path+="/"+node.substring(i*2,(i+1)*2);
			}
			picker.expandPath(path);
//			picker.expandAll();//展开所有，加载所有
		}
	},
	round:function(v,l){
		return Ext.util.Format.round(v,l);
	},
	//厂商编号更新同步刷新所有明细信息
	clmcCallback : function(view,rec,recs) {
		var me = this;
		//console.log(me);
		var grid = me.down('#ContractDetailGrid');
		var srec = grid.getSelectionModel().getSelection()[0];
		var store = grid.getStore();
		var form = me.down('#PurchaseContractForm');
		var csbh = form.down('#csbh').getValue();
		var login_id=erp.Util.currentUser.loginId;
    	var ip=erp.Util.currentUser.IP;
		var materialDetail = '[';
		if (recs != null && recs.length != 0) {
			var a = false;
			Ext.each(recs, function(r) {
						if (a) {
							materialDetail += ',';
						}
						materialDetail += Ext.encode(r.data);
						a = true;
					})
		} else {
			materialDetail += Ext.encode(rec.data);
		}
		materialDetail += ']';
		var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getMaterialDetailLoad',{
			csbh : csbh,
			materialDetail : materialDetail,
			contractDetail : Ext.encode(srec.data),
			login_id:login_id,ip:ip
		});
		var data = Ext.decode(result);
		if (data.bool == false) {
			Ext.Msg.alert('提示', data.msg)
			return;
		}
		store.load();
	},
	//取消专利单价
	cancelZldj:function(){
		var me=this;
		var login_id=erp.Util.currentUser.loginId;
    	var ip=erp.Util.currentUser.IP;
		var htbh=me.down('#htbh').getValue();
		me.dStore.sync({callback:function(batch,options){
				//console.log(batch);
				//console.log(options);
		}});
		var myMask = new Ext.LoadMask({
			 msg    : '明细数据刷新中...',
			 target : me
		});
		myMask.mask('明细数据刷新中...');
		var sql  =" update dbo.htmxb_tmp set zldj = 0 where htbh='"+htbh+"' and login_id ='"+login_id+"' and ip ='"+ip+"' ";
		var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
		{sql : sql});
		myMask.unmask();
		me.dStore.load();
		var data = Ext.decode(result);
		if (!data.bool) {
			Ext.toastErrorInfo(data.msg);
			return;
		}
	},
	//厂商编号更新同步刷新所有明细信息
	csbhChange:function(csbh){
		var me=this;
		var htbh=me.down('#htbh').getValue();
		me.dStore.sync({callback:function(batch,options){
				//console.log(batch);
				//console.log(options);
		}});
		var login_id=erp.Util.currentUser.loginId;
    	var ip=erp.Util.currentUser.IP;
		var myMask = new Ext.LoadMask({
			    msg    : '明细数据刷新中...',
			    target : me
			});
			myMask.mask('明细数据刷新中...');
			var result = erp.Const.callServiceMethodSync(
				'purchaseorder/purchaseorderdetail.act?method=getUpdatePurchaseOrderDetailFromCsbh', {
				htbh:htbh,csbh:csbh,
				login_id:login_id,ip:ip
			});
			myMask.unmask();
			me.dStore.load();
			var data = Ext.decode(result);
			if (!data.bool) {
				Ext.toastErrorInfo(data.msg);
				return;
			}
	},
	//汇总调整
    doCollect:function(htbh,dstore){
    	var login_id=erp.Util.currentUser.loginId;
    	var ip=erp.Util.currentUser.IP;
    	var cwin=Ext.create('erp.view.purchaseOrder.window.CollectAdjust',{
			htbh:htbh
		});
		cwin.down('#btn_confirm').on({
			click : function(btn) {
				//直接在后台刷新本合同所有数据
				var myMask = new Ext.LoadMask({
					target : cwin
				});
				myMask.mask('数据汇总中...');
		    	var result = erp.Const.callServiceMethodSync(
					'purchaseorder/purchaseorderdetail.act?method=getCollectAdjustState', {
					//recs:erp.Util.ModelsToJson(store.getRange()),
					login_id:login_id,
					ip:ip,
					htbh:htbh
				});
				myMask.unmask();
				var data = Ext.decode(result);
				if (!data.bool) {
					Ext.toastErrorInfo(data.msg);
					return;
				}
				dstore.load();
			}
		})
		cwin.show();
    	/*var swin=Ext.create('erp.view.purchaseOrder.window.DetailSelect',{
    		htbh:htbh
    	});
    	swin.down('#btn_confirm').on({
    		click:function(btn){
    			var win=btn.up('window');
    			var selStore=win.selStore;
    			var recs=selStore.getRange();
    			var htxhs=new Array();
    			if(recs.length>0){
    				Ext.each(recs,function(rec){
    					htxhs.push(rec.get('htxh'));
    				})
    				var sql="	update htmxb_tmp set xzbj=1 where htbh='"+recs[0].get('htbh')+"' and htxh in ("+htxhs.join(',')+") ";
    				sql+=" and ip ='"+ip+"' and login_id='"+login_id+"'";
			    	var result = erp.Const.callServiceMethodSync(
						'purchaseorder/purchaseorderdetail.act?method=getStringFromSql', {
						sql:sql
					});
					var data = Ext.decode(result);
					if (!data.bool) {
						Ext.toastErrorInfo(data.msg);
						return;
					}
					var cwin=Ext.create('erp.view.purchaseOrder.window.CollectAdjust',{
						htbh:htbh
					});
					cwin.down('#btn_confirm').on({
						click:function(btn){
							var win=btn.up('window');
							var store=win.store;
							var result = erp.Const.callServiceMethodSync(
								'purchaseorder/purchaseorderdetail.act?method=getCollectAdjustState', {
								recs:erp.Util.ModelsToJson(store.getRange()),
								login_id:login_id,
								ip:ip,
								htbh:htbh
							});
							var data = Ext.decode(result);
							if (!data.bool) {
								Ext.toastErrorInfo(data.msg);
								return;
							}
							win.close();
							dstore.load();
						}
					})
					win.close();
					cwin.show();
    			}else{
    				Ext.toastInfo('请选择要汇总调整的材料！');
    			}
    		}
    	})
    	swin.show();*/
    },
	f_szzh:function(f_zhgg){
		var i=0,j;
		f_zhgg=f_zhgg.toString();
		if (f_zhgg.indexOf('.')>0){
			for (i=f_zhgg.lenght;i>-1;i--){
				j=f_zhgg.substring(i-1,i);
				if (j=='0') {
					f_zhgg=f_zhgg.replace(f_zhgg,'');
				}
				else if (j=='.'){
					f_zhgg=f_zhgg.replace(f_zhgg,'');
					return Ext.String.trim(f_zhgg);
				}
				else{
					return Ext.String.trim(f_zhgg);
				}
			}
		}
		return Ext.String.trim(f_zhgg)
	},
    saveAll:function(rec,czym,edtPanel,store){
    	//验证
    	var myMask = new Ext.LoadMask({
			target : edtPanel
		});
		var login_id=erp.Util.currentUser.loginId;
    	var ip=erp.Util.currentUser.IP;
		myMask.mask('数据验证中...');
    	var result = erp.Const.callServiceMethodSync(
			'purchasedetail/purchasecontract.act?method=getBeforSave', {
			rec:Ext.encode(rec.data),login_id:login_id,ip:ip
		});
		edtPanel.isSave=true;
		edtPanel.loadRecord(rec);
		edtPanel.isSave=false;
		myMask.unmask();
		var data = Ext.decode(result);
		if (!data.bool) {
			Ext.toastErrorInfo(data.msg);
			return;
		}
		var fileStore=edtPanel.FileStore;
		rec.set('czym',czym);
		rec.set('czsj',new Date());
		var　oldHtbh=rec.get('htbh');
		var show=data.show==null?'':data.show;
		Ext.Msg.confirm('提示', show+'<br\>是否确认保存?', function(btn) {
					if (btn == 'yes') {
						if (edtPanel.isAdd) {
							store.add(rec);
							myMask.mask('数据保存中...');
							store.sync({
								callback : function(batch, options) {
									var nrec = null;
									if (options.operations.create != null) {
										nrec = options.operations.create[0];
									} else {
										nrec = options.operations.update[0]
									}
									if(nrec.get('htbh')<=0){
										Ext.toastInfo('保存异常请重试!');
										myMask.unmask();
										return;
									}
									//将临时表数据导入正式库
									var result = erp.Const.callServiceMethodSync(
										'purchaseorder/purchaseorderdetail.act?method=cacheTableToPurchaseOrderDetailFormal', {
										old_htbh:oldHtbh,htbh:nrec.get('htbh'),login_id:login_id,ip:ip,rec:Ext.encode(rec.data)
									});
									var data = Ext.decode(result);
									if (!data.bool) {
										myMask.unmask();
										Ext.toastErrorInfo(data.msg);
										return;
									}
									rec.set('htbh',nrec.get('htbh'));
									erp.Util.addTask(edtPanel,edtPanel.mainPanel.itemId,nrec.get('htbh'));
									edtPanel.bills_id=nrec.get('htbh');
									edtPanel.isSave=true;
									edtPanel.loadRecord(nrec);
									edtPanel.isSave=false;
									//edtPanel.mainPanel.store.remove(recs);
									//对于外界面进行处理
									//获取最新数据
									params={htbh:nrec.get('htbh')};
									var url="purchaseorder/purchaseorderdetail.act?method=getPurchaseOrderDetailList"+"&_dc="+new Date().getTime();
									Ext.Ajax.request({
										url:url,
										params:params,
										timeout:60000,
										method:'POST',
										callback:function(options, success, resp){
											retObj = Ext.decode(resp.responseText);
											var curRecs=retObj.data;
											var mainGrid=edtPanel.mainPanel.down('#PurchaseDetailGrid');
											Ext.each(curRecs,function(cur){
												var curCgsl=cur.cgsl;
												var row=mainGrid.find("cgh='" +cur.cgh+"'");
												if(row>-1){
													var oldCgsl=mainGrid.getCellData(row,'cjwz');
													if(curCgsl>=oldCgsl){
														mainGrid.deleteRows(row,1);
													}else{
														mainGrid.setCellData(row,'cjwz',oldCgsl-curCgsl);
													}
													
												}
											})
											myMask.unmask();
											Ext.toastInfo('保存完毕!');
										}
									});
									/*var myMask1 = new Ext.LoadMask({
										target : edtPanel.mainPanel
									});
									edtPanel.mainPanel.store.load({
										callback:function(){
											myMask1.unmask();
										}
									});*/
								}
							});	
							edtPanel.isAdd=false;
						}else{
							myMask.mask('数据保存中...');
							store.sync({
								callback : function(batch, options) {
									//将临时表数据导入正式库
									var result = erp.Const.callServiceMethodSync(
										'purchaseorder/purchaseorderdetail.act?method=cacheTableToPurchaseOrderDetailFormal', {
										old_htbh:oldHtbh,htbh:rec.get('htbh'),login_id:login_id,ip:ip,rec:Ext.encode(rec.data)
									});
									var data = Ext.decode(result);
									if (!data.bool) {
										myMask.unmask();
										Ext.toastErrorInfo(data.msg);
										return;
									}
									myMask.unmask();
									Ext.toastInfo('保存完毕!');
									edtPanel.isSave=true;
									edtPanel.loadRecord(rec);
									edtPanel.isSave=false;
									//对于外界面进行处理
									//获取最新数据
									params={htbh:rec.get('htbh')};
									var url="purchaseorder/purchaseorderdetail.act?method=getPurchaseOrderDetailList"+"&_dc="+new Date().getTime();
									Ext.Ajax.request({
										url:url,
										params:params,
										timeout:60000,
										method:'POST',
										callback:function(options, success, resp){
											retObj = Ext.decode(resp.responseText);
											var curRecs=retObj.data;
											var mainGrid=edtPanel.mainPanel.down('#PurchaseDetailGrid');
											var drecs =mainGrid.getSelectRow();
											Ext.each(curRecs,function(cur){
												var curCgsl=cur.cgls;
												var row=mainGrid.find(" cgh =" +cur.cgh);
												if(row>-1){
													var oldCgsl=mainGrid.getCellData(row,'cgls');
													if(curCgsl>=oldCgsl){
														mainGrid.deleteRows(dr.row,1);
													}else{
														mainGrid.setCellData(row,'cgls',oldCgsl-curCgsl);
													}
													
												}
											})
										}
									});
									/*var myMask1 = new Ext.LoadMask({
										target : edtPanel.mainPanel
									});
									edtPanel.mainPanel.store.load({
										callback:function(){
											myMask1.unmask();
										}
									});*/
									/*store.load({
										params:{htbh:nrec.get('htbh')},
										callback : function(recs) {
											var srec=store.findRecord('htbh',rec.get('htbh'));	
											if(srec){
												edtPanel.down('#PurchaseContractForm').loadRecord(srec);
											}
										}
									});*/
								}
							});	
						}
					}
				})
    }
})