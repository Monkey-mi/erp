Ext.define('erp.view.plasticPartsPledge.PlasticPartsPledgeCtl', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Ext.window.MessageBox',
        'erp.ux.ComboxTree',
        'erp.view.plasticPartsPledge.window.*'
    ],
	control:{
		'PlasticPartsPledge #TBar button':{
			click:'btnClick'
		},
		'EdtPlasticPartsPledge #edtBar button':{
			click:'edtBtnClick'
		}
	},
    alias: 'controller.PlasticPartsPledgeCtl',
    edtBtnClick:function(btn){
    	var me=this;
    	var mainPanel=this.getView();
    	var store=mainPanel.store;
    	var dStore=mainPanel.dStore;
    	var form=mainPanel.down('#form');
    	var rec=form.getRecord();
    	form.updateRecord(rec);
    	var czym=erp.Util.currentUser.userInfo.name;
    	var myMask = new Ext.LoadMask({
			target : mainPanel
		});
    	switch(btn.itemId){
    		case 'Imp':
    			if(rec.get('zylx')==0){
    				Ext.toastInfo("所选质押类型不为发票类型,不允许导入!");
    				break;
    			}
    			if(Ext.isEmpty(rec.get('csbh'))){
    				Ext.toastInfo("请选择供应商!");
    				break;
    			}
    			var fplbhms=new Array();
    			dStore.each(function(r){
    				fplbhms.push("'"+r.get('fplbhm')+"'")
    			})
    			var win=Ext.create('erp.view.plasticPartsPledge.window.PlasticPartsPledgeInvoiceImp',{
    				csbh:rec.get('csbh'),
    				fplbhms:fplbhms 
    			});
    			win.down('#btn_confirm').on({
    				click:function(btn){
    					var win=btn.up('window');
    					var selStore=win.selStore;
    					var s_zyje=rec.get('zyje');
    					if(selStore.getCount()>0){
    						selStore.each(function(r){
    							var nmodel=Ext.create('erp.view.plasticPartsPledge.model.PlasticPartsPledgeInvoice',{
    								kprq:r.get('kprq'),
    								shsj:r.get('shsj'),
    								fplb:r.get('fplb'),
    								fphm:r.get('fphm'),
    								fpje:r.get('fpje'),
    								zyje:r.get('wqje'),
    								wqje:r.get('wqje')
    							})
    							s_zyje+=r.get('wqje');
    							dStore.add(nmodel);
    						})
    						var zylxField=form.down('#zylx');
    						form.down('#zyje').setValue(s_zyje);
							zylxField.setReadOnly(true);
							zylxField.setFieldStyle('background:#E6E6E6');
							win.close();
    					}else{
    						Ext.toastInfo("请选择一行或多行再进行操作!");
    						return ;
    					}
    				}
    			})
    			win.on({
    				close:function(){
    					store.load();
    				}
    			});
    			win.show();
    		break;
    		case 'Del':
    			dGrid=mainPanel.down('#southGrid');
    			recs=dGrid.getSelectionModel().getSelection();
    			if(recs.length==0){
    				Ext.toastInfo("请选择需要删除的明细记录！");
    				break ;
    			}
    			Ext.Msg.confirm('提示', '是否确认删除？', function(btn) {
					if (btn == 'yes') {
						dStore.remove(recs);
					}
				})
    		break;
    		case 'BTN_SAVE':
    			var s_zylx=rec.get('zylx');
    			var s_csbh=rec.get('csbh');
    			var s_zyje=rec.get('zyje');
    			if(Ext.isEmpty(s_zylx)){
    				Ext.toastInfo("质押类型不能为空！");
    				break ;
    			}
    			if(Ext.isEmpty(s_csbh)){
    				Ext.toastInfo("供应商不能为空！");
    				break ;
    			}
    			if(Ext.isEmpty(s_zyje)){
    				Ext.toastInfo("质押金额不能为空或0！");
    				break ;
    			}
				var result = erp.Const.callServiceMethodSync('plasticpartspledge/plasticpartspledge.act?method=getBeforSave',
				{
					recstr : erp.Util.ModelsToJson(dStore.getRange())
				});
				var data = Ext.decode(result);
				if (!data.bool) {
					Ext.toastErrorInfo(data.msg);
					return;
				}
				rec.set('czrm',czym);
				rec.set('czrq',new Date());
				Ext.Msg.confirm('提示', '是否确认保存?', function(btn) {
					if (btn == 'yes') {
						if (mainPanel.isAdd) {
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
									var data = Ext.decode(result);
									if (!data.bool) {
										Ext.toastErrorInfo(data.msg);
										return;
									}
									dStore.each(function(dr) {
										dr.set('zydh',nrec.get('zydh'));
									})
									dStore.sync({
												callback : function(batch,options) {
													
												}
											});
									myMask.unmask();
									Ext.toastInfo('保存完毕!');
									delete store.proxy.extraParams.sort;
									delete store.proxy.extraParams.search;
									form.loadRecord(nrec);
									/*store.load({
										callback : function(recs) {
											var srec=store.findRecord('zydh',nrec.get('zydh'));	
											}
									});*/
								}
							});	
							mainPanel.isAdd=false;
						}else{
							myMask.mask('数据保存中...');
							store.sync({
								callback : function(batch, options) {
									myMask.unmask();
									form.loadRecord(rec);
									Ext.toastInfo('保存完毕!');
								}
							});
							dStore.each(function(dr) {
										dr.set('zydh',rec.get('zydh'));
									})
							dStore.sync({
								callback : function(batch,options) {
													
								}
								});
						}
					}
				})
    		break;
    	}
    },
    btnClick:function(btn){
    	var me=this;
    	var mainPanel=this.getView();
    	var store=mainPanel.store;
    	var grid=mainPanel.down('#CenterGrid');
    	recs=grid.getSelectionModel().getSelection();
    	var czym=erp.Util.currentUser.userInfo.name;
    	var date=new Date();
    	var dt2 = Ext.Date.add(date, Ext.Date.DAY, 75);
    	switch(btn.itemId){
    		case 'BTN_ADD':
    			var rec=Ext.create('erp.view.plasticPartsPledge.model.PlasticPartsPledge',{
    				zydh:0,
    				dqrq:dt2,
    				zylx:0
    			});
    			rec.phantom=true;
    			me.showEdt(store,rec,true,true);
    		break;
    		case 'BTN_DEL':
    			if(recs.length==0){
    				Ext.toastInfo('请选中某行在使用此功能！');
    				break;
    			}
    			var result = erp.Const.callServiceMethodSync('plasticpartspledge/plasticpartspledge.act?method=getBeforDel',
				{
					recstr : erp.Util.ModelsToJson(recs)
				});
				var data = Ext.decode(result);
				if (!data.bool) {
					Ext.toastErrorInfo(data.msg);
					break;
				}
				if(data.sync){
					store.load();
					Ext.toastInfo('数据验证不一致，请重试！');
    				break;
				}
				Ext.Msg.confirm('提示', '是否确认删除所选单据？', function(btn) {
					if (btn == 'yes') {
						var zydhs = new Array();
						Ext.each(recs, function(rec) {
									zydhs.push("'" + rec.get('zydh') + "'");
								})
						var result = erp.Const.callServiceMethodSync(
										'plasticpartspledge/plasticpartspledge.act?method=getDelState',
										{
											zydh : zydhs.join(',')
										});
						var data = Ext.decode(result);
						if (!data.bool) {
							Ext.toastErrorInfo(data.msg);
							return;
						}
						store.load();
					}
				})
    		break;
    		case 'btn_lock':
    			if(recs.length==0){
    				Ext.toastInfo('请选中某行在使用此功能！');
    				break;
    			}
    			var zydhs = new Array();
    			var bool=false;
    			var sdbj=recs[0].get('sdbj');
				Ext.each(recs, function(rec) {
					zydhs.push("'" + rec.get('zydh') + "'");
					if(rec.get('sdbj')!=sdbj){
						bool=true;
						Ext.toastInfo('请选择锁定标志一致的单据！');
						return false;
					}
				})
				if(bool){
					break;
				}
    			var result = erp.Const.callServiceMethodSync('plasticpartspledge/plasticpartspledge.act?method=getBeforLock',
				{
					recstr : erp.Util.ModelsToJson(recs)
				});
				var data = Ext.decode(result);
				if (!data.bool) {
					Ext.toastErrorInfo(data.msg);
					break;
				}
				if(data.sync){
					store.load();
					Ext.toastInfo('数据验证不一致，请重试！');
    				break;
				}
				var state=1;
				var show='锁定';
				if(sdbj==1){
					state=0;
					show='解锁';
				}
				Ext.Msg.confirm('提示', '是否确认'+show+'所选单据？', function(btn) {
					if (btn == 'yes') {
						var result = erp.Const.callServiceMethodSync('plasticpartspledge/plasticpartspledge.act?method=getChangeState',
										{
											fieldstate:'sdbj',
											state:state,
											fieldczym:'sdrm',
											czym:czym,
											fielddate:'sdsj',
											zydh : zydhs.join(',')
										});
						var data = Ext.decode(result);
						if (!data.bool) {
							Ext.toastErrorInfo(data.msg);
							return;
						}
						store.load();
					}
				})
    		break;
    		case 'btn_audit':
    			if(recs.length==0){
    				Ext.toastInfo('请选中某行在使用此功能！');
    				break;
    			}
    			var zydhs = new Array();
    			var bool=false;
    			var shbj=recs[0].get('shbj');
				Ext.each(recs, function(rec) {
					zydhs.push("'" + rec.get('zydh') + "'");
					if(rec.get('shbj')!=shbj){
						bool=true;
						Ext.toastInfo('请选择审核标志一致的单据！');
						return false;
					}
				})
				if(bool){
					break;
				}
    			var result = erp.Const.callServiceMethodSync('plasticpartspledge/plasticpartspledge.act?method=getBeforAudit',
				{
					recstr : erp.Util.ModelsToJson(recs)
				});
				var data = Ext.decode(result);
				if (!data.bool) {
					Ext.toastErrorInfo(data.msg);
					break;
				}
				if(data.sync){
					store.load();
					Ext.toastInfo('数据验证不一致，请重试！');
    				break;
				}
				var state=1;
				var show='审核';
				if(shbj==1){
					state=0;
					show='取消审核';
				}
				Ext.Msg.confirm('提示', '是否确认'+show+'所选单据？', function(btn) {
					if (btn == 'yes') {
						var result = erp.Const.callServiceMethodSync('plasticpartspledge/plasticpartspledge.act?method=getChangeState',
										{
											fieldstate:'shbj',
											state:state,
											fieldczym:'shrm',
											czym:czym,
											fielddate:'shsj',
											zydh : zydhs.join(',')
										});
						var data = Ext.decode(result);
						if (!data.bool) {
							Ext.toastErrorInfo(data.msg);
							return;
						}
						store.load();
					}
				})
    		break;
    		case 'btn_uncoil':
    			if(recs.length==0){
    				Ext.toastInfo('请选中某行在使用此功能！');
    				break;
    			}
    			var zydhs = new Array();
    			var bool=false;
    			var jybj=recs[0].get('jybj');
				Ext.each(recs, function(rec) {
					zydhs.push("'" + rec.get('zydh') + "'");
					if(rec.get('jybj')!=jybj){
						bool=true;
						Ext.toastInfo('请选择解押标志一致的单据！');
						return false;
					}
				})
				if(bool){
					break;
				}
    			var result = erp.Const.callServiceMethodSync('plasticpartspledge/plasticpartspledge.act?method=getBeforUncoil',
				{
					recstr : erp.Util.ModelsToJson(recs)
				});
				var data = Ext.decode(result);
				if (!data.bool) {
					Ext.toastErrorInfo(data.msg);
					break;
				}
				if(data.sync){
					store.load();
					Ext.toastInfo('数据验证不一致，请重试！');
    				break;
				}
				var state=1;
				var show='解押';
				if(jybj==1){
					state=0;
					show='取消解押';
				}
				Ext.Msg.confirm('提示', '是否确认'+show+'所选单据？', function(btn) {
					if (btn == 'yes') {
						var result = erp.Const.callServiceMethodSync('plasticpartspledge/plasticpartspledge.act?method=getChangeState',
										{
											fieldstate:'jybj',
											state:state,
											fieldczym:'jyrm',
											czym:czym,
											fielddate:'jysj',
											zydh : zydhs.join(',')
										});
						var data = Ext.decode(result);
						if (!data.bool) {
							Ext.toastErrorInfo(data.msg);
							return;
						}
						store.load();
					}
				})
    		break;
    	}
    },
    mainitemdblclick:function(v,rec){
    	var me=this;
    	var mainPanel=this.getView();
    	var store=mainPanel.store;
    	if(rec.get('sdbj')==1){
    		me.showEdt(store,rec,false,false);
    	}else{
    		me.showEdt(store,rec,false,true);
    	}
    },
    init:function(){
    	
    },
    round:function(v,l){
		return Ext.util.Format.round(v,l);
	},
	showEdt:function(store,rec,isAdd,isEdit){
		var win =Ext.create('erp.view.plasticPartsPledge.window.EdtPlasticPartsPledge',{
    		store:store,
    		rec:rec,
    		isAdd:isAdd,
    		isEdit:isEdit
    	});
    	win.show();
	}
});