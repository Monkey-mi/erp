Ext.define('erp.prepayAdjustment.controller.PrepayAdjustmentCtrl', {
	extend : 'Ext.app.Controller',
	requires : ['erp.ux.PagingBar',
			'erp.prepayAdjustment.store.PrepayAdjustmentImp',
			'erp.prepayAdjustment.store.PrepayAdjustment',
			'erp.prepayAdjustment.model.QueryParams'],
	views : ['erp.prepayAdjustment.view.TimeChoose',
			'erp.prepayAdjustment.view.PrepayAdjustmentImp',
			'erp.prepayAdjustment.view.PrepayAdjustmentQuery',
			'erp.prepayAdjustment.view.PrepayAdjustmentManger',
			'erp.prepayAdjustment.view.EditPrepayAdjustment'],
	refs : [{
				ref : 'TimeChoose',
				selector : 'win_Time1'
			}, {
				ref : 'PrepayAdjustment',
				selector : 'mng_PrepayAdjustment'
			}, {
				ref : 'GrdPrepayAdjustment',
				selector : 'mng_PrepayAdjustment #grd_PrepayAdjustment'
			}, {
				ref : 'EdtPrepayAdjustment',
				selector : 'edt_PrepayAdjustment'
			}, {
				ref : 'GrdEdtPrepayAdjustment',
				selector : 'edt_PrepayAdjustment #EdtPrepayAdjustmentDetail'
			}, {
				ref : 'EdtPrepayAdjustmentForm',
				selector : 'edt_PrepayAdjustment #EdtPrepayAdjustmentForm'
			}],
	init : function() {
		var me = this;
		if (me.isInited)
			return;
		me.control({
					'mng_PrepayAdjustment' : {
						afterrender : function() {
							me.panel = me.getPrepayAdjustment();
							me.grdmain = me.getGrdPrepayAdjustment();
							me.grdStore = me.panel.store;
							me.panel.down('#function_btn').enable();
							me.panel.can_use_btn = true;
							me.query_rec = Ext.create('erp.prepayAdjustment.model.QueryParams');
						}
					},
					'mng_PrepayAdjustment button' : {
						click : me.doAction
					},
					'mng_PrepayAdjustment #grd_PrepayAdjustment' : {
						selectionchange : function(grid, rec) {
							if (rec.length > 0) {
							}
						},
						itemdblclick : function(grid, rec) {
							/* me.EdtNotice('btn_edt') */
							me.EdtPrepayAdjustment('btn_edt');
						}
					},
					'edt_PrepayAdjustment' : {
						afterrender : function(th) {
							me.getEdtPrepayAdjustment().down('#EdtPrepayAdjustmentBar').enable();
							me.getGrdEdtPrepayAdjustment().enable();
							me.getEdtPrepayAdjustment().can_use_btn = true;
						}
					},
					'edt_PrepayAdjustment button' : {
						click : me.doEditAction
					}
				});
		me.isInited = true;
	},
	doAction : function(btn) {
		var me = this;
		if (!me.panel.can_use_btn) {
			Ext.Msg.alert('提示', "编辑状态不可操作");
			return;
		}
		switch (btn.itemId) {
			case 'btn_add' :
				this.EdtPrepayAdjustment(btn.itemId);
				break;
			case 'btn_del' :
				this.DeletePrepayAdjustment();
				break;
			case 'lock' :
				var recs = me.grdmain.getSelectionModel().getSelection();
				if (Ext.isEmpty(recs)) {
					Ext.Msg.alert('提示', '请选择一条记录!');
					break;
				}
				var rec = recs[0];
				var sdbj = 1;
				var bb = '确认';
				var czym = erp.Util.currentUser.userInfo.name;

				if (rec.get('sdbj') == 1) {
					sdbj = 0;
					bb = '取消';
					if (rec.get('tjbj') == 1) {
						Ext.Msg.alert('提示', '【' + rec.get('tjdh')+ '】号记录已提交，不能解锁定！');
						break;
					}
				}
				Ext.Msg.confirm('提示', '是否' + bb + '锁定【' + rec.get('tzdh')+ '】号记录?', function(btn) {
							if (btn == 'yes') {
								Ext.Ajax.request({
									// 将生成的xml发送到服务器端,需特别注意这个页面的地址
									url : 'prepay/prepayadjustment.act?method=lockPrepayAdjustment',
									async : false,
									timeout : 600000,
									method : 'POST',
									waitMsg : '正在进行数据验证，请耐心等候...',
									success : function(response, opts) {
										me.grdStore.reload();
									},
									params : {
										sdbj : sdbj,
										sdrm : czym,
										sdsj : Ext.Date.format(new Date(),'Y-m-d H:i:s'),
										tzdh : rec.get('tzdh')
									}
								});
							}
						});
				break
			case 'btn_query' :
				var win = Ext.widget('prepayAdjustmentQuery', {
							itemId : 'prepayAdjustmentQuery',
							mainstore : me.grdStore,
							mainview : me.panel,
							rec : me.query_rec
						});
				win.show();
				break;

		}
	},
	EdtPrepayAdjustment : function(type) {
		var me = this;
		var rec;
		var isAdd = isEdit = false;
		var canedit = true;
		switch (type) {
			case 'btn_add' :
				var rec = Ext.create('erp.prepayAdjustment.store.PrepayAdjustment');
				isAdd = true;
				isEdit = false;
				canedit = true;
				var newtzdh = null;
				Ext.Ajax.request({
					url : 'prepay/prepayadjustment.act?method=getPrepayAdjustmentOne',
					async : false,
					success : function(response, opts) {
						var obj = Ext.decode(response.responseText);
						newtzdh = obj.data;
					},
					method : "POST",
					scope : this
				});
				var rec = Ext.create(
						'erp.prepayAdjustment.model.PrepayAdjustment', {
							tzdh : parseInt(newtzdh) + 1,
							tzlx : '预付申请',
							tzrq : Ext.Date.format(new Date(), 'Y-m-d H:i:s')
						});
				break;
			case 'btn_edt' :
				var rec = me.grdmain.getSelectionModel().getSelection()[0];
				if (Ext.isEmpty(rec)) {
					Ext.Msg.alert('提示', '请先选中一条记录');
					return;
				}
				if (rec.get('sdbj') == "1") {
					Ext.Msg.alert("提示", "" + rec.get('tzdh') + "预付调整单已锁定不能编辑!");
					return;
				}

				canedit = true;
				isAdd = false;
				isEdit = true;
		}
		var panel = erp.Util.addContentTab({
					xtype : 'edt_PrepayAdjustment',
					itemId : 'EdtPrepayAdjustment',
					isAdd : isAdd,
					canedit : canedit,
					isEdit : isEdit,
					closable : true,
					rec : rec,
					mainstore : me.grdStore
				})
		panel.LoadData(rec, isAdd, isEdit, canedit);
	},
	DeletePrepayAdjustment : function() {
		var me = this;
		var rec = me.grdmain.getSelectionModel().getSelection();
		if (Ext.isEmpty(rec)) {
			Ext.Msg.alert('提示', '请先选中一条记录');
			return;
		}
		// 删除前验证

		for (x in rec) {
			if (rec[x].get('sdbj') == "1") {
				Ext.Msg.alert("提示", "" + rec[x].get('tzdh') + "预付调整单已锁定不能删除!");
				return;
			}
		}
		Ext.Msg.confirm("提示", "确认删除记录?", function(btn) {
					if (btn == "yes")
						me.grdStore.remove(rec);
					me.grdStore.sync({
								success : function(batch, options) {
									me.grdStore.reload();
								}
							});
				});
	},
	doEditAction : function(btn) {
		var me = this;
		var edt_PrepayAdjustment = me.getEdtPrepayAdjustment();
		var dStore = edt_PrepayAdjustment.dStore;
		var form = edt_PrepayAdjustment.down('#EdtPrepayAdjustmentForm');
		var grid_detail = edt_PrepayAdjustment.down('#EdtPrepayAdjustmentDetail');
		var formrec = form.getRecord();
		var grdrecs = grid_detail.getSelectionModel().getSelection();
		form.updateRecord(formrec);
		var gridStore = me.grdStore;
		switch (btn.itemId) {
			case 'imp1' :
				var win = Ext.widget('Imp_PrepayAdjustment', {});
				win.down('#btn_confirm').on({
					click : function(btn) {
						var win = btn.up('window');
						var grid = win.down('#proDetailData');
						var rec = grid.getSelectionModel().getSelection()[0];
						var r = Ext.create(
								'erp.prepayAdjustment.model.PrepayAdjustment',
								{
									tzxh : dStore.max('tzxh') == null
											? 1
											: dStore.max('tzxh') + 1,
									tzhsbm : rec.get('hsbm'),
									bmmc1:rec.get('bmmc'),
									mbhsbm : '',
									wbbh : rec.get('wbbh'),
									wbdh : rec.get('wbdh'),
									sqbh : rec.get('sqbh'),
									tzhtbh : rec.get('htbh'),
									mbhtbh : '',
									tzfydh : rec.get('fydh'),
									mbfydh : '',
									tzje : rec.get('whxje'),
									tzyy : '',
									bzsm : ''
								});
						dStore.add(r);
						win.close();
					}
				});
				win.show();
				break;
			case 'imp_add' :
				var maxxh = dStore.max('tzxh');
				maxxh = Ext.isEmpty(maxxh) ? 1 : (maxxh + 1);
				var newrec = Ext.create(
						'erp.prepayAdjustment.model.PrepayAdjustment', {
							tzxh : maxxh
						});
				newrec.phantom = true;
				dStore.add(newrec);
				break;
			break;
		case 'imp_delete' :
			var sel_recs = grid_detail.getSelectionModel().getSelection();
			if (Ext.isEmpty(sel_recs)) {
				Ext.Msg.alert('提示', '请先选中至少一条记录');
				return;
			}
			if (grid_detail.getStore().getCount() > 1) {
				dStore.remove(sel_recs);
			} else {
				Ext.Msg.alert('提示', "最后一条记录不能删除！");
			}
			break;

		case 'imp_BTN' :
			Ext.Msg.confirm('提示', '是否确认保存?', function(btn) {
				if (btn == 'yes') {
					if (edt_PrepayAdjustment.isAdd) {
						dStore.each(function(record) {
									record.set('tzdh', formrec.get('tzdh'));
									record.set('tzrq', formrec.get('tzrq'));
									record.set('tzlx', formrec.get('tzlx'));
									record.set('czrm',erp.Util.currentUser.userInfo.name);
									record.set('czsj', Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
								});
						dStore.sync({
									success : function(batch, options) {
									}
								});
						edt_PrepayAdjustment.close();
						gridStore.loadPage(1);

					} else {
						dStore.sync({
									callback : function() {
									}
								});
						edt_PrepayAdjustment.close();
						gridStore.loadPage(1);
					}
				}
			});
			break;
	}
	}
})
