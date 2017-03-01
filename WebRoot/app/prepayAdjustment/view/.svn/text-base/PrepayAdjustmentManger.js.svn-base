Ext.define('erp.prepayAdjustment.view.PrepayAdjustmentManger', {
			extend : 'erp.ux.Panel',
			alias : 'widget.mng_PrepayAdjustment',
			initComponent : function() {
				var me = this;
				me.can_use_btn = true;
				Ext.apply(me.store.proxy.extraParams, {
							begin_date : me.begin_date,
							end_date : me.end_date,
							czyh : me.czyh,
							usePaging : true
						});
				Ext.apply(me, {
							layout : {
								type : 'border',
								padding : 2
							},
							dockedItems : [{
										xtype : 'toolbar',
										dock : 'top',
										itemId : 'function_btn',
										items : [

										{
													text : '添加',
													iconCls : 'page_add',
													itemId : 'btn_add'
												},
												/*
												 * {text : '编辑',
												 * iconCls:'page_edit',
												 * itemId:'btn_edt'},
												 */
												{
													text : '删除',
													iconCls : 'page_delete',
													itemId : 'btn_del'
												},
												/*
												 * {text : '提交',iconCls:'stamp',
												 * itemId:'btn_commit'},
												 */
												{
													text : '锁定',
													iconCls : 'permssion',
													itemId : 'lock'
												},

												{
													text : '筛选',
													glyph : 0xf002,
													itemId : 'btn_query'
												},
												/*
												 * {text:'刷新',iconCls:'refresh_backwards',
												 * handler:function(){
												 * me.store.loadPage(1); }},
												 * {text : '批量修改',
												 * iconCls:'page_edit',
												 * itemId:'btn_batch'},
												 */
												{
													text : '退出',
													iconCls : 'page_error',
													itemId : 'btn_out',
													handler : function() {
														me.close();
													}
												}]
									}],

							items : [{
								flex : 1,
								region : 'center',
								xtype : 'grid',
								itemId : 'grd_PrepayAdjustment',
								overflowY : 'auto',
								overflowX : 'auto',
								features : [{
											ftype : 'summary',
											summaryType : 'count',
											dock : 'bottom'
										}],
								/*
								 * listeners : { selectionchange :
								 * function(grid, recs) { if (recs.length > 0) {
								 * me.setMainBtnStatus(false);
								 * me.dStore.load({params:{tjdh:recs[0].get('tjdh')}}); }
								 * else { me.dStore.load({params:{tjdh:-1}});
								 * me.setMainBtnStatus(true); } },
								 * itemdblclick:function(t,rec,item,index){ var
								 * isEdit=true; if(rec.get('sdbj')==1){
								 * isEdit=false; } erp.Util.addContentTab({
								 * xtype:'edt_PrepayAdjustment',
								 * itemId:'edt_PrepayAdjustment', title :
								 * '预付调整单编辑', isAdd : false, isEdit : isEdit,
								 * mainPanel:this.down('#grd_PrepayAdjustment'),
								 * store : me.store, rec:rec, closable : true
								 * }); } },
								 */
								columns : [{
									header : '锁定',
									dataIndex : 'sdbj',
									width : 60,
									renderer : erp.Util.Staterenderer,
									sumaryType : 'count',
									summaryRenderer : function(value,summaryData, dataIndex) {
										return '合计';
									}
								}, {
									header : '调整单号',
									dataIndex : 'tzdh',
									width : 100
								}, {
									header : '调整日期',
									dataIndex : 'tzrq',
									width : 100,
									xtype : 'datecolumn',
									format : 'Y-m-d'
								}, {
									header : '调整类型',
									dataIndex : 'tzlx',
									width : 100
								}, {
									header : '序号',
									dataIndex : 'tzxh',
									width : 60
								}, {
									header : '申请编号',
									dataIndex : 'sqbh',
									width : 100,
									renderer : function(v) {
										if (v == 0) {
											return ' '
										} else {
											return v
										}
									}
								}, {
									header : '调整合同号',
									dataIndex : 'tzhtbh',
									width : 100,
									renderer : function(v) {
										if (v == 0) {
											return ' '
										} else {
											return v
										}
									}
								}, {
									header : '目标合同号',
									dataIndex : 'mbhtbh',
									width : 100,
									renderer : function(v) {
										if (v == 0) {
											return ' '
										} else {
											return v
										}
									}
								}, {
									header : '调整费用单',
									dataIndex : 'tzfydh',
									width : 100
								}, {
									header : '目标费用单',
									dataIndex : 'mbfydh',
									width : 100
								}, {
									header : '调整预付合同号',
									dataIndex : 'yfhtbh',
									width : 100,
									renderer : function(v) {
										if (v == 0) {
											return ' '
										} else {
											return v
										}
									}
								}, {
									header : '调整预付费用单',
									dataIndex : 'yffydh',
									width : 100
								}, {
									header : '追加发票类别',
									dataIndex : 'tzfplb',
									width : 100
								}, {
									header : '追加发票号码',
									dataIndex : 'tzfphm',
									width : 100
								}, {
									header : '调整金额',
									dataIndex : 'tzje',
									width : 100,
									summaryType : 'sum',
									summaryRenderer : function(value,
											summaryData, dataIndex) {
										return Ext.util.Format.number(value,'0,000.00');
									}
								}, {
									header : '币种',
									dataIndex : 'wbdh',
									width : 60
								}, {
									header : '调整原因',
									dataIndex : 'tzyy',
									width : 200
								}, {
									header : '备注说明',
									dataIndex : 'bzsm',
									width : 200
								}, {
									header : '锁定人',
									dataIndex : 'sdrm',
									width : 100
								}, {
									header : '锁定时间',
									dataIndex : 'sdsj',
									width : 100,
									xtype : 'datecolumn',
									format : 'Y-m-d'
								}, {
									header : '操作员',
									dataIndex : 'czrm',
									width : 100
								}, {
									header : '操作时间',
									dataIndex : 'czsj',
									width : 100,
									xtype : 'datecolumn',
									format : 'Y-m-d'
								}],
								dockedItems : [{
											xtype : 'pagingbar',
											stateId : "pagingbar"+Ext.id(),
											store : me.store,
											dock : 'bottom',
											defaultPageSize : 50,
											displayInfo : true
										}],
								store : me.store
							}

							]
						});
				me.callParent(arguments);
			},

			loadMain : function() {
				var me = this;
				me.store.loadPage(1, {
							callback : function(records, operation, success) {
								if (records.length > 0) {
									me.down('#grd_PrepayAdjustment').getSelectionModel().select(records[0]);
								}
							}
						});
			}

		});