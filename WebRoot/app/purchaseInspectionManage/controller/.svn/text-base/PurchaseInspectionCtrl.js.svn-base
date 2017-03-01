Ext.define('erp.purchaseInspectionManage.controller.PurchaseInspectionCtrl', {
	extend : 'Ext.app.Controller',
	requires : ['erp.ux.FormKey', 'erp.ux.ComboxTree',
			'erp.ux.RemoteValidator', 'erp.ux.GridSearchField',
			'erp.ux.CommonTrigger'],
	views : ['erp.purchaseInspectionManage.view.PurchaseInspectionManager',
			'erp.purchaseInspectionManage.view.DistributeObject',
			'erp.purchaseInspectionManage.view.DistributeObjectMaintain',
			'erp.purchaseInspectionManage.view.PurchaseInspectionTest',
			'erp.purchaseInspectionManage.view.EditPurchaseInspection',
			'erp.purchaseInspectionManage.view.ImpPurchaseInspetion',
			'erp.purchaseInspectionManage.view.purchaseInspectionPono'],
	refs : [{
				ref : 'mng_PurchaseInspection',
				selector : 'mng_PurchaseInspection'
			}, {
				ref : 'mng_PurchaseInGrid',
				selector : 'mng_PurchaseInspection #inspectionManagerGrid'
			}, {
				ref : 'mng_PurchaseInspectionTest',
				selector : 'mng_PurchaseInspectionTest'
			}, {
				ref : 'editPanel',
				selector : 'mng_EditPurchaseInspection'
			}],
	init : function() {
		// controller只初始化一次
		var me = this;
		if (me.isInited)
			return;
		me.control({
			'mng_PurchaseInspection' : {
				afterrender : function(cmp) {
					me.grid = me.getMng_PurchaseInGrid();
					me.panel = me.getMng_PurchaseInspection();
					console.log(me.panel);
				}
			},
			'mng_PurchaseInspection button' : {
				click : me.doAction
			},
			'win_DistributeObject button' : {
				click : me.doDOAction
			},
			'mng_EditPurchaseInspection button' : {
				click : me.doEditAction
			},
			'mng_PurchaseInspectionTest' : {
				afterrender : function(th) {
					me.getMng_PurchaseInspection().disable();
				},
				beforeclose : function(th) {
					me.getMng_PurchaseInspection().enable();
				}
			},
			'mng_EditPurchaseInspection' : {
				afterrender : function(th) {
					me.getMng_PurchaseInspection().disable();
				},
				beforeclose : function(th) {
					me.getMng_PurchaseInspection().enable();
				}
			}
				/*
				 * 'edit_MaterialInspection' :{ afterrender:function(th){
				 * me.getMng_MI().disable(); }, beforeclose:function(th){
				 * me.getMng_MI().enable(); } }, 'edit_MaterialInspection
				 * button' : { click:me.doEditAction }
				 */
			});
		this.isInited = true;
	},
	doAction : function(btn) {
		var me = this;
		var grid = me.grid;
		var rows = me.grid.getCurrentRow();
		var recs = grid.getSelectRow();
		var rec;
		if (recs[0]) {
			rec = recs[0];
		}
		switch (btn.itemId) {
			case erp.Const.FUNC_ITEMID_BTN_ADD :
				this.doEdit(btn.itemId);
				break;
			case 'BTN_DEL' :
				if (recs.length < 1) {
					Ext.Msg.alert('提示', "请选中某行再使用此功能！");
					return;
				}
				if (rec.get('fpbj') == 1) {
					Ext.Msg.alert('提示', "验货单已分配不能删除！");
					return;
				}
				Ext.Msg.confirm('提示', '是否确认删除该记录(Y/N)?', function(btn) {
					if (btn == 'yes') {
						Ext.Ajax.request({
							url : 'purchaseInspection/purchaseInspection.act?method=deletePurchaseInspectionManager',
							method : 'POST',
							params : {
								yhno : rec.get('yhno'),
								yhxh : rec.get('yhxh')
							},
							success : function(response) {
								me.grid.load();
							}
						})
					}
				})
				break;
			case 'BTN_LOCK' :
				var bb = '分配';
				var bj = 1;
				var yhno = rec.get('yhno');
				var yhxh = rec.get('yhxh');
				if (recs.length < 1) {
					Ext.Msg.alert('提示', "请选中某行再使用此功能！");
					return;
				}
				if (rec.get('fpbj') == 1) {
					bb = '取消分配';
					bj = 0;
				}
				Ext.Msg.confirm('提示', '是否' + bb + '所选记录(Y/N)?', function(btn) {
					if (btn == 'yes') {
						if (bj == 0) {
							Ext.Ajax.request({
								url : 'purchaseInspection/purchaseInspection.act?method=updatePurchaseInspectionFpbj',
								method : 'POST',
								params : {
									yhno : rec.get('yhno'),
									yhxh : rec.get('yhxh'),
									fpbj : bj,
									fpdx : '',
									fpsj : null
								},
								success : function(response) {
									rec.set('fpbj', 0);
									rec.set('fpsj', '');
									me.grid.load();
								}
							})
						} else {
							var win = Ext.widget('win_DistributeObject', {
										isWh : false,
										isFp : true
									});
							win.down('#btn_confirm').on({
								click : function(btn) {
									var win = btn.up('window');
									var grid = win
											.down('#DistributeObjectGrid');
									if (grid.getSelectionModel().getSelection().length < 1) {
										Ext.Msg.alert('提示', '请选择品管员!');
										return
									}
									var rec1 = grid.getSelectionModel()
											.getSelection()[0];
									Ext.Ajax.request({
										// 将生成的xml发送到服务器端,需特别注意这个页面的地址
										url : 'purchaseInspection/purchaseInspection.act?method=updatePurchaseInspectionFpbj',
										async : false,
										timeout : 600000,
										method : 'POST',
										// waitMsg : '正在进行数据验证，请耐心等候...',
										success : function(response, opts) {
											rec.set('fpbj', 1);
											rec.set('fpsj', new Date());
											me.grid.load();
										},
										params : {
											yhno : rec.get('yhno'),
											yhxh : rec.get('yhxh'),
											fpbj : bj,
											fpdx : rec1.get('czy_gh'),
											fpsj : new Date(),
											sys_user_gh : erp.Util.currentUser.isAdmin
													? 'wj'
													: erp.Util.currentUser.accountMap[0].ref_u_id
										}
									});
									win.close();
								}
							});
							win.show();
						}
					}
				})
				break;
			case 'btn_fppgywh' :
				var win = Ext.widget('win_DistributeObject', {
							isWh : true,
							isFp : false
						});
				win.down('#BTN_ADD').on({
					click : function(btn) {
						var win = btn.up('window');
						var treePanel = win.down('#distributeTree');
						var rec = treePanel.getSelectionModel().getSelection()[0];
						console.log(rec);
						if (treePanel.getSelectionModel().getSelection().length < 1
								|| rec.get('text') == '全部') {
							Ext.Msg.alert('提示', '请选择部门后再维护提交对象！');
							return
						}
						var win2 = Ext.widget('win_DistributeObjectMaintain');
						win2.down('#btn_confirm').on({
							click : function(btn) {
								var win2 = btn.up('window');
								var grid = win2
										.down('#DistributeObjectMatianGrid');
								if (grid.getSelectionModel().getSelection().length < 1) {
									Ext.Msg.alert('提示', '请选择操作员!');
									return;
								}
								var rec1 = grid.getSelectionModel()
										.getSelection()[0];
								Ext.Ajax.request({
									// 将生成的xml发送到服务器端,需特别注意这个页面的地址
									url : 'purchaseInspection/purchaseInspection.act?method=addDistributeObject',
									async : false,
									timeout : 600000,
									method : 'POST',
									// waitMsg : '正在进行数据验证，请耐心等候...',
									success : function(response, opts) {
										win.store.load();
									},
									params : {
										czy_gh : rec1.get('czy_gh'),
										czy_xm : rec1.get('czy_xm'),
										ssbm : rec.get('id')
									}
								});
								win2.close();
							}

						});
						win2.show();
					}
				});
				win.down('#btn_del').on({
					click : function(btn) {
						var win = btn.up('window');
						var grid = win.down('#DistributeObjectGrid');
						if (grid.getSelectionModel().getSelection().length < 1) {
							Ext.Msg.alert('提示', '请选择品管员!');
							return
						}
						var rec = grid.getSelectionModel().getSelection()[0];
						Ext.Ajax.request({
							// 将生成的xml发送到服务器端,需特别注意这个页面的地址
							url : 'purchaseInspection/purchaseInspection.act?method=deleteDistributeObject',
							async : false,
							timeout : 600000,
							method : 'POST',
							// waitMsg : '正在进行数据验证，请耐心等候...',
							success : function(response, opts) {
								win.store.load();
							},
							params : {
								ssbm : rec.get('ssbm'),
								czy_gh : rec.get('czy_gh')
							}
						});
					}
				});
				win.show();
				break;
			case 'Issue' :
				var panel = erp.Util.addContentTab({
							xtype : 'mng_PurchaseInspectionTest',
							itemId : 'mng_PurchaseInspectionTest',
							closable : true
						});
				break;
			case erp.Const.FUNC_ITEMID_BTN_REFRESH :
				me.grid.load();
				break;
		}
	},
	doEditAction : function(btn) {
		var me = this;
		var grid = me.grid;
		var edtpanel = me.getEditPanel();
		var isEdit = edtpanel.isEdit;
		var store = edtpanel.store;
		console.log(store);
		console.log(store.getRange());
		var nrecs = new Array();
		switch (btn.itemId) {
			case 'btn_lead' :
				var win = Ext.widget('Imp_PurchaseInspetion');
				win.down('#btn_confirm').on({
					click : function(btn) {
						var win = btn.up('window');
						var bool = false;
						var result = erp.Const
								.callServiceMethodSync('purchaseInspection/purchaseInspection.act?method=getMaxYhno');
						var data = Ext.decode(result);
						console.log(data);
						var yhno = data.yhno;
						var yhxh = store.max('yhxh') == null ? 1 : store
								.max('yhxh')
								+ 1;
						win.selStore.each(function(rec) {
							var r = Ext
									.create(
											'erp.purchaseInspectionManage.model.EditPurchaseInspection',
											{
												htbh : rec.get('htbh'),
												htxh : rec.get('htxh'),
												ddbh : rec.get('ddbh'),
												ddxh : rec.get('ddxh'),
												yhno : yhno,
												yhxh : yhxh,
												yhcs : 1,
												yhh : yhno + '-' + yhxh,
												hth : rec.get('htbh') + '-'
														+ rec.get('htxh'),
												ddh : rec.get('ddbh') + '-'
														+ rec.get('ddxh'),
												jldw : rec.get('jldw'),
												khmc : rec.get('khmc'),
												khxh : rec.get('khxh'),
												pono : rec.get('pono'),
												cpbh : rec.get('cpbh'),
												cpmc : rec.get('cpmc'),
												cgsl : rec.get('cgsl'),
												tzsl : rec.get('tzsl'),
												gysmc : rec.get('csmc'),
												wxbh : rec.get('wxdh'),
												wxxh : rec.get('wxxh'),
												wxh : rec.get('wxdh') + '-'
														+ rec.get('wxxh'),
												scdh : rec.get('htbz'),
												xgg : rec.get('zxgz'),
												xzs : rec.get('mxzs'),
												xc : rec.get('xtcd'),
												xk : rec.get('xtkd'),
												xg : rec.get('xtgd'),
												xtj : rec.get('mxtj'),
												xmz : rec.get('mxmz'),
												xjz : rec.get('mxjz'),
												cfbh : rec.get('cfbh'),
												cfxh : rec.get('cfxh'),
												cfh : rec.get('cfbh') + '-'
														+ rec.get('cfxh'),
												ywms : rec.get('ywms')
											});
							nrecs.push(r);
							yhxh++;
						})
						store.add(nrecs)
						win.close();
					}
				})
				win.show();
				break;
			case 'BTN_DEL' :
				var sel_recs = edtpanel.down('#inspectionEditGrid')
						.getSelectionModel().getSelection();
				if (Ext.isEmpty(sel_recs)) {
					Ext.Msg.alert('提示', '请先选中至少一条记录');
					return;
				}
				console.log('sel_recs');
				console.log(sel_recs);
				Ext.Msg.confirm('提示', '是否确认删除该记录(Y/N)?', function(btn) {
							if (btn == 'yes') {
								store.remove(sel_recs);
							}
						})
				break;
			case 'BTN_SAVE' :
				var recs = store.getRange();
				console.log(recs);
				if (recs.length == 0) {
					Ext.Msg.alert('提示', '请先选中至少一条记录');
					return;
				}
				;
				var s_add = "1";
				if (isEdit) {
					s_add = "0";
				}
				Ext.Msg.confirm('提示', '是否确认保存(Y/N)?', function(btn) {
					if (btn == 'yes') {
						var bool = true;
						if (s_add != "0") {
							store.add(recs);
							store.each(function(record) {
										record
												.set(
														'tjrm',
														erp.Util.currentUser.userInfo.name);
										record.set('tjsj', new Date());
									})
							store.sync({
										failure : function(batch, options) {
											bool = false;
											Ext.Msg.alert('提示', '保存失败！');
										},
										success : function(batch, options) {
											Ext.Msg.alert('提示', '保存成功！');
											me.grid.load();
										}
									});
						} else {
							var s_recs = store.getUpdatedRecords();
							console.log(s_recs[0]);
							var arry_data = '['
							s_recs[0].data.tjrm = erp.Util.currentUser.userInfo.name;
							s_recs[0].data.tjsj = new Date();
							var data = Ext.encode(s_recs[0].data);
							arry_data = arry_data + data + ']';
							console.log(arry_data);
							Ext.Ajax.request({
								// 将生成的xml发送到服务器端,需特别注意这个页面的地址
								url : 'purchaseInspection/purchaseInspection.act?method=updateEditPurchaseInspection',
								async : false,
								timeout : 600000,
								method : 'POST',
								// waitMsg : '正在进行数据验证，请耐心等候...',
								success : function(response, opts) {
									Ext.Msg.alert('提示', '保存成功！');
									me.grid.load();
								},
								failure : function(response, opts) {
									Ext.Msg.alert('提示', '保存失败！');
								},
								params : {
									data : arry_data
								}
							});
							var result = erp.Const
									.callServiceMethodSync(
											'purchaseInspection/purchaseInspection.act?method=updateEditPurchaseInspection',
											{
												data : arry_data
											});
							/*
							 * store.sync({ failure : function(batch, options) {
							 * Ext.Msg.alert('提示', '保存失败！'); }, success :
							 * function(batch, options){ Ext.Msg.alert('提示',
							 * '保存成功！'); } });
							 */
						}
					}
				})
		}
	},
	doEdit : function(type) {
		var me = this;
		var isEdit = false;
		if (type == 'BTN_ADD') {
			isAdd = true;
			/*
			 * }else{ isEdit=true; }
			 */
			var panel = erp.Util.addContentTab({
						xtype : 'mng_EditPurchaseInspection',
						itemId : 'mng_EditPurchaseInspection',
						title : '成品采购验货编辑',
						isEdit : isEdit,
						closable : true
					});
			panel.loadData(isEdit)
		}
	}
})