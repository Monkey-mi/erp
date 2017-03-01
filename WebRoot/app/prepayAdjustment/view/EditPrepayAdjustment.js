Ext.define('erp.prepayAdjustment.view.EditPrepayAdjustment', {
	extend : 'erp.ux.Panel',
	alias : 'widget.edt_PrepayAdjustment',
	requires : ['erp.ux.SearchCombobox', 'erp.ux.CommonTrigger',
			'erp.prepayAdjustment.view.AgreementChoose',
			'erp.prepayAdjustment.view.PrepayAgreementChoose',
			'erp.prepayAdjustment.view.FeeChoose', 'erp.ux.SelectField'],
	layout : {
		type : 'border'
	},

	title : '预付调整单编辑',
	initComponent : function() {
		var me = this;
		me.dStore = Ext.create('erp.prepayAdjustment.store.PrepayAdjustment');
		Ext.apply(me, {
			dockedItems : [{
						xtype : 'toolbar',
						dock : 'top',
						itemId : 'EdtPrepayAdjustmentBar',
						items : [{
									text : '导入',
									iconCls : 'page_go',
									itemId : 'imp1'
								}, {
									text : '增加',
									iconCls : 'page_add',
									itemId : 'imp_add'
								}, {
									text : '删除',
									iconCls : 'page_delete',
									itemId : 'imp_delete'
								}, {
									text : '保存',
									iconCls : 'save',
									xtype : 'button',
									itemId : 'imp_BTN'
								}, {
									text : '退出',
									iconCls : 'page_error',
									itemId : 'btn_out',
									handler : function() {
										me.close();
									}
								}]
					}],
			items : [{
				region : 'center',
				flex : 1,
				xtype : 'form',
				reference : 'EdtPrepayAdjustmentForm',
				itemId : 'EdtPrepayAdjustmentForm',
				minHeight : 80,
				items : [{
					xtype : 'fieldset',
					height : 70,
					width : 600,
					layout : 'column',
					collapsible : false,
					defaults : {
						anchor : '90%',
						padding : '2,0,2,0',
						labelWidth : 60
					},
					margin : 10,
					padding : 5,
					store : me.dStore,
					defaultType : 'textfield',
					items : [{
								fieldLabel : '调整单号',
								itemId : 'tzdh',
								name : 'tzdh',
								columnWidth : 0.3,
								readOnly : true,
								fieldStyle : 'background:#E6E6E6'
							}, {
								xtype : 'datefield',
								fieldLabel : '调整日期',
								format : 'Y-m-d h:i:s',
								itemId : 'tzrq',
								name : 'tzrq',
								columnWidth : 0.4,
								readOnly : !me.canedit
							}, {
								fieldLabel : '调整类型',
								itemId : 'tzlx',
								name : 'tzlx',
								columnWidth : 0.3,
								xtype : 'combo',
								readOnly : !me.canedit,
								store : [['预付申请', '预付申请'], ['发票预付', '发票预付']],

								listeners : {
									'select' : function() {
										if (this.getRawValue() == '预付申请') {
											var grd = me
													.down('#EdtPrepayAdjustmentDetail');
											var colu = grd.columns;
											colu[8].hide();
											colu[9].hide();
											colu[10].hide();
											colu[11].hide();

											colu[1].show();
											colu[4].show();
											colu[5].show();
											colu[6].show();
											colu[7].show();
											me.down('#imp1').enable();
										} else {
											var grd = me
													.down('#EdtPrepayAdjustmentDetail');
											var colu = grd.columns;
											colu[1].hide();
											colu[4].hide();
											colu[5].hide();
											colu[6].hide();
											colu[7].hide();

											colu[8].show();
											colu[9].show();
											colu[10].show();
											colu[11].show();
											me.down('#imp1').disable();
										}
									}
								}
							}]
				}]
			}, {
				xtype : 'grid',
				region : 'south',
				reference : 'EdtPrepayAdjustmentDetail',
				itemId : 'EdtPrepayAdjustmentDetail',
				split : true,
				flex : 7,
				store : me.dStore,
				features : [{
							ftype : 'summary',
							summaryType : 'count',
							dock : 'bottom'
						}],
				columns : [{
							dataIndex : 'tzxh',
							header : '序号',
							width : 45,
							sumaryType : 'count',
							summaryRenderer : function(value, summaryData,
									dataIndex) {
								return '合计';
							}
						}, {
							dataIndex : 'sqbh',
							header : '申请编号',
							width : 100,
							renderer : function(v) {
								if (v == 0) {
									return ' '
								} else {
									return v
								}
							}
						}, {
							dataIndex : 'bmmc1',
							header : '调整核算部门',
							width : 100
						}, {
							dataIndex : 'bmmc2',
							header : '目标核算部门',
							width : 100
						}, {
							dataIndex : 'tzhtbh',
							itemId : 'tzhtbh',
							header : '调整合同号',
							width : 100,
							renderer : function(v) {
								if (v == 0) {
									return ' '
								} else {
									return v
								}
							}
						}, {
							dataIndex : 'mbhtbh',
							header : '目标合同号',
							width : 100,
							editor : {
								xtype : 'commonTrigger',
								name : 'mbhtbh',
								itemId : 'mbhtbh',
								selModel : 'SINGLE',

								cusConfig : {
									type : 'QuotDetail',
									field : 'mbhtbh',
									indexNum : 3,
									callback : function(v, rec, recs) {
										me.mbhtbhCallback(v, rec, recs);
									}
								},
								win : 'erp.prepayAdjustment.view.AgreementChoose'
							},
							renderer : function(v) {
								if (v == 0) {
									return ' '
								} else {
									return v
								}
							}
						}, {
							dataIndex : 'tzfydh',
							header : '调整费用单',
							width : 100
						}, {
							dataIndex : 'mbfydh',
							header : '目标费用单',
							editor : {
								xtype : 'commonTrigger',
								name : 'mbfydh',
								itemId : 'mbfydh',
								selModel : 'SINGLE',

								cusConfig : {
									type : 'QuotDetail',
									field : 'mbfydh',
									indexNum : 3,
									callback : function(v, rec, recs) {
										me.mbfydhCallback(v, rec, recs);
									}
								},

								win : 'erp.prepayAdjustment.view.FeeChoose'
							},
							width : 100
						}, {
							dataIndex : 'yfhtbh',
							header : '调整预付合同号',
							width : 100,
							renderer : function(v) {
								if (v == 0) {
									return ' '
								} else {
									return v
								}
							},
							editor : {
								xtype : 'commonTrigger',
								name : 'yfhtbh',
								itemId : 'yfhtbh',
								selModel : 'SINGLE',

								cusConfig : {
									type : 'QuotDetail',
									field : 'yfhtbh',
									indexNum : 3,
									callback : function(v, rec, recs) {
										me.yfhtbhCallback(v, rec, recs);
									}
								},

								win : 'erp.prepayAdjustment.view.PrepayAgreementChoose'
								/*listeners : {
									change : function(o, newValue, oldValue,
											eOpts) {
											me.down('#htbh').setValue(newValue);	
									}
								}*/
							}

						}, {
							dataIndex : 'yffydh',
							header : '调整预付费用单',
							editor : {
								xtype : 'commonTrigger',
								name : 'yffydh',
								itemId : 'yffydh',
								selModel : 'SINGLE',

								cusConfig : {
									type : 'QuotDetail',
									field : 'yffydh',
									indexNum : 3,
									callback : function(v, rec, recs) {
										me.yffydhCallback(v, rec, recs);
									}
								},

								win : 'erp.prepayAdjustment.view.PrepayFeeChoose'
							},
							width : 100
						}, {
							dataIndex : 'tzfplb',
							header : '追加发票类别',
							editor : {
								xtype : 'commonTrigger',
								name : 'tzfplb',
								itemId : 'tzfplb',
								selModel : 'SINGLE',

								cusConfig : {
									type : 'QuotDetail',
									field : 'tzfplb',
									indexNum : 3,
									callback : function(v, rec, recs) {
										me.fpxzCallback(v, rec, recs);
									}
								},

								win : 'erp.prepayAdjustment.view.InvoiceChoose'
							},
							width : 100
						}, {
							dataIndex : 'tzfphm',
							header : '追加发票号码',
							editor : {
								xtype : 'commonTrigger',
								name : 'tzfphm',
								itemId : 'tzfphm',
								selModel : 'SINGLE',

								cusConfig : {
									type : 'QuotDetail',
									field : 'tzfphm',
									indexNum : 3,
									callback : function(v, rec, recs) {
										me.fpxzCallback(v, rec, recs);
									}
								},

								win : 'erp.prepayAdjustment.view.InvoiceChoose'
							},
							width : 100
						}, {
							dataIndex : 'tzje',
							header : '调整金额',
							width : 100,
							editor : {},
							summaryType : 'sum',
							summaryRenderer : function(value, summaryData,
									dataIndex) {
								return Ext.util.Format
										.number(value, '0,000.00');
							},
							renderer : function(v) {
								if (v == 0) {
									return ' '
								} else {
									return v
								}
							}
						}, {
							dataIndex : 'wbdh',
							header : '币种',
							width : 80
						}, {
							dataIndex : 'tzyy',
							header : '调整原因',
							width : 200,
							editor : {}
						}, {
							dataIndex : 'bzsm',
							header : '备注说明',
							width : 200,
							editor : {}
						}

				],
				plugins : Ext.create('Ext.grid.plugin.CellEditing', {
							clicksToEdit : 1,
							editable : !me.canedit,
							autoCancel : false,
							itemId : 'cellEditing'
						})
					/*
				 * plugins:Ext.create('Ext.grid.plugin.CellEditing', {
				 * clicksToEdit : 1, autoCancel: false,
				 * itemId:'cellEditing', listeners:{
				 * 'beforeedit':function(field,e){ e.cancel=true; },
				 * 'edit':function(field,e){ if(e.value!=e.originalValue){
				 * var rec=e.record; switch (e.field){
				 * 
				 *  } } } }})
				 */
			}]
		});
		me.callParent(arguments);
	},
	mbhtbhCallback : function(view, rec, recs) {
		var me = this;
		var grid = me.down('#EdtPrepayAdjustmentDetail');
		var srec = grid.getSelectionModel().getSelection()[0];
		srec.set('mbhtbh', rec.get('htbh'));
		srec.set('mbhsbm', rec.get('hsbm'));
	},
	mbfydhCallback : function(view, rec, recs) {
		var me = this;
		var grid = me.down('#EdtPrepayAdjustmentDetail');
		var srec = grid.getSelectionModel().getSelection()[0];
		srec.set('mbfydh', rec.get('fyh'));
		srec.set('mbhsbm', rec.get('hsbm'));
	},
	yfhtbhCallback : function(view, rec, recs) {
		var me = this;
		var grid = me.down('#EdtPrepayAdjustmentDetail');
		var srec = grid.getSelectionModel().getSelection()[0];
		srec.set('yfhtbh', rec.get('htbh'));
		srec.set('mbhsbm', rec.get('hsbm'));
	},
	yffydhCallback : function(view, rec, recs) {
		var me = this;
		var grid = me.down('#EdtPrepayAdjustmentDetail');
		var srec = grid.getSelectionModel().getSelection()[0];
		srec.set('yffydh', rec.get('fyh'));
		srec.set('mbhsbm', rec.get('hsbm'));
	},
	fpxzCallback : function(view, rec, recs) {
		var me = this;
		var grid = me.down('#EdtPrepayAdjustmentDetail');
		var srec = grid.getSelectionModel().getSelection()[0];
		srec.set('tzfplb', rec.get('fplb'));
		srec.set('tzfphm', rec.get('fphm'));
		srec.set('wbbh', rec.get('wbdh'));
	},
	LoadData : function(rec, isAdd, isEdit, canedit) {
		var me = this;
		me.down('#EdtPrepayAdjustmentForm').loadRecord(rec);
		me.down('#EdtPrepayAdjustmentDetail').getStore().load({
					params : {
						tzdh : rec.get('tzdh')
					}
				});
		if (rec.get('tzlx') == '预付申请') {
			var grd = me.down('#EdtPrepayAdjustmentDetail');
			var colu = grd.columns;
			colu[8].hide();
			colu[9].hide();
			colu[10].hide();
			colu[11].hide();

			colu[1].show();
			colu[4].show();
			colu[5].show();
			colu[6].show();
			colu[7].show();
			me.down('#imp1').enable();
		} else {
			var grd = me.down('#EdtPrepayAdjustmentDetail');
			var colu = grd.columns;
			colu[1].hide();
			colu[4].hide();
			colu[5].hide();
			colu[6].hide();
			colu[7].hide();

			colu[8].show();
			colu[9].show();
			colu[10].show();
			colu[11].show();
			me.down('#imp1').disable();
		}
	}
		// 编辑前，加载区域树，不然不显示文本内容，虽然value存在
		/*
	 * loadHsbmStore:function(node){ var me=this; if(node!=null && node!="" &&
	 * node!=0){//加载树 var picker=me.down('#hsbm').getPicker(); // var
	 * path="/0"; // for(var i=0;i<node.length/2-1;i++){ //
	 * path+="/"+node.substring(i*2,(i+1)*2); // } //
	 * picker.expandPath(path); picker.expandAll();//展开所有，加载所有 } }
	 */
});