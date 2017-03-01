Ext.define('erp.purchaseInspectionManage.view.PurchaseInspectionManager', {
	extend : 'erp.ux.Panel',
	requires : ['erp.ux.PagingBar', 'erp.ux.QueryPanel', 'erp.ux.SupcanGrid'],
	alias : 'widget.mng_PurchaseInspection',
	hideMode : 'offsets',
	layout : {
		type : 'border',
		padding : 2
	},
	listeners : {
		close : function(panel) {
			// 为避免界面关闭时 close 时 不触发销毁方法在关闭时主动销毁界面
			if (panel) {
				panel.destroy();
			}
		}
	},
	initComponent : function() {
		var me = this;
		me.params = {
			czy_gh : erp.Util.currentUser.isAdmin
					? '000'
					: erp.Util.currentUser.accountMap[0].ref_u_id
		};
		Ext.apply(me, {
			items : [{
				region : 'center',
				flex : 2,
				split : true,
				xtype : 'SupcanGrid',
				itemId : 'inspectionManagerGrid',
				tbar : [{
							text : '增加',
							iconCls : 'page_add',
							itemId : erp.Const.FUNC_ITEMID_BTN_ADD
						}, {
							text : '删除',
							iconCls : 'page_delete',
							itemId : 'BTN_DEL',
							disabled : true
						}, {
							text : '分配',
							iconCls : 'permssion',
							itemId : 'BTN_LOCK',
							disabled : true
						}, {
							text : '查验合格',
							iconCls : 'email_edit',
							itemId : 'Issue'
						}, {
							text : '分配品管员维护',
							iconCls : 'page_find',
							itemId : 'btn_fppgywh'
						}, {
							text : '刷新',
							iconCls : 'arrow_refresh',
							itemId : erp.Const.FUNC_ITEMID_BTN_REFRESH
						}],
				mainModel : Ext
						.create('erp.purchaseInspectionManage.model.PurchaseInspectionManager'),
				MainColumns : me.MainColumns,
				Properties : {
					curSelMode : 'rows'
				},
				url : 'purchaseInspection/purchaseInspection.act?method=getPurchaseInspectionManagerList',
				params : me.params,
				onSupcanReady : function(id) {
					var me = this;
					switch (id) {
						// 根据id判断，只处理与自己相关的报表控件
						case me.supcanId :
							var af = me.getSupcan();
							/*
							 * if(me.isInited) return ; me.isInited=true;
							 */
							/* if(!af||af==null||typeof af.func=='function'){ */
							if (af == null) {
								// 延迟1秒执行，初次加载界面还没有渲染好，会报错！！
								var task = new Ext.util.DelayedTask(function() {
									af.func("Build", me.xml);
									// 插入一列表示是否选择
									if (me.Properties.curSelMode) {
										af
												.func(
														"InsertCol",
														"0 \r\n name=checked;width='35';editType='Check';editAble=false;datatype='bool';title='选择'");
									}
									url = me.url;
								});
								task.delay(500);
							} else {
								af.func("Build", me.xml);
								// 插入一列表示是否选择
								if (me.Properties.curSelMode) {
									af
											.func(
													"InsertCol",
													"0 \r\n name=checked;width='35';editType='Check';editAble=false;datatype='bool';title='选择'");
								}
								url = me.url;
							}
							me.load(me.params);
							break;
					}
				},
				onSupcanEvent : function(id, event, p1, p2, p3, p4) {
					var SupcanGrid = this;
					var af = SupcanGrid.getSupcan();
					if (id == SupcanGrid.supcanId) {
						switch (event) {
							case 'MenuClicked' :
								if (p1 == 4001) {
									Ext.Msg.alert("提示", "当前界面共有记录条数"
													+ af.func("getRows", "")
													+ "条!");
								}
								break;
							case 'MenuBeforePopup' :
								var enable = "true";
								if (p1 != "-1") { // 鼠标点在某行
								} else { // 鼠标点在标题区或空白区
									enable = "false";
								}
								// 拼装成菜单串
								var menu = "id=4001; text='记录条数'; icon=''; detail='当前界面共有记录条数"
										+ af.func("getRows", "") + "条!';";
								menu += "enabled=" + enable + "\r\n";
								af.func("AddMenu", menu);
								break;
							case 'SelChanged' :
								var recs = SupcanGrid.getSelectRow();
								if (recs.length > 0) {
									me.setBtnStatus(false);
								} else {
									me.setBtnStatus(true);
								}
								break;
							case 'DblClicked' :
								var isEdit = true;
								var rec = SupcanGrid.getSelectRow()[0];
								var sts = false;
								var canedt = false;
								console.log(me.modFuncsDisabled.BTN_EDIT);
								if (me.modFuncsDisabled.BTN_EDIT == 0) {
									var panel = erp.Util.addContentTab({
												xtype : 'mng_EditPurchaseInspection',
												itemId : 'mng_EditPurchaseInspection',
												isEdit : isEdit,
												rec : rec,
												canedt : canedt,
												sts : sts,
												closable : true
											})
									// panel.loadData(isEdit,rec);
									panel.show();
								}
								break;
							case 'Clicked' :
								if (p1 != -1 && p2 == 'checked') {
									var str = SupcanGrid.getCurrentRow();
									var value = SupcanGrid.getCellData(p1, p2);
									if (value == 1) {
										value = 0;
									} else {
										value = 1;
									}
									var strArr = str.split(',');
									var start = parseInt(strArr[0]), end = parseInt(strArr[strArr.length
											- 1]), len = strArr.length;;
									if (len > 1 && ((end - start) == len - 1)
											|| ((start - end) == len - 1)) {
										if (start > end) {
											start = strArr[len - 1];
											end = strArr[0];
										}
										SupcanGrid.setColCellData(p2, value,
												start, end);
									} else {
										SupcanGrid.setCellData(p1, p2, value);
									}
									// 设置值
									var rstr = SupcanGrid.findAll("checked=1");
								}
								if (p1 != -1) {

								} else {

								}
								break;
						}
					}
				}
			}]
		});
		me.callParent(arguments);
	},
	setBtnStatus : function(sts) {
		var me = this;
		me.down('#BTN_DEL').setDisabled(sts);
		me.down('#BTN_LOCK').setDisabled(sts);
	},
	loadMain : function() {
		var me = this;
		me.down('#MaterialInspection').load(me.params);
	}
})