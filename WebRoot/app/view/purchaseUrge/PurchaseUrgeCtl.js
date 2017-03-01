Ext.define('erp.view.purchaseUrge.PurchaseUrgeCtl', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Ext.window.MessageBox',
        'erp.view.purchaseOrder.window.Suspend',
        'erp.view.purchaseUrge.window.*',
        'erp.view.purchaseOrder.window.ArrivalThree',
        'erp.view.purchaseUrge.model.MainSearch'
    ],
    control:{
		//主界面按钮
		'PurchaseUrge #PurchaseUrgeBar button':{
			click:'mainButton'
		},
		//操作功能
		'PurchaseUrge #menu_op':{
			click:'menuOpButton'
		},
		//确定时间
		'confirmTime #ConfirmTimeBar button':{
			click:'confirmTimeButton'
		},
		//其他功能
		'PurchaseUrge #menu_oop':{
			click:'menuOopButton'
		},
		//协同追催
		'PurchaseUrge #menu_synergyUrge':{
			click:'menuSynergyButton'
		}
	},
    alias: 'controller.PurchaseUrgeCtl',
    init:function(){
    	var me=this;
    	var curDate=new Date();
		curDate.setDate(1);
		var nDate=new Date();
    	me.searchModel=Ext.create('erp.view.purchaseUrge.model.MainSearch',{
    		jhrq:curDate,
    		jhrqw:nDate,
    		jzrq:nDate,
    		jzrq2:nDate,
    		hqjq:curDate,
    		hqjqw:nDate,
    		rwsx:curDate,
    		rwsxw:nDate
    	});
    	me.s_lgzc=0;
    	me.s_hbzc=0;
    },
    menuSynergyButton:function(meun,btn){
    	var me=this;
    	var win=me.getView();
    	var grid=win.down('#PurchaseUrgeGrid');
    	var store=grid.getStore();
    	var cols=grid.columns;
    	var recs=grid.getSelectionModel().getSelection();
    	var myMask = new Ext.LoadMask({
			target : win
		});
    	switch (btn.itemId){
    		case 'btn_oop1':
    			if(recs.length==0){
					Ext.toastInfo('请选择一条或多条合同明细!');
					break;
				}
    			var hths=new Array();
    			var htbhs=new Array();
    			var bool=false;
    			var csbh=recs[0].get('csbh');
				Ext.each(recs,function(r){
					if(recs[0].get('csbh')!=csbh){
    					Ext.toastInfo('请选择厂商一直的记录！！！');
    					bool=true;
    					return false;
    				}
					hths.push("'"+r.get('htbh')+'-'+r.get('htxh')+"'");
					htbhs.push("'"+r.get('htbh')+"'");
				});
				if(bool){
					break;
				}
				Ext.Msg.confirm('提示', '是否确认发送所选产品？', function(btn) {
					if (btn == 'yes') {
						var login_id=erp.Util.getPlatformLoginId();
    					if (login_id == '') {
							Ext.toastInfo('请分配平台对应账户！');
							return;
						}
						myMask.mask('数据发送中...');
						var result = erp.Const.callServiceMethodSync('purchaseurge/purchaseurgews.act?method=getPfSynergyUrge',{
							login_id : login_id,
							hths : hths.join(','),
							htbhs:htbhs.join(','),
							csbh : csbh
						});
						myMask.unmask();
						var data = Ext.decode(result);
						if (!data.bool) {
							Ext.toastErrorInfo(data.msg);
							return;
						} else {
							Ext.toastErrorInfo("发送成功");
						}
					}
				})
    		break;
    		case 'btn_oop2':
    			var login_id = erp.Util.getPlatformLoginId();
				if (login_id == '') {
					Ext.toastInfo('请分配平台对应账户！');
					return;
				}
				var win = Ext.create('erp.view.purchaseUrge.window.SynergyUrgeAccept',{
					login_id:login_id,htbh : recs[0].get('htbh')
				});
    			win.down('#BTN_YES').on({
    				click:function(btn){
    					var win=btn.up('window');
    					var grid=win.down('#mainGrid');
    					var recs=grid.getSelectionModel().getSelection();
    					if(recs.length==0){
    						Ext.toastInfo('请选择通知单！');
							return;
    					}
    					Ext.Msg.confirm('提示', '是否确认接收所选通知单？', function(btn) {
							if (btn == 'yes') {
								myMask.mask('数据接收中...');
								var czym=erp.Util.currentUser.userInfo.name;
								var result = erp.Const.callServiceMethodSync('purchaseurge/purchaseurgews.act?method=getAccNotice',{
									recs:erp.Util.ModelsToJson(recs),
									login_id : login_id,
									czym:czym
								});
								myMask.unmask();
								var data = Ext.decode(result);
								if (!data.bool) {
									Ext.toastErrorInfo(data.msg);
									return;
								}else{
									Ext.toastErrorInfo("接收成功，如需查看结果请刷新界面！");
									win.close();
								}
							}
						})
    				}
    			})
    			win.show();
    		break;
    	}
    },
    menuOopButton:function(meun,btn){
    	var me=this;
    	var win=me.getView();
    	var grid=win.down('#PurchaseUrgeGrid');
    	var store=grid.getStore();
    	var cols=grid.columns;
    	var recs=grid.getSelectionModel().getSelection();
    	var myMask = new Ext.LoadMask({
			target : win
		});
    	switch (btn.itemId){
    		case 'btn_oop5':
    			if(recs.length==0){
					Ext.toastInfo('请选择一条或多条合同明细!');
					break;
				}
    			var hths=new Array();
    			Ext.Msg.confirm('提示', '是否确认同步所选记录确认交期？', function(btn) {
					if (btn == 'yes') {
						var czym=erp.Util.currentUser.userInfo.name;
						Ext.each(recs,function(r){
							hths.push("'"+r.get('htbh')+'-'+r.get('htxh')+"'");
							r.set('qrjq',r.get('wkjq'));
							r.set('zxqrrm',czym);
							r.commit();
						});
						var sql  =" update htmxb set qrjq=wkjq ,zxqrsj=getdate(),zxqrrm='"+czym+"'  ";
						sql+=" where ltrim(rtrim(htmxb.htbh))+'-'+ltrim(rtrim(htmxb.htxh)) in ("+hths.join(',')+") ";
						myMask.mask('数据更新中...');
						var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						{sql : sql});
						myMask.unmask();
					}
				})
    			break;
    		case 'btn_oop4':
    			if(recs.length==0){
					Ext.toastInfo('请选择一条或多条合同明细!');
					break;
				}
    			var hths=new Array();
				Ext.each(recs,function(r){
					hths.push("'"+r.get('htbh')+'-'+r.get('htxh')+"'");
				});
    			var win =Ext.create('erp.view.purchaseUrge.window.SteelFrame',{
    				hths:hths.join(',')
    			})
    			win.show();
    		break;
    		case 'btn_oop3':
    			if(btn.text=='合并追催'){
    				me.s_hbzc=1;
    				win.btnHideForHb(true);
    				win.setConfig({
    					title: '采购合并追催管理【采购类别：'+win.cglbmc+'】'
    				});
    				win.store=Ext.create('erp.view.purchaseUrge.store.PurchaseUrgeCollectBuffered');
    				win.store.on({
			    	 	 load:function(s,recs){
			    	 	 	var grid=win.down('#PurchaseUrgeGrid');
								if(recs.length>0){
									erp.Util.gridSelect(grid,recs);
								}else{
									grid.getStore().removeAll();
								}
								var params={};
								var store =win.store;
								Ext.apply(params,store.getProxy().extraParams);
								var proxy=store.getProxy(),
								filterParam=proxy.filterParam,
								sortParam=proxy.sortParam;
								if(store.remoteFilter){
							        filters = store.getFilters().items;
							        if (filterParam && filters && filters.length > 0) {
							            params[filterParam] = proxy.encodeFilters(filters);
							        }
								 }
								 if(store.remoteSort){
								 	sorters = store.getSorters().items;
								 	if (sorters&&sorters.length > 0) {
							            params[sortParam] = proxy.encodeSorters(sorters);
							        }
								 }
								win.DetailSum=Ext.create('erp.view.purchaseUrge.model.PurchaseUrgeCollect');
								var recs = erp.Const.callServiceMethodSync(
									'purchaseurge/purchaseurge.act?method=getPurchaseUrgeCollectCount', params);
								if(recs!=null&&recs.length>0&&recs[0]!=null){
									Ext.apply(win.DetailSum.data,recs[0]);
								}
				    	 	 },
							totalcountchange:function onStoreSizeChange() {
								var grid=win.down('#PurchaseUrgeGrid');
						        grid.down('#status').update({count: win.store.getTotalCount()});
						    }
			    	});
    				me.MainColumns=erp.Util.getColumns(win.store.getModel());
    				grid.reconfigure(win.store,me.MainColumns);
    				//grid.dockedItems.items[1].setConfig({store:win.store});
    				btn.setConfig({text:'追催回退'});
    				win.store.loadPage(1);
    			}else{
    				me.s_hbzc=0;
    				btn.setConfig({text:'合并追催'});
    				win.setConfig({
    					title: '采购追催管理【采购类别：'+win.cglbmc+'】'
    				});
    				win.btnHideForHb(false);
    				win.store=Ext.create('erp.view.purchaseUrge.store.PurchaseUrge');
    				win.store.on({
			    	 	 load:function(s,recs){
			    	 	 	var grid=win.down('#PurchaseUrgeGrid');
							if(recs.length>0){
								erp.Util.gridSelect(grid,recs);
							}else{
								grid.getStore().removeAll();
							}
							var params={};
							var store =win.store;
							Ext.apply(params,store.getProxy().extraParams);
							var proxy=store.getProxy(),
							filterParam=proxy.filterParam,
							sortParam=proxy.sortParam;
							if(store.remoteFilter){
						        filters = store.getFilters().items;
						        if (filterParam && filters && filters.length > 0) {
						            params[filterParam] = proxy.encodeFilters(filters);
						        }
							 }
							 if(store.remoteSort){
							 	sorters = store.getSorters().items;
							 	if (sorters&&sorters.length > 0) {
						            params[sortParam] = proxy.encodeSorters(sorters);
						        }
							 }
							win.DetailSum=Ext.create('erp.view.master.purchaseDetail.model.PurchaseDetail');
							var recs = erp.Const.callServiceMethodSync(
								'purchaseurge/purchaseurge.act?method=getPurchaseUrgeCount', params);
							if(recs!=null&&recs.length>0&&recs[0]!=null){
								Ext.apply(win.DetailSum.data,recs[0]);
							}
			    	 	 },
						totalcountchange:function onStoreSizeChange() {
							var grid=win.down('#PurchaseUrgeGrid');
					        grid.down('#status').update({count: win.store.getTotalCount()});
					    }
			    	});
    				grid.reconfigure(win.store,win.MainColumns);
    				//grid.dockedItems.items[1].setConfig({store:win.store});
    				win.store.loadPage(1);
    			}
    		break;
    		case 'btn_oop2':
    			if(me.s_lgzc==1){
    				if(recs.length==0){
						Ext.toastInfo('请选择一条或多条合同明细!');
						break;
					}
					myMask.mask('支数计算中...');
					var result = erp.Const.callServiceMethodSync('purchaseurge/purchaseurge.act?method=getNumberCal',{
						recs:erp.Util.ModelsToJson(recs)
					});
					var data = Ext.decode(result);
					Ext.each(recs,function(r){
						Ext.each(data.recs,function(r1){
							if(r.get('htbh')==r1.htbh&&r.get('htxh')==r1.htxh){
								r.set('zhsl',r1.zhsl);
								r.set('rkzs',r1.rkzs);
								r.set('wdzs',r1.wdzs);
							}
						})
					})
					myMask.unmask();
					if (!data.bool) {
						Ext.toastErrorInfo(data.msg);
						return ;
					}
    			}
    		break;
    		case 'btn_oop1':
    			var nCols=new Array();
    			if(btn.text=='铝管追催'){
    				me.s_lgzc=1;
    				meun.down('#btn_oop2').show();
    				var islczc="and (clbmb.fzzbj=2 or clbmb.fzzbj=5 or clbmb.fzzbj=6) ";
    				store.proxy.extraParams.islczc=islczc;
    				btn.setConfig({text:'采购追催'});
    				Ext.each(cols,function(c){
    					var nc =Ext.create('Ext.grid.column.Column',{
    						header:c.text,
    						dataIndex:c.dataIndex,
    						filter:c.filter,
    						renderer:c.renderer,
    						width:c.width,
    						align:c.align
    					});
    					nc.hidden=false;
    					switch(c.dataIndex){
    						case 'jqsdbj':
    							nc.sort=1;
    							nCols.push(nc);
    						break;
							case 'kjlx':
								nc.sort=2;
    							nCols.push(nc);
    						break;
							case 'zzhxs':
								nc.sort=3;
    							nCols.push(nc);
    						break;
							case 'cgje':
								nc.sort=4;
    							nCols.push(nc);
    						break;
							case 'rksl':
								nc.sort=5;
    							nCols.push(nc);
    						break;
							case 'cgwwje':
								nc.sort=6;
    							nCols.push(nc);
    						break;
							case 'yqjh':
								nc.sort=7;
    							nCols.push(nc);
    						break;
							case 'wkjq':
								nc.sort=8;
    							nCols.push(nc);
    						break;
							case 'zxwksj':
								nc.sort=9;
    							nCols.push(nc);
    						break;
							case 'zxwkrm':
								nc.sort=10;
    							nCols.push(nc);
    						break;
							case 'zxqrsj':
								nc.sort=11;
    							nCols.push(nc);
    						break;
							case 'zxqrrm':
								nc.sort=12;
    							nCols.push(nc);
    						break;
							case 'qfsj':
								nc.sort=13;
    							nCols.push(nc);
    						break;
							case 'gxsj':
								nc.sort=14;
    							nCols.push(nc);
    						break;
							case 'rkrq':
								nc.sort=15;
    							nCols.push(nc);
    						break;
							case 'hsbmmc':
								nc.sort=16;
    							nCols.push(nc);
    						break;
							case 'mjh':
								nc.sort=17;
    							nCols.push(nc);
    						break;
							case 'zzlx':
								nc.sort=18;
    							nCols.push(nc);
    						break;
							case 'zzyx':
								nc.sort=19;
    							nCols.push(nc);
    						break;
							case 'zzbj':
								nc.sort=20;
    							nCols.push(nc);
    						break;
							case 'qdbj':
								nc.sort=21;
    							nCols.push(nc);
    						break;
							case 'jhlbmc':
								nc.sort=22;
    							nCols.push(nc);
    						break;
    						case 'htbh':
								nc.sort=23;
    							nCols.push(nc);
    						break;
    						case 'clmc':
								nc.sort=24;
    							nCols.push(nc);
    						break;
    						case 'dlgg':
								nc.sort=25;
    							nCols.push(nc);
    						break;
    						case 'cltx1':
								nc.sort=26;
    							nCols.push(nc);
    						break;
    						case 'cgsl':
								nc.sort=27;
    							nCols.push(nc);
    						break;
    						case 'zhsl':
								nc.sort=28;
    							nCols.push(nc);
    						break;
    						case 'rkzs':
								nc.sort=29;
    							nCols.push(nc);
    						break;
    						case 'wdzs':
								nc.sort=30;
    							nCols.push(nc);
    						break;
    						case 'cgww':
								nc.sort=31;
    							nCols.push(nc);
    						break;
    						case 'dhrk':
								nc.sort=32;
    							nCols.push(nc);
    						break;
    						case 'csmc':
								nc.sort=33;
    							nCols.push(nc);
    						break;
    						case 'yqjh':
								nc.sort=34;
    							nCols.push(nc);
    						break;
    						case 'bzsm':
								nc.sort=35;
    							nCols.push(nc);
    						break;
    						case 'jhbz':
								nc.sort=36;
    							nCols.push(nc);
    						break;
    						case 'cpmc':
								nc.sort=37;
    							nCols.push(nc);
    						break;
    						case 'khjc':
								nc.sort=38;
    							nCols.push(nc);
    						break;
    						case 'qrjq':
								nc.sort=39;
    							nCols.push(nc);
    						break;
    						case 'sxrq':
								nc.sort=40;
    							nCols.push(nc);
    						break;
    						case 'lyxz':
								nc.sort=41;
    							nCols.push(nc);
    						break;
    						case 'cgyxm':
								nc.sort=42;
    							nCols.push(nc);
    						break;
    						case 'czsj':
								nc.sort=43;
    							nCols.push(nc);
    						break;
    						case 'dysj':
								nc.sort=44;
    							nCols.push(nc);
    						break;
    						case 'cgdj':
								nc.sort=45;
    							nCols.push(nc);
    						break;
    						case 'htxh':
								nc.sort=46;
    							nCols.push(nc);
    						break;
    						case 'clhh':
								nc.sort=47;
    							nCols.push(nc);
    						break;
    						case 'jldw':
								nc.sort=48;
    							nCols.push(nc);
    						break;
    						case 'fzdw':
								nc.sort=49;
    							nCols.push(nc);
    						break;
    						case 'fzsl':
								nc.sort=50;
    							nCols.push(nc);
    						break;
    						case 'djsl':
								nc.sort=51;
    							nCols.push(nc);
    						break;
    						case 'dtsl':
								nc.sort=52;
    							nCols.push(nc);
    						break;
    						case 'hqjq':
								nc.sort=53;
    							nCols.push(nc);
    						break;
    						case 'cjjhrq':
								nc.sort=54;
    							nCols.push(nc);
    						break;
    						case 'jhrq':
								nc.sort=55;
    							nCols.push(nc);
    						break;
    						case 'cgrq':
								nc.sort=56;
    							nCols.push(nc);
    						break;
    						case 'jhh':
								nc.sort=57;
    							nCols.push(nc);
    						break;
    						case 'cgh':
								nc.sort=58;
    							nCols.push(nc);
    						break;
    						case 'sdckmc':
								nc.sort=59;
    							nCols.push(nc);
    						break;
    						case 'czym':
								nc.sort=60;
    							nCols.push(nc);
    						break;
    						case 'qdrm':
								nc.sort=61;
    							nCols.push(nc);
    						break;
    						case 'qdsj':
								nc.sort=62;
    							nCols.push(nc);
    						break;
    						case 'qfbj':
								nc.sort=63;
    							nCols.push(nc);
    						break;
    						case 'sdbj':
								nc.sort=64;
    							nCols.push(nc);
    						break;
    					}
    				})
    			}else{
    				me.s_lgzc=0;
    				meun.down('#btn_oop2').hide();
    				delete store.proxy.extraParams.islczc;
    				btn.setText('铝管追催');
    				Ext.each(cols,function(c){
    					var nc =Ext.create('Ext.grid.column.Column',{
    						header:c.text,
    						dataIndex:c.dataIndex,
    						filter:c.filter,
    						renderer:c.renderer,
    						width:c.width,
    						align:c.align
    					});
    					nc.hidden=false;
    					switch(c.dataIndex){
    						case 'jqsdbj':
    							nc.sort=1;
    							nCols.push(nc);
    						break;
							case 'kjlx':
								nc.sort=2;
    							nCols.push(nc);
    						break;
							case 'zzhxs':
								nc.sort=3;
    							nCols.push(nc);
    						break;
							case 'cgje':
								nc.sort=4;
    							nCols.push(nc);
    						break;
							case 'rksl':
								nc.sort=5;
    							nCols.push(nc);
    						break;
							case 'cgwwje':
								nc.sort=6;
    							nCols.push(nc);
    						break;
							case 'yqjh':
								nc.sort=7;
    							nCols.push(nc);
    						break;
							case 'wkjq':
								nc.sort=8;
    							nCols.push(nc);
    						break;
							case 'zxwksj':
								nc.sort=9;
    							nCols.push(nc);
    						break;
							case 'zxwkrm':
								nc.sort=10;
    							nCols.push(nc);
    						break;
							case 'zxqrsj':
								nc.sort=11;
    							nCols.push(nc);
    						break;
							case 'zxqrrm':
								nc.sort=12;
    							nCols.push(nc);
    						break;
							case 'qfsj':
								nc.sort=13;
    							nCols.push(nc);
    						break;
							case 'gxsj':
								nc.sort=14;
    							nCols.push(nc);
    						break;
							case 'rkrq':
								nc.sort=15;
    							nCols.push(nc);
    						break;
							case 'hsbmmc':
								nc.sort=16;
    							nCols.push(nc);
    						break;
							case 'mjh':
								nc.sort=17;
    							nCols.push(nc);
    						break;
							case 'zzlx':
								nc.sort=18;
    							nCols.push(nc);
    						break;
							case 'zzyx':
								nc.sort=19;
    							nCols.push(nc);
    						break;
							case 'zzbj':
								nc.sort=20;
    							nCols.push(nc);
    						break;
							case 'qdbj':
								nc.sort=21;
    							nCols.push(nc);
    						break;
							case 'jhlbmc':
								nc.sort=22;
    							nCols.push(nc);
    						break;
    						case 'jhbz':
								nc.sort=23;
    							nCols.push(nc);
    						break;
    						case 'sxrq':
								nc.sort=24;
    							nCols.push(nc);
    						break;
    						case 'lyxz':
								nc.sort=25;
    							nCols.push(nc);
    						break;
    						case 'qrjq':
								nc.sort=26;
    							nCols.push(nc);
    						break;
    						case 'cgyxm':
								nc.sort=27;
    							nCols.push(nc);
    						break;
    						case 'htbh':
								nc.sort=28;
    							nCols.push(nc);
    						break;
    						case 'htxh':
								nc.sort=29;
    							nCols.push(nc);
    						break;
    						case 'csmc':
								nc.sort=30;
    							nCols.push(nc);
    						break;
    						case 'clhh':
								nc.sort=31;
    							nCols.push(nc);
    						break;
    						case 'clmc':
								nc.sort=32;
    							nCols.push(nc);
    						break;
    						case 'cltx1':
								nc.sort=33;
    							nCols.push(nc);
    						break;
    						case 'dlgg':
								nc.sort=34;
    							nCols.push(nc);
    						break;
    						case 'bzsm':
								nc.sort=35;
    							nCols.push(nc);
    						break;
    						case 'jldw':
								nc.sort=36;
    							nCols.push(nc);
    						break;
    						case 'cgsl':
								nc.sort=37;
    							nCols.push(nc);
    						break;
    						case 'dhrk':
								nc.sort=38;
    							nCols.push(nc);
    						break;
    						case 'cgww':
								nc.sort=39;
    							nCols.push(nc);
    						break;
    						case 'khjc':
								nc.sort=40;
    							nCols.push(nc);
    						break;
    						case 'cpmc':
								nc.sort=41;
    							nCols.push(nc);
    						break;
    						case 'qfbj':
								nc.sort=42;
    							nCols.push(nc);
    						break;
    						case 'sdbj':
								nc.sort=43;
    							nCols.push(nc);
    						break;
    						case 'djsl':
								nc.sort=44;
    							nCols.push(nc);
    						break;
    						case 'dtsl':
								nc.sort=45;
    							nCols.push(nc);
    						break;
    						case 'hqjq':
								nc.sort=46;
    							nCols.push(nc);
    						break;
    						case 'cjjhrq':
								nc.sort=47;
    							nCols.push(nc);
    						break;
    						case 'jhrq':
								nc.sort=48;
    							nCols.push(nc);
    						break;
    						case 'cgrq':
								nc.sort=49;
    							nCols.push(nc);
    						break;
    						case 'jhh':
								nc.sort=50;
    							nCols.push(nc);
    						break;
    						case 'cgh':
								nc.sort=51;
    							nCols.push(nc);
    						break;
    						case 'sdckmc':
								nc.sort=52;
    							nCols.push(nc);
    						break;
    						case 'zczy':
								nc.sort=53;
    							nCols.push(nc);
    						break;
    						case 'dysj':
								nc.sort=54;
    							nCols.push(nc);
    						break;
    						case 'czym':
								nc.sort=55;
    							nCols.push(nc);
    						break;
    						case 'czsj':
								nc.sort=56;
    							nCols.push(nc);
    						break;
    						case 'qdrm':
								nc.sort=57;
    							nCols.push(nc);
    						break;
    						case 'qdsj':
								nc.sort=58;
    							nCols.push(nc);
    						break;
    					}
    				})
    			}
    			nCols.sort(function(a,b){
    				if(a.sort>b.sort){
    					return 1;
    				}else if(a.sort<b.sort){
    					return -1;
    				}else{
    					return 0;
    				}
    			})
    			grid.reconfigure(nCols);
    			store.loadPage(1);
    		break;
    	}
    },
    confirmTimeButton:function(btn){
    	var me=this;
    	var win=me.getView();
    	var grid=win.down('#mainGrid');
    	var store=grid.getStore();
    	switch(btn.itemId){
    		case 'btn_yes':
    			store.sync({callback:function(){
    				win.mstore.load();
    			}});
    			win.close();
    		break;
    		case 'btn_sync':
    			store.each(function(r){
    				var date=new Date(2000,0,1,1,1,1);
    				if(r.get('wkjq')>date){
    					r.set('qrjq',r.get('wkjq'));
    				}
    			})
    		break;
    	}
    },
    menuOpButton:function(menu,btn){
    	var me=this;
    	var mainPanel=me.getView();
    	var grid=mainPanel.down('#PurchaseUrgeGrid');
    	var recs=grid.getSelectionModel().getSelection();
    	var czym=erp.Util.currentUser.userInfo.name;
    	czym=Ext.String.trim(czym);
    	var myMask = new Ext.LoadMask({
			target : mainPanel
		});
		var store=grid.getStore();
		if(btn==null){
			return ;
		}
    	switch (btn.itemId){
    		case 'btn_op6':
    			if(store.proxy.extraParams.rkrqsync){
    				delete store.proxy.extraParams.rkrqsync;
    			}else{
    				store.proxy.extraParams.rkrqsync=true;
    			}
    			store.load();
    		break;
    		case 'btn_op5':
    			if(recs.length==0){
					Ext.toastInfo('请选择一条或多条合同明细!');
					break;
				}
    			var win=Ext.create('erp.view.purchaseUrge.window.ContractSplit');
    			var rec=recs[0];
    			win.down('#BTN_YES').on({
					click:function(btn){
						var win=btn.up('window');
						var cfsl=win.down('#cfsl').getValue();
						var ld_cgww=rec.get('cgww');
						if(cfsl<=0){
							Ext.toastInfo('拆分数量小于或等于0,拆分失败！');
							return; 
						}
						if(cfsl>rec.get('cgww')){
							Ext.toastInfo('拆分数量大于采购未完数量,拆分失败！');
							return; 
						}
						if(cfsl>ld_cgww){
							Ext.toastInfo('拆分数量不允许大于采购未完数量！');
							return;
						}
						Ext.Msg.confirm('提示', '是否确认拆分所选合同？', function(btn) {
							if (btn == 'yes') {
								win.close();
								myMask.mask('合同拆分中...');
								var result = erp.Const.callServiceMethodSync('purchaseurge/purchaseurge.act?method=getContractSplit',{
										cfsl:cfsl,rec:Ext.encode(rec.data)
								});
								myMask.unmask();
								var data = Ext.decode(result);
								if (!data.bool) {
									Ext.toastErrorInfo(data.msg);
									return ;
								}
								rec.set('cgsl',rec.get('cgsl')-cfsl);
								if(rec.get('cgww')>0){
									rec.set('cgww',rec.get('cgww')-cfsl);
								}
								rec.commit();
//								Ext.toastInfo('拆分成功想立即看到拆分结果，请刷新界面！');
								store.load();
							}
						})
						
					}
    			});
    			win.show();
    		break;
    		case 'btn_op4':
    			if(recs.length==0){
					Ext.toastInfo('请选择一条或多条合同明细!');
					break;
				}
				var win=Ext.create('erp.view.purchaseUrge.window.ReplyPMC');
				win.down('#btn_confirm').on({
					click:function(btn){
						var win=btn.up('window');
						var hfjl=win.down('#hfjl').getValue();
						var hfyj=win.down('#hfyj').getValue();
						var hths=new Array();
						Ext.each(recs,function(r){
							hths.push("'"+r.get('htbh')+'-'+r.get('htxh')+"'");
						});
						Ext.Msg.confirm('提示', '是否确认回复所选记录？', function(btn) {
							if (btn == 'yes') {
								var sql  =" update qtqljlmxb set hfjl='"+hfjl+"',hfyj='"+hfyj+"',hfrm='"+czym+"',hfsj=getdate() from qtqljlmxb ";
								sql+=" where ltrim(rtrim(qtqljlmxb.htbh))+'-'+ltrim(rtrim(qtqljlmxb.htxh)) in ("+hths.join(',')+") ";
								var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
								{sql : sql});
								win.close();
							}
						})
					}
				})
				win.show();
    		break;
    		case 'btn_op3':
    			var win=Ext.create('erp.view.purchaseUrge.window.UpFile');
	   	  	  	win.down('#btn_save').on({
					click : function(btn) {
						var win = btn.up('window');
						var form = win.down('form');
						form.submit({
									url : 'purchaseurge/updateConfirmTimeFromExcel.act',
									method : 'POST',
									timeout : 10,
									params : {
										newFileName : 'ConfirmTimeImp',
										loginId : erp.Util.currentUser.userInfo.login_id,
										czym:czym
									},
									waitMsg : '正在上传解析文件...',
									success : function(form, action) {
										Ext.Msg.alert('提示', action.result.msg);
										store.load();
										win.close();
									},
									failure : function() {
										Ext.Msg.alert("提示", "文件保存失败");
									}
								});
					}
				})
				win.show();
    		break;
    		case 'btn_op2':
    			if(recs.length==0){
					Ext.toastInfo('请选择采购员记录后再使用此功能！');
					break;
				}
				var rec =recs[0];
				var win =Ext.create('erp.view.purchaseUrge.window.Parameter',{
				});
				var hths=new Array();
				Ext.each(recs,function(r){
					hths.push("'"+r.get('htbh')+'-'+r.get('htxh')+"'");
				})
				win.down('#cgym').setValue(rec.get('cgym'));
				win.down('#BTN_YES').on({
					click:function(btn){
						var win =btn.up('window');
						var r=win.down('form').getValues();
						if(Ext.isEmpty(r.cgym)){
							Ext.toastInfo('请输入采购员信息！');
							return ;
						}
						var cgy=win.down('#cgym').store.findRecord('cgybh',rec.get('cgym'));
						var rollwin=Ext.create('erp.view.purchaseUrge.window.RollOutput',{
							rec:r,
							hths:hths.join(','),
							title:'滚动输出 【采购员:'+cgy.get('cgyxm')+'】'
						});
						rollwin.show();
						win.close();
					}
				})
				win.show();
    		break;
    		case 'btn_op1':
    			var bool = false;
    			if(recs.length==0){
					Ext.toastErrorInfo('请选择一条或多条合同明细!');
					break;
				}
				var hths=new Array();
				Ext.each(recs,function(r){
					if(r.get('jqsdbj')==1){
						bool=true;
						Ext.toastInfo("合同号为【"+r.get('htbh')+'-'+r.get('htxh')+"】的记录交期已锁定，不能修改交期!");
						return false;
					}
					hths.push("'"+r.get('htbh')+'-'+r.get('htxh')+"'");
				})
				if(bool){
					break;
				}
				var win=Ext.create('erp.view.purchaseUrge.window.ConfirmTime',{
					hths:'('+hths+')',
					mstore:store
				})
				win.show();
    		break;
    	}
    },
    mainButton:function(btn){
    	var me=this;
    	var mainPanel=me.getView();
    	var grid=mainPanel.down('#PurchaseUrgeGrid');
    	var recs=grid.getSelectionModel().getSelection();
    	var czym=erp.Util.currentUser.userInfo.name;
    	czym=Ext.String.trim(czym);
    	var myMask = new Ext.LoadMask({
			target : mainPanel
		});
		var store=grid.getStore();
    	switch (btn.itemId){
    		case 'BatchEdit':
    			if(recs.length==0){
					Ext.toastErrorInfo('请选择一条或多条合同明细!');
					break;
				}
				var win=Ext.create('erp.view.master.purchaseDetail.window.BatchChange',{
							width:300,
		    				height:120,
		    				title:'批量编辑',
		    				lay:'column',
		    				item:[
		                	{
			                    name      : 'qrjq_c',
			                    xtype 	  :'checkbox',
			                    inputValue: '1',
			                    itemId     : 'qrjq_c',
			                    columnWidth: 0.2
		                	},{
			                    xtype:'combo',
			                    itemId: 'qrjq',
			                    xtype:'datefield',
			   	  	  			format:'Y.m.d',
			                    fieldLabel:'确认交期',
			                    name:'qrjq',
			                    columnWidth: 0.8,
			                    listeners:{
									change :function(o,  newValue,  oldValue,  eOpts){
											this.previousSibling().setValue(true);
				                   	}
								}
		                	}]
						});
						win.down('#BTN_YES').on({
							click:function(btn){
								var win=btn.up('window');
								var qrjq_c=win.down('#qrjq_c').getValue();
								if(qrjq_c){
									var hths=new Array();
									var qrjq=win.down('#qrjq').getValue();
									Ext.each(recs,function(r){
										r.set('qrjq',qrjq);
										r.set('zxqrrm',czym);
										r.set('zxqrsj',new Date());
										r.commit();
										hths.push("'"+r.get('htbh')+'-'+r.get('htxh')+"'");
									});
									var qrjq=Ext.Date.format(qrjq,'Y-m-d H:i:s');
									if(qrjq==''){
										qrjq=null;
									}
									var sql  =" update htmxb set qrjq="+qrjq+",zxqrsj=getdate(),zxqrrm='"+czym+"'  ";
									sql+=" where ltrim(rtrim(htmxb.htbh))+'-'+ltrim(rtrim(htmxb.htxh)) in ("+hths.join(',')+") ";
									myMask.mask('数据更新中...');
									var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
									{sql : sql});
									myMask.unmask();
								}
								win.close();
							}
						})
						win.show();
    		break;
    		case 'btn_query':
    		if(me.s_hbzc==0){
    			var win=Ext.create('erp.view.purchaseUrge.window.MainSearch',{
    				search:me.searchModel,
    				store:store
    			});
    			win.show();
    		}else{
    			var win=Ext.create('erp.view.purchaseUrge.window.MainSearchForCount',{
    				search:me.searchModel,
    				store:store
    			});
    			win.show();
    		}
    		break;
    		case 'btn_change':
    			if(recs.length==0){
					Ext.toastErrorInfo('请选择一条或多条合同明细!');
					break;
				}
    			var win =Ext.create('erp.view.purchaseOrder.window.ArrivalThree',{
	    			rec:recs[0]
	    		});
	    		win.show();
    		break;
    		case 'BTN_HISTORY':
    			if (btn.getText()=="历史"){	
					var win=Ext.create('erp.view.purchaseUrge.window.HistorySearch');
	    			win.down('#BTN_YES').on({
	    				click:function(btn1){
	    					var win=btn1.up('window');
	    					var rec=win.down('form').getValues();
	    					var qsrq=rec.qsrq,
	    					jzrq=rec.jzrq,
	    					clmc=rec.clmc,
	    					csbh=rec.csbh,
	    					hth=rec.hth,
	    					cgym=rec.cgym
	    					;
	    					if(Ext.Date.parse(qsrq,'Y.m.d')>Ext.Date.parse(jzrq,'Y.m.d')){
	    						Ext.toastInfo('起始日期不能大于截止日期!');
								return ;
	    					}
	    					var params=" and ( cghtb.czsj >= '"+qsrq+"' and cghtb.czsj <= '"+jzrq+"' ) ";
	    					if(!Ext.isEmpty(clmc)){
	    						params += " and ( htmxb.clhh='"+clmc+"' or clbmb.clmc like '%"+clmc+"%') ";
	    					}
	    					if(!Ext.isEmpty(csbh)){
	    						params += " and cghtb.csbh='"+csbh+"' ";
	    					}
	    					if(!Ext.isEmpty(hth)){
	    						params += " and str(cghtb.htbh) like '%"+hth+"%' ";
	    					}
	    					
	    					store.proxy.extraParams.historyParams=params;
	    					
	    					if (btn.getText()=="历史"){	
								btn.setText('当前');
								Ext.apply(store.proxy.extraParams,{gdbj:1});
							}
							else{
								btn.setText('历史');
								Ext.apply(store.proxy.extraParams,{gdbj:0});
							}
							win.close();
							store.load();
	    				}
	    			})
	    			win.show();
					Ext.apply(store.proxy.extraParams,{gdbj:1});
				}
				else{
					btn.setText('历史');
					delete store.proxy.extraParams.historyParams;
					Ext.apply(store.proxy.extraParams,{gdbj:0});
					store.load();
				}
			break;
    		case 'btn_AOG':
    			var bool = false;
				if(recs.length==0){
					Ext.toastErrorInfo('请选择一条或多条合同明细!');
					break;
				}
				var rec=recs[0];
				var qdbj=rec.get('qdbj');
				var hths=new Array();
				var htbhs=new Array();
				Ext.each(recs,function(r){
					if(r.get('qdbj')!=qdbj){
						bool=true;
						Ext.toastInfo("请选择确定标记相同记录!");
						return false;
					}
					hths.push("'"+r.get('htbh')+'-'+r.get('htxh')+"'");
					htbhs.push("'"+r.get('htbh')+"'");
				})
				if(bool){
					break;
				}
				var bb='';
				if(qdbj==1){
					bb='取消';
				}
				Ext.Msg.confirm('提示', '是否确认'+bb+'确定所选采购的采购明细到货完成？', function(btn) {
						if (btn == 'yes') {
								myMask.mask('数据更新中...');
								var result = erp.Const.callServiceMethodSync('purchaseurge/purchaseurge.act?method=getAOGState',
								{
										qdbj:qdbj==1?0:1,czym:czym,wcbj:qdbj==1?0:1,hths:'('+hths.join(',')+')',htbhs:'('+htbhs.join(',')+')'
								});
								myMask.unmask();
								var data = Ext.decode(result);
								if (!data.bool) {
									Ext.toastErrorInfo(data.msg);
									return ;
								}
								Ext.each(recs,function(drec){
									drec.set('qdbj',qdbj==1?0:1);
									drec.set('wcbj',qdbj==1?0:1);
									drec.set('qdsj',new Date());
									drec.set('qdrm',czym);
									drec.commit();
								});
								//store.load();
						}
				})
    		break;
    		case 'btn_ColorDescription':
    			var ls_message='1、蓝色（合同号）：已签发未完成并且物控交期>签发时间+供货周期  <br\>';
				ls_message+="2、绿色（材料名称）：该合同材料做过BOM更改单"+"<br\>";
				ls_message+="3、红色（合同编号）：当前时间大于交货日期和确认交期或者合同的交货日期<>采购计划的交货日期显示红色"+"<br\>";
				ls_message+="4、红色（物控交期）：确认交期大于物控交期则物控交期颜色显示红色"+"<br\>";
				ls_message+="5、绿色（物控交期）：物控交期变动未回复"+"<br\>";
				ls_message+="整行红色：当前时间大于交货日期和确认交期"+"<br\>";
    			Ext.Msg.alert('提示',ls_message);
    		break;
    		case 'btn_cannel':
    		case 'btn_suspend':
    			var bool = false;
				if(recs.length==0){
					Ext.toastErrorInfo('请选择一条或多条合同明细!');
					break;
				}
				var rec=recs[0];
				var zzbj=rec.get('zzbj');
				Ext.each(recs,function(r){
					if(r.get('zzbj')!=zzbj){
						bool=true;
						Ext.toastInfo("请选择中止标记相同记录!");
						return false;
					}
					if(r.get('zzbj')==0){
						if(Ext.String.trim(r.get('cgyxm'))!=czym&&!erp.Util.currentUser.isAdmin){
							bool=true;
							Ext.toastInfo("非本合同采购员不能中止该合同!");
							return false;
						}
					}
				})
				if(bool){
					break;
				}
				var bb='';
				if(zzbj==1){
					bb='取消';
				}
				var s_zzbj=zzbj;
				Ext.Msg.confirm('提示', '是否确认'+bb+'中止所选采购的合同明细？', function(btn) {
						if (btn == 'yes') {
							if(s_zzbj==0){
								var win=Ext.create('erp.view.purchaseOrder.window.Suspend');
								win.down('#btn_confirm').on({
									click:function(btn){
										var win=btn.up('window');
										var s_zzlx=win.down('#zzlx').getValue();
										var s_zzyy=win.down('#zzyy').getValue();
										if(s_zzyy==null){
											s_zzyy='';
										}
										if(s_zzlx==null){
											s_zzlx='';
										}
										if(s_zzlx==''){
											Ext.toastInfo("中止类型不允许为空!");
											return;
										}
										myMask.mask('合同中止...');
										var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorder.act?method=getSuspend',
												{
													recstr : erp.Util.ModelsToJson(recs),zzlx:s_zzlx,zzyy:s_zzyy,u_name:czym
												});
										myMask.unmask();
										var data = Ext.decode(result);
										if (!data.bool) {
											Ext.toastErrorInfo(data.msg);
											return ;
										}
										if(data.ifupdate=="0"){//根据平台订单决定是否更新中止标记
										Ext.each(recs,function(drec){
											drec.set('zzbj',1);
											drec.set('zzlx',s_zzlx);
											drec.commit();
										});
										}
										win.close();
										//store.load();
									}
								})
								win.show();
							}else{
								myMask.mask('合同中止...');
								var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorder.act?method=getSuspend',
								{
										recstr : erp.Util.ModelsToJson(recs),zzlx:'',zzyy:'',u_name:czym
								});
								myMask.unmask();
								var data = Ext.decode(result);
								if (!data.bool) {
									Ext.toastErrorInfo(data.msg);
									return ;
								}
								Ext.each(recs,function(drec){
									drec.set('zzbj',0);
									drec.set('zzlx','');
									drec.commit();
								});
								//store.load();
							}
						}
				})
    		break;
    	}
    },
    round:function(v,l){
		return Ext.util.Format.round(v,l);
	}
});