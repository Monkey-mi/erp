Ext.define('erp.view.master.purchaseDetail.PurchaseDetailCtl', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Ext.window.MessageBox',
        'erp.ux.ComboxTree',
        'erp.view.master.purchaseDetail.window.PurchaseDetailSearch',
        'erp.view.master.purchaseDetail.view.EdtPurchaseContract',
        'erp.view.master.purchaseDetail.model.ContractDetail',
        'erp.view.master.purchaseDetail.view.EdtOutSource',
        'erp.view.master.purchaseDetail.window.BatchChange',
        'erp.view.master.purchaseDetail.window.OldPurSearch',
        'erp.view.master.purchaseDetail.window.BomChangeSearch',
        'erp.view.master.purchaseDetail.window.PurSupplierSearch',
        'erp.view.master.purchaseDetail.window.MateCombo'
    ],
	control:{
		//主界面
		'PurchaseDetail #PurchaseDetailBar button':{
			click:'onClickButton'			
		},
		//主界面 批量编辑
		'PurchaseDetail #menu_Batch ':{
			click:'onBatchClickButton'	
		},
		//更新
		'PurchaseDetail #Refresh ':{
			click:'onRefreshButton'	
		},
		//外协编辑按钮
		'EdtOutSource #EdtOutSourceBar button':{
			click:'EdtOutSourceClickButton'
		}/*,
		//采购合同编辑按钮
		'EdtPurchaseContract #EdtPurchaseContractBar button':{
			click:'EdtPurchaseContract'
		}*/
	},
    alias: 'controller.PurchaseDetailCtl',
    onRefreshButton:function(menu,btn){
    	var me=this;
    	var mainGrid=this.lookupReference('PurchaseDetailGrid');
    	var mainPanel=me.getView();
    	var myMask = new Ext.LoadMask({
			target : mainPanel
		});
		myMask.mask('正在更新，请等待......');
		mainGrid.showMask();
    	var rows =mainGrid.getCurrentRow();
    	if(rows==''){
    		mainGrid.closeMask();
    		myMask.unmask();
    		Ext.Msg.alert('提示','请至少选择一条记录!');
    		return ;
    	}
    	var rowArr=rows.split(',');
    	var recs=new Array();
    	Ext.each(rowArr,function(r){
    		var obj=new Object();
    		obj.cgbh=mainGrid.getCellData(r,'cgbh');
    		obj.cgxh=mainGrid.getCellData(r,'cgxh');
    		obj.clhh=mainGrid.getCellData(r,'clhh');
    		obj.cltx1=mainGrid.getCellData(r,'cltx1');
    		obj.cltx2=mainGrid.getCellData(r,'cltx2');
    		obj.cltx3=mainGrid.getCellData(r,'cltx3');
    		obj.row=r;
    		recs.push(obj);
    	})
    	switch(btn.itemId){
    		case 'RefreshProvider':
    			var result = erp.Const.callServiceMethodSync(
					'purchasedetail/purchasedetail.act?method=getRefreshProvider', {
					recstr:Ext.encode(recs)
				});
				var data = Ext.decode(result);
				if (!data.bool) {
					Ext.toastErrorInfo(data.msg);
					return;
				}
				for(i=0;i<recs.length;i++){
					mainGrid.setCellData(recs[i].row,'csbh',data.cd[i].csbh);
					mainGrid.setCellData(recs[i].row,'csmc',data.cd[i].csmc);
				}
				myMask.unmask();
				mainGrid.closeMask();
				Ext.toastErrorInfo("以最新供应商信息同步完成!");
    		break;
    	}
    },
    onBatchClickButton:function(menu,btn){
    	var me=this;
    	var mainGrid=this.lookupReference('PurchaseDetailGrid');
    	var mainPanel=me.getView();
    	var myMask = new Ext.LoadMask({
			target : mainPanel
		});
    	var rows =mainGrid.getCurrentRow();
    	if(rows==''){
    		mainGrid.closeMask();
    		myMask.unmask();
    		Ext.Msg.alert('提示','请至少选择一条记录!');
    		return ;
    	}
    	var rowArr=rows.split(',');
    	var recs=new Array();
    	var cgh=new Array();
    	Ext.each(rowArr,function(r){
    		var obj=new Object();
    		obj.cgbh=mainGrid.getCellData(r,'cgbh');
    		obj.cgxh=mainGrid.getCellData(r,'cgxh');
    		obj.clhh=mainGrid.getCellData(r,'clhh');
    		obj.cgsl=mainGrid.getCellData(r,'cgsl');
    		obj.jhrq=Ext.Date.parse(mainGrid.getCellData(r,'jhrq'),'Y.m.d H:i:s');
    		obj.sxrq=Ext.Date.parse(mainGrid.getCellData(r,'sxrq'),'Y.m.d H:i:s');
    		obj.cgtqq=mainGrid.getCellData(r,'cgtqq');
    		obj.row=r;
    		cgh.push("'"+obj.cgbh+"-"+obj.cgxh+"'");
    		recs.push(obj);
    	})
    	var cghs=cgh.join(",");
    	switch(btn.itemId){
    		case 'allotBuyerGroup':
    			var cgzm='';
    			var groupStore=Ext.create('erp.master.group.store.Group');
    			groupStore.proxy.extraParams.usePaging=false;
    			groupStore.load();
    			var win=Ext.create('erp.view.master.purchaseDetail.window.BatchChange',{
    				width:300,
    				height:120,
    				title:'采购组批量编辑',
    				item:[{
						name : 'cgzm',
						itemId:'cgzm',
						fieldLabel:'采购组名',
						labelWidth:60,
						columnWidth: 1,
						queryMode : 'local',
						xtype:'combo',
						displayField:'cgzm',
						valueField:'cgzh',
						store:groupStore,
						fieldConfig:{forceSelection:false},
						listeners:{
							select :function(o,  rec,  oldValue,  eOpts){
								cgzm=rec.get('cgzm');
		                    },
		                    change:function(t , newValue , oldValue , eOpts ){
		                    }
						}
			  		}]
    			})
    			win.down('#BTN_YES').on({click:function(btn){
    				var win=btn.up('window');
    				var cgzh=win.down('#cgzm').getValue();
    				if(cgzh==null||Ext.String.trim(cgzh)==''){
    					Ext.Msg.alert('提示','请选择采购员！');
    					return ;
    				}
    				Ext.Msg.confirm('提示','是否确认将选中的行的采购组改为【'+cgzm+'】?',function(btn){
							if(btn=='yes'){
								myMask.mask('正在更新，请等待......');
								mainGrid.showMask();
								Ext.each(recs,function(rec){
									mainGrid.setCellData(rec.row,'cgzh',cgzh);
									mainGrid.setCellData(rec.row,'cgzm',cgzm);
						    	})
						    	win.close();
								var result = erp.Const.callServiceMethodSync(
									'purchasedetail/purchasedetail.act?method=getBatchChange', {
									field:'cgzh',val:cgzh,cgh:cghs
								});
								myMask.unmask();
								mainGrid.closeMask();
								var data = Ext.decode(result);
								if (!data.bool) {
									Ext.toastErrorInfo(data.msg);
									return;
								}
							}
					})
    			}})
    			win.show();
    		break;
    		case 'allotProduct':
    			var csmc='';
    			var win=Ext.create('erp.view.master.purchaseDetail.window.BatchChange',{
    				width:300,
    				height:120,
    				title:'供应厂商批量编辑',
    				item:[{
						itemId:'csbh',
			  			name:'csbh',
			  			xtype:'helpField',
						code : erp.DataConst.FACTORYINFO,
						fieldConfig:{forceSelection:true},
						columnWidth: 1,
						listeners:{
							change :function(o,  newValue,  oldValue,  eOpts){
								if(o.displayTplData!=null){
									var data=o.displayTplData;
									if(data.length>0){
										var rec=data[0];
										csmc=rec.csmc;
									}
								}
		                    }
						}
			  		}]
    			})
    			win.down('#BTN_YES').on({click:function(btn){
    				var win=btn.up('window');
    				var csbh=win.down('#csbh').getValue();
    				if(csbh==null||Ext.String.trim(csbh)==''){
    					Ext.Msg.alert('提示','请选择供货厂商！');
    					return ;
    				}
    				Ext.Msg.confirm('提示','是否确认将选中的行的供应厂商改为【'+csmc+'】?',function(btn){
							if(btn=='yes'){
								myMask.mask('正在更新，请等待......');
								mainGrid.showMask();
								Ext.each(recs,function(rec){
									mainGrid.setCellData(rec.row,'csbh',csbh);
									mainGrid.setCellData(rec.row,'csmc',csmc);
						    	})
								win.close();
								var result = erp.Const.callServiceMethodSync(
									'purchasedetail/purchasedetail.act?method=getCsbhBatchChange', {
									recstr:Ext.encode(recs),csbh:csbh
								});
								myMask.unmask();
								mainGrid.closeMask();
								var data = Ext.decode(result);
								if (!data.bool) {
									Ext.toastErrorInfo(data.msg);
									return;
								}
								//store.load();
							}
					})
    			}})
    			win.show();
    		break;
    		case 'allotBuyer':
    			var cgyxm='';
    			var win=Ext.create('erp.view.master.purchaseDetail.window.BatchChange',{
    				width:300,
    				height:120,
    				title:'采购员批量编辑',
    				item:[{
						name : 'cgym',
						itemId:'cgym',
						fieldLabel:'采购员名',
						labelWidth:60,
						columnWidth: 1,
						xtype:'helpField',
						code : erp.DataConst.PurGroupMan,
						fieldConfig:{forceSelection:false},
						listeners:{
							change :function(o,  newValue,  oldValue,  eOpts){
								if(o.displayTplData!=null){
									var data=o.displayTplData;
									if(data.length>0){
										var rec=data[0];
										cgyxm=rec.cgyxm;
									}
								}
		                    }
						}
			  		}]
    			})
    			win.down('#BTN_YES').on({click:function(btn){
    				var win=btn.up('window');
    				var cgym=win.down('#cgym').getValue();
    				if(cgym==null||Ext.String.trim(cgym)==''){
    					Ext.Msg.alert('提示','请选择采购员！');
    					return ;
    				}
    				Ext.Msg.confirm('提示','是否确认将选中的行的采购员改为【'+cgyxm+'】?',function(btn){
							if(btn=='yes'){
								myMask.mask('正在更新，请等待......');
								mainGrid.showMask();
								Ext.each(recs,function(rec){
									mainGrid.setCellData(rec.row,'cgyxm',cgyxm);
									mainGrid.setCellData(rec.row,'cgym',cgym);
						    	})
						    	win.close();
								var result = erp.Const.callServiceMethodSync(
									'purchasedetail/purchasedetail.act?method=getBatchChange', {
									field:'cgym',val:cgym,cgh:cghs
								});
								myMask.unmask();
								mainGrid.closeMask();
								var data = Ext.decode(result);
								if (!data.bool) {
									Ext.toastErrorInfo(data.msg);
									return;
								}
							}
					})
    			}})
    			win.show();
    		break;
    	}
    },
    EdtOutSourceClickButton:function(btn){
    	var me=this;
    	var mainPanel=me.getView();
    	var mStore=mainPanel.mStore;
    	var mainGrid=this.lookupReference('OutSourceDetailGrid');
    	var mainStore=mainGrid.getStore();
    	var subGrid=this.lookupReference('MaterialGrid');
    	var subStore=subGrid.getStore();
    	var form=this.lookupReference('OutSourceForm');
    	var recs =mainGrid.getSelectionModel().getSelection();
    	switch(btn.itemId){
    		case 'SourceAdd':
    			var wxxh=mainStore.max('wxxh');
    			if(wxxh==null){
    				wxxh=1;
    			}else{
    				wxxh++;
    			}
    			var rec=Ext.create('erp.view.master.purchaseDetail.model.OutSourceDetail',{
    				wxxh:wxxh,
    				wxdh:form.down('#wxdh').getValue()
    			});
    			rec.phantom=true;
    			mainStore.add(rec);
    		break;
    		case 'SourceDel' :
				var recs = mainGrid.getSelectionModel().getSelection();
				Ext.Msg.confirm('提示', '是否确认删除明细?', function(btn) {
							if (btn == 'yes') {
								mainStore.remove(recs);
							}
						})
			break;
    		case 'MaterialAdd':
    			var drecs= mainGrid.getSelectionModel().getSelection();
    			if(drecs.length==0){
    				Ext.Msg.alert('提示','请选择需要添加明细的记录！');
    				return ;
    			}
    			var drec=drecs[0];
    			var maxtzxh=subStore.max('tzxh');
    			if(maxtzxh==null){
    				maxtzxh=0;
    			}
    			var win = Ext.create('erp.view.master.purchaseDetail.window.OutSourceMaterialImp');
				win.down('#BTN_YES').on({
					click : function(btn) {
						var win = btn.up('window');
						var grid = win.down('#Material');
						var recs = grid.getSelectionModel().getSelection();
						var result = erp.Const.callServiceMethodSync('purchasedetail/outsource.act?method=getOutSourceSubsidiaryImp',
										{
											recstr : erp.Util.ModelsToJson(recs),
											wxdh : drec.get('wxdh'),
											wxxh : drec.get('wxxh'),
											oscount:subStore.getCount(),
											maxtzxh :maxtzxh
										});
						var data = Ext.decode(result);
						if (!data.bool) {
							Ext.toastErrorInfo(data.msg);
							return;
						}
						Ext.each(data.SubList,function(r){
							var nr =Ext.create('erp.view.master.purchaseDetail.model.OutSourceSubsidiary',r);
							nr.phantom=true;
							subStore.add(nr);
						})
						subStore.filterBy(function(r){
							return r.get('wxxh')==drec.get('wxxh');
						});
						win.close();
					}
				});
				win.show();
    		break;
    		case 'MaterialDel':
    			var recs = subGrid.getSelectionModel().getSelection();
				Ext.Msg.confirm('提示', '是否确认删除明细?', function(btn) {
							if (btn == 'yes') {
								subStore.remove(recs);
							}
						})
    		break;
    		case 'template' :
				var win = Ext.create('erp.common.basic.view.TemplateHelp', {
							winParam : {
								mbbh : '0202'
							},
							title : '外协备注'
						});
				callback = function(value, target) {
					mainPanel.down('#OutSourceBzsm').setValue(value);
				};
				win.initWindow(callback, 'mbnr', 'bzsm');
				win.show();
				break;
    		case 'BTN_SAVE':
    			var rec=form.getRecord();
    			form.updateRecord(rec);
    			var jhlb,csbh;
    			var jhlb=rec.get('jhlb');
    			var csbh=rec.get('csbh');
    			if(jhlb==null||Ext.String.trim(jhlb)==''){
    				Ext.Msg.alert('提示','计划类别不能为空!');
    				break;
    			}
    			if(csbh==null||Ext.String.trim(csbh)==''){
    				Ext.Msg.alert('提示','外协厂商不能为空!');
    				break;
    			}
    			rec.set('httk',mainPanel.down('#OutSourceBzsm').getValue());
    			Ext.Msg.confirm('提示', '是否确认保存?', function(btn) {
					if (btn == 'yes') {
						if(rec.phantom){
							mStore.add(rec);
							mStore.sync({
								callback : function(batch, options) {
									var nrec = null;
									if (options.operations.create != null) {
										nrec = options.operations.create[0];
									} else {
										nrec = options.operations.update[0]
									}
									mainStore.each(function(dr) {
										dr.set('wxdh',nrec.get('wxdh'));
									})
									subStore.each(function(sr) {
										sr.set('wxdh',nrec.get('wxdh'));
									})
									form.loadRecord(nrec);
									mainStore.sync({
												callback : function(batch,options) {
													
												}
											});
									subStore.sync();
									Ext.toastInfo('保存完毕!');
								}
							});	
						}else{
							mStore.sync({callback:function(batch,options){
							}});
							mainStore.sync({callback:function(batch,options){
								
							}});
							subStore.sync();
							Ext.toastInfo('保存完毕!');
						}		
					}
				})
    		break;
    	}
    },
    onClickButton: function (btn) {
    	var me=this;
    	var mainGrid=this.lookupReference('PurchaseDetailGrid');
    	var mainPanel=me.getView();
    	var myMask = new Ext.LoadMask({
			target : mainPanel
		});
    	var login_id=erp.Util.currentUser.loginId;
    	var ip=erp.Util.currentUser.IP;
    	switch(btn.itemId){
			case 'btn_query':
				var search=mainPanel.search;
				var win =Ext.create('erp.view.master.purchaseDetail.window.PurchaseDetailSearch',{
					mainGrid:mainGrid,
					mainPanel:mainPanel,
					search:search
				});
				win.show();
			break;
			case 'CreateContract':
				var rows =mainGrid.findAll("checked=1");
				var rows=rows.split(',');
				if(rows.length==0){
					Ext.Msg.alert('提示','请选中某行或多行再使用此功能！');
					break;
				}
				var forEdtSearch = new Array(); //参数
				var cgym=mainGrid.getCellData(rows[0],'cgym');
				var show_cgym=false;
				var bool=false;
				var jhbzHz='';
				var aa=false;
				var old_cgbh='';
				var csbh='';
				//获取不为空的厂商
				Ext.each(rows,function(r){
					if(mainGrid.getCellData(r,'csbh')!=''){
						csbh=mainGrid.getCellData(r,'csbh');
						return false;
					}
				})
				var myMask = new Ext.LoadMask({
					 msg    : '数据导入中...',
					 target : mainGrid
				});
				myMask.mask('数据验证中...');
				Ext.each(rows,function(r){
					forEdtSearch.push(" (cgbh='"+mainGrid.getCellData(r,'cgbh')+"' and cgxh='"+mainGrid.getCellData(r,'cgxh')+"' ) ");
					if(cgym!=mainGrid.getCellData(r,'cgym')){
						show_cgym=true;
					}
					if(mainGrid.getCellData(r,'qfbj')==0){
						bool=true;
						Ext.Msg.alert('提示','未签发的计划不能转成合同!');
						mainGrid.selectRow(r);
						return false;
					}
					var newcsbh=mainGrid.getCellData(r,'csbh');
					if(csbh!=newcsbh&&newcsbh!=''){
						bool=true;
						Ext.Msg.alert('提示','所选记录的厂商名称不一致，不能生成采购合同!');
						mainGrid.selectRow(r);
						return false;
					}
					var s_cgbh=mainGrid.getCellData(r,'cgbh');
					var ss_jhbz=Ext.String.trim(mainGrid.getCellData(r,'jhbz'));
					if(!aa){
						jhbzHz+=ss_jhbz;
						old_cgbh=s_cgbh;
						aa=true;
					}else{
						if(s_cgbh!=old_cgbh){
							old_cgbh=s_cgbh;
							jhbzHz+='/'+ss_jhbz;
						}
					}
				})
				myMask.unmask();
				if(bool){
					return false;
				}
				//console.log(Ext.Date.getElapsed(new Date(),tt)/1000);
				tt=new Date();
				if(show_cgym){
    				if(!confirm('所选记录所属的采购员不一致!')){
    					break;
    				}
				}
				myMask.mask('数据导入中...');
				var czym=erp.Util.currentUser.userInfo.name;
				//将正式表数据导入临时表
				var result = erp.Const.callServiceMethodSync(
					'purchaseorder/purchaseorderdetail.act?method=addPurchaseOrderDetailToCacheTable', {
					htbh:0,login_id:login_id,ip:ip,isCopy:0
				});
				//参数初始化
				var result = erp.Const.callServiceMethodSync(
					'purchasedetail/purchasecontract.act?method=getBeforCreate', {
					login_id:login_id,ip:ip,
					csbh:csbh,cgyxm:erp.Util.currentUser.isAdmin?'王剑':czym,forEdtSearch:forEdtSearch.join('or'),czy_gh:erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id
				});
				var data=Ext.decode(result);
				myMask.unmask();
				if (!data.bool) {
					Ext.toastErrorInfo(data.msg);
					return;
				}
				/*var conDetList=data.ConDetList;
				var drecs=new Array();
				var contractSubsidiaryList=data.ContractSubsidiaryList;
				var screcs=new Array();
				Ext.each(contractSubsidiaryList,function(cs){
					var screc=Ext.create('erp.view.master.purchaseDetail.model.ContractSubsidiary',cs);
					screc.phantom=true;
					screcs.push(screc);
				})
				Ext.each(conDetList,function(obj){
					var drec=Ext.create('erp.view.master.purchaseDetail.model.ContractDetail',obj);
					drec.phantom=true;
					drecs.push(drec);
				})*/
				var mrec=Ext.create('erp.view.master.purchaseDetail.model.PurchaseContract',{
					csbh:csbh,
					cglx:'常规',
					htgz:'常规',
					qzgz:'常规',
					htbh:0,
					cgym:data.cgybh,
					ztdw:data.ztbh,
					cslxr:data.lxrm,
					wbbh:data.wbbh,
					czsj:new Date(),
					cgrq:new Date(),
					czym:czym,
					cgbz:jhbzHz
				});
				mrec.phantom=true;
				var panel=erp.Util.addContentTab({
					xtype:'EdtPurchaseContract',
					itemId:'EdtPurchaseContract',
					title : '采购合同编辑',
					isAdd : true,
					isEdit : true,
					mainPanel:this.getView(),
					mrec:mrec,
					//drecs:drecs,
					//screcs:screcs,
					closable : true
				});
			break;
			case 'CreateOutsource':
				var recs =mainGrid.getSelectRowForChecked();
				if(recs.length==0){
					Ext.Msg.alert('提示','请选中某行或多行再使用此功能！');
					break;
				}
				var bool=false;
				var jhbzHz='';
				var aa=false;
				var old_cgbh='';
				var recordData = "["; //参数
				Ext.each(recs,function(rec){
					if(rec.get('qfbj')==0){
						bool=true;
						Ext.Msg.alert('提示','未签发的计划不能转成外协!');
						mainGrid.selectRow(rec.row);
						return false;
					}
					Ext.each(recs,function(r){
						if(rec.get('csbh')!=r.get('csbh')){
							bool=true;
							Ext.Msg.alert('提示','所选记录的厂商名称不一致，不能生成外协通知!');
							mainGrid.selectRow(rec.row);
							return false;
						}
						if(rec.get('cgym')!=r.get('cgym')){
							bool=true;
							Ext.Msg.alert('提示','所选记录所属的采购员不一致!');
							mainGrid.selectRow(rec.row);
							return false;
						}
					})
					if(bool){
						return false;
					}
					if(aa){
						recordData+=",";
					}else{
						aa=true;
					}
					recordData+=Ext.encode(rec.data);
				})
				recordData+="]";
				if(bool){
					break;
				}
				var czym=erp.Util.currentUser.userInfo.name;
				var csbh=recs[0].get('csbh');
				//参数初始化
				var result = erp.Const.callServiceMethodSync(
					'purchasedetail/outsource.act?method=getBeforCreate', {
					csbh:csbh,cgyxm:erp.Util.currentUser.isAdmin?'王剑':czym,recordData:recordData,czy_gh:erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id
				});
				var data=Ext.decode(result);
				if (!data.bool) {
					Ext.toastErrorInfo(data.msg);
					return;
				}
				var conDetList=data.ConDetList;
				var drecs=new Array();
				var contractSubsidiaryList=data.ContractSubsidiaryList;
				var screcs=new Array();
				Ext.each(conDetList,function(cd){
					var drec=Ext.create('erp.view.master.purchaseDetail.model.OutSourceDetail',cd);
					drec.phantom=true;
					drecs.push(drec);
				})
				var mrec=Ext.create('erp.view.master.purchaseDetail.model.OutSource',{
					csbh:csbh,
					jhlb:Ext.String.trim(recs[0].get('jhlb')),
					czsj:new Date(),
					wxrq:new Date(),
					wcrq:new Date(),
					lllx:0,
					czym:czym,
					wxdh:0,
					ztdw:''
				});
				mrec.phantom=true;
				var panel=erp.Util.addContentTab({
					xtype:'EdtOutSource',
					itemId:'EdtOutSource',
					title : '外协通知单编辑',
					isAdd : true,
					isEdit : true,
					mainPanel:this.getView(),
					mrec:mrec,
					drecs:drecs,
					closable : true
				});
				panel.on('close',function(p){
					mainGrid.mask('数据加载中！');
					mainGrid.getStore().load({callback:function(recs){
							mainGrid.unmask();
						}
					});
				})
			break;
			case 'HistoryPurchase':
				if(btn.text=='历史采计'){
					var win =Ext.create('erp.view.master.purchaseDetail.window.OldPurSearch',{
						btn:btn,
						mainPanel:mainPanel
					});
					win.show();
				}else{
					delete 	mainPanel.params.oldsearch;
					mainPanel.params.gdbj=0;
					mainGrid.load(mainPanel.params);
					btn.setText('历史采计');
					mainPanel.setHistoreBtnStatus(false);
				}
			break;
			case 'AogBps':
				var recs =mainGrid.getSelectRow();
				if(recs.length==0){
					Ext.Msg.alert('提示','请至少选择一条记录！');
					break;
				}
				var win=Ext.create('erp.view.master.purchaseDetail.window.AogBpsSearch',{
					cgbh:recs[0].get('cgbh'),
					cgxh:recs[0].get('cgxh')
				});
				win.show();
			break;
			case 'EditQuery':
				var recs =mainGrid.getSelectRow();
				if(recs.length==0){
					Ext.Msg.alert('提示','请至少选择一条记录！');
					break;
				}
				var win=Ext.create('erp.view.master.purchaseDetail.window.BomChangeSearch',{
					cgbh:recs[0].get('cgbh'),
					cgxh:recs[0].get('cgxh')
				});
				win.show();
			break;
			case 'Allot':
				var rows =mainGrid.getCurrentRow();
		    	if(rows==''){
		    		Ext.Msg.alert('提示','请至少选择一条记录!');
		    		break ;
		    	}
		    	var rowArr=rows.split(',');
		    	var recs=new Array();
		    	var spbj=mainGrid.getCellData(rowArr[0],'spbj');
		    	var cghArr=new Array();
		    	var bool=false;
		    	Ext.each(rowArr,function(r){
		    		var cgym=mainGrid.getCellData(r,'cgym');
					var cgzh=mainGrid.getCellData(r,'cgzh');
					if(spbj!=mainGrid.getCellData(r,'spbj')){
						Ext.Msg.alert('提示','请选择状态相同的记录!');
						bool=true;
						return false;
					}
					if(cgym==null||Ext.String.trim(cgym)==''){
						Ext.Msg.alert('提示','所选记录中有记录采购员名为空，不允许分配!');
						bool=true;
						return false;
					}
					if(cgzh==null||Ext.String.trim(cgzh)==''){
						Ext.Msg.alert('提示','所选记录中有记录采购组为空，不允许分配!');
						bool=true;
						return false;
					}
		    		var obj=new Object();
		    		obj.cgbh=mainGrid.getCellData(r,'cgbh');
		    		obj.cgxh=mainGrid.getCellData(r,'cgxh');
		    		obj.row=r;
		    		var cgh="'"+obj.cgbh+"-"+obj.cgxh+"'";
		    		cghArr.push(cgh);
		    		recs.push(obj);
		    	})
				if(bool){
					break;
				}
				var bb='';
				var state=1;
				if(spbj==1){
					bb='取消';
					state=0;
				}
				Ext.Msg.confirm('提示','是否确认'+bb+'分配所选采购计划?',function(btn){
							if(btn=='yes'){
								myMask.mask('正在更新，请等待......');
								mainGrid.showMask();
								var result = erp.Const.callServiceMethodSync(
									'purchasedetail/purchasedetail.act?method=getBatchChangeSpbj', {
									spbj:state,cgh:cghArr.join(','),czym:erp.Util.currentUser.userInfo.name
								});
								var data = Ext.decode(result);
								if (!data.bool) {
									Ext.toastErrorInfo(data.msg);
									return;
								}
								Ext.each(recs,function(rec){
									mainGrid.setCellData(rec.row,'spbj',state);
									mainGrid.setCellData(rec.row,'sprm',erp.Util.currentUser.userInfo.name);
									mainGrid.setCellData(rec.row,'spsj',new Date());
								})
								myMask.unmask();
								mainGrid.closeMask();
							}
					})
			break;
			case 'Discontinue':
				var rows =mainGrid.getCurrentRow();
		    	if(rows==''){
		    		Ext.Msg.alert('提示','请至少选择一条记录!');
		    		return ;
		    	}
		    	var rowArr=rows.split(',');
		    	var recs=new Array();
		    	var zzbj=mainGrid.getCellData(rowArr[0],'zzbj');
		    	var cghArr=new Array();
		    	var bool=false;
		    	Ext.each(rowArr,function(r){
		    		var cgym=mainGrid.getCellData(r,'cgym');
					var cgzh=mainGrid.getCellData(r,'cgzh');
					if(zzbj!=mainGrid.getCellData(r,'zzbj')){
						Ext.Msg.alert('提示','请选择状态相同的记录!');
						bool=true;
						return false;
					}
		    		var obj=new Object();
		    		obj.cgbh=mainGrid.getCellData(r,'cgbh');
		    		obj.cgxh=mainGrid.getCellData(r,'cgxh');
		    		obj.row=r;
		    		var cgh="'"+obj.cgbh+"-"+obj.cgxh+"'";
		    		cghArr.push(cgh);
		    		recs.push(obj);
		    	})
				if(bool){
					break;
				}
				var bb='';
				var state=1;
				if(zzbj==1){
					bb='取消';
					state=0;
				}
				Ext.Msg.confirm('提示','是否确认'+bb+'中止所选采购计划?',function(btn){
							if(btn=='yes'){
								var czym=erp.Util.currentUser.userInfo.name;
								if(zzbj==0){
									var win=Ext.create('erp.view.master.purchaseDetail.window.BatchChange',{
										title:'中止原因',
										width:300,
    									height:220,
										item:[{
											xtype:'textarea',
											itemId:'zzyx',
											height:100
										}]
									});
									win.down('#BTN_YES').on({'click':function(btn){
										var win =btn.up('window');
										var s_zzyx =win.down('#zzyx').getValue();
										myMask.mask('正在更新，请等待......');
										mainGrid.showMask();
										var result = erp.Const.callServiceMethodSync(
											'purchasedetail/purchasedetail.act?method=getBatchChangeZzbj', {
											state:state,cgh:cghArr.join(','),
											czym:czym,
											zzyx:s_zzyx
										});
										var data = Ext.decode(result);
										if (!data.bool) {
											Ext.toastErrorInfo(data.msg);
											return;
										}
										//用前台数据更改代替交互
										Ext.each(recs,function(rec){
											/*rec.set('zzbj',state);
											rec.set('wcbj',state);
											rec.set('zzrm',czym);
											rec.set('zzsj',new Date());
											rec.set('zzyx',s_zzyx);
											rec.commit();*/
											mainGrid.setCellData(rec.row,'zzbj',state);
											mainGrid.setCellData(rec.row,'wcbj',state);
											mainGrid.setCellData(rec.row,'zzrm',czym);
											mainGrid.setCellData(rec.row,'zzsj',new Date());
											mainGrid.setCellData(rec.row,'zzyx',s_zzyx);
											
										})
										win.close();
										myMask.unmask();
										mainGrid.closeMask();
									}})
									win.show();
								}else{
									myMask.mask('正在更新，请等待......');
									mainGrid.showMask();
									var result = erp.Const.callServiceMethodSync(
										'purchasedetail/purchasedetail.act?method=getBatchChangeZzbj', {
											state:state,cgh:cghArr.join(','),
											czym:erp.Util.currentUser.userInfo.name,
											zzyx:''
									});
									var data = Ext.decode(result);
									if (!data.bool) {
										Ext.toastErrorInfo(data.msg);
										return;
									}
									//用前台数据更改代替交互
									Ext.each(recs,function(rec){
										mainGrid.setCellData(rec.row,'zzbj',state);
										mainGrid.setCellData(rec.row,'wcbj',state);
										mainGrid.setCellData(rec.row,'zzrm',czym);
										mainGrid.setCellData(rec.row,'zzsj',new Date());
										mainGrid.setCellData(rec.row,'zzyx','');
									})
									myMask.unmask();
									mainGrid.closeMask();
								}
							}
					})
			break;
			case 'Error':
				var rows =mainGrid.getCurrentRow();
		    	if(rows==''){
		    		Ext.Msg.alert('提示','请至少选择一条记录!');
		    		return ;
		    	}
		    	var rowArr=rows.split(',');
		    	var recs=new Array();
		    	var ywbj=mainGrid.getCellData(rowArr[0],'ywbj');
		    	var cghArr=new Array();
		    	var cgbhArr=new Array();
		    	var bool=false;
		    	Ext.each(rowArr,function(r){
		    		var cgym=mainGrid.getCellData(r,'cgym');
					var cgzh=mainGrid.getCellData(r,'cgzh');
					var nywbj=mainGrid.getCellData(r,'ywbj');
					var qfbj=mainGrid.getCellData(r,'qfbj');
					if(ywbj!=nywbj){
						Ext.Msg.alert('提示','请选择状态相同的记录!');
						bool=true;
						return false;
					}
					if(qfbj==0){
						Ext.Msg.alert('提示','只有签发的记录，才能打上有误标记!');
						bool=true;
						return false;
					}
		    		var obj=new Object();
		    		obj.cgbh=mainGrid.getCellData(r,'cgbh');
		    		obj.cgxh=mainGrid.getCellData(r,'cgxh');
		    		obj.row=r;
		    		var cgh="'"+obj.cgbh+"-"+obj.cgxh+"'";
		    		cghArr.push(cgh);
		    		cgbhArr.push("'"+obj.cgbh+"'");
		    		recs.push(obj);
		    	})
				if(bool){
					break;
				}
				var bb='';
				var state=1;
				if(ywbj==1){
					bb='取消';
					state=0;
				}
				Ext.Msg.confirm('提示','是否确认'+bb+'所选采购计划有误?',function(btn){
							if(btn=='yes'){
								if(ywbj==0){
									var win=Ext.create('erp.view.master.purchaseDetail.window.BatchChange',{
										title:'有误原因',
										width:300,
    									height:220,
										item:[{
											xtype:'textarea',
											itemId:'ywzy',
											height:100
										}]
									});
									win.down('#BTN_YES').on({'click':function(btn){
										var win =btn.up('window');
										var s_ywzy =win.down('#ywzy').getValue();
										if(s_ywzy==null||Ext.String.trim(s_ywzy)==''){
											return ;
										}
										myMask.mask('正在更新，请等待......');
										mainGrid.showMask();
										var result = erp.Const.callServiceMethodSync(
											'purchasedetail/purchasedetail.act?method=getBatchChangeYwbj', {
											state:state,cgh:cghArr.join(','),
											czym:erp.Util.currentUser.userInfo.name,
											ywzy:s_ywzy,
											cgbh:cgbhArr.join(',')
										});
										var data = Ext.decode(result);
										if (!data.bool) {
											Ext.toastErrorInfo(data.msg);
											return;
										}
										Ext.each(recs,function(rec){
											mainGrid.setCellData(rec.row,'qfbj',0);
											mainGrid.setCellData(rec.row,'ywzy',s_ywzy);
											mainGrid.setCellData(rec.row,'ywbj',state);
										})
										myMask.unmask();
										mainGrid.closeMask();
										win.close();
									}})
									win.show();
								}else{
									myMask.mask('正在更新，请等待......');
									mainGrid.showMask();
									var result = erp.Const.callServiceMethodSync(
											'purchasedetail/purchasedetail.act?method=getBatchChangeYwbj', {
											state:state,cgh:cghArr.join(','),
											czym:erp.Util.currentUser.userInfo.name,
											cgbh:cgbhArr.join(',')
										});
									var data = Ext.decode(result);
									if (!data.bool) {
										Ext.toastErrorInfo(data.msg);
										return;
									}
									Ext.each(recs,function(rec){
										mainGrid.setCellData(rec.row,'ywbj',state);
									})
									myMask.unmask();
									mainGrid.closeMask();
								}
							}
					})
			break;
			case 'normsQuery':
				var recs =mainGrid.getSelectRow();
				if(recs.length==0){
					Ext.Msg.alert('提示','请选择一条记录！');
					break;
				}
				var win =Ext.create('erp.view.master.purchaseDetail.window.PurSupplierSearch',{
					clhh:recs[0].get('clhh'),
					clmc:recs[0].get('clmc'),
					cltx1:recs[0].get('cltx1')
				});
				win.setTitle('供应商-规格查询【材料名称:'+recs[0].get('clmc')+'】');
				win.show();
			break;
			case 'ProviderQuery':
				var recs =mainGrid.getSelectRow();
				if(recs.length==0){
					Ext.Msg.alert('提示','请选择一条记录！');
					break;
				}
				var win =Ext.create('erp.view.master.purchaseDetail.window.PurSupplierSearch',{
					clhh:recs[0].get('clhh'),
					clmc:recs[0].get('clmc')
				});
				
				win.show();
			break;
    	}
    }
});