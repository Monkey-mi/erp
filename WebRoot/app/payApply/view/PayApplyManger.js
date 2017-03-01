Ext.define('erp.payApply.view.PayApplyManger', {
			extend : 'erp.ux.Panel',
			alias : 'widget.mng_PayApply',
			listeners:{
			'close':function(cmp){
				cmp.destroy();
			  }
		    },
			initComponent : function() {
				var me = this;
				var gdbj=0;
				me.store = Ext.create('erp.payApply.store.PayApply');
				me.store.proxy.extraParams.gdbj=gdbj;
				me.gyfpStore = Ext.create('erp.payApply.store.SupplyInvoice');
				me.cghtStore = Ext.create('erp.payApply.store.PurchaseAgreement');
				me.xsfyStore = Ext.create('erp.payApply.store.SaleFee');
				me.cgfyStore = Ext.create('erp.payApply.store.PurchaseFee');
				me.fybxStore = Ext.create('erp.payApply.store.FeeReimbursement');
				me.zggzStore = Ext.create('erp.payApply.store.EmployeeSalary');
				me.htxxStore = Ext.create('erp.payApply.store.AgreementInfo');
				me.fkxxStore = Ext.create('erp.payApply.store.PayInfo');
				me.glfpStore = Ext.create('erp.payApply.store.LinkedInvoice');
				me.tzmxStore = Ext.create('erp.payApply.store.AdjustmentDetail');
				me.can_use_btn=true;
				Ext.apply(me.store.proxy.extraParams,{usePaging:true});
				Ext.apply(me, {
							layout : {
								type : 'border',
								padding : 2
							},
							dockedItems : [{
										xtype : 'toolbar',
										dock : 'top',
										itemId : 'PayApplyBar',
										items : [{
													text : '添加',
													iconCls : 'page_add',
													itemId : 'btn_add'
												}, {
													text : '删除',
													iconCls : 'page_delete',
													itemId : 'btn_del'
												}, {
													text : '编辑',
													iconCls : 'page_edit',
													itemId : 'btn_edt'
												}, {
													text : '提交',
													iconCls : 'stamp',
													itemId : 'btn_commit'
												}, {
													text : '审批',
													iconCls : 'email_edit',
													itemId : 'approval'
												}, {
													text : '复核',
													iconCls : 'email_edit',
													itemId : 'review'
												}, {
													text : '关联查询',
													glyph : 0xf002,
													itemId : 'linked_query'
												}, {
													text : '中止',
													iconCls : '',
													itemId : 'stop'
												}, {
													text : '已转',
													iconCls : '',
													itemId : 'transferred'
												}, {
													text : '筛选',
													glyph : 0xf002,
													itemId : 'btn_query'
												}, {
													text : '未达',
													iconCls : '',
													itemId : 'not_arrived'
												}, {
													text : '归档',
													iconCls : 'book_next',
													itemId : 'archive'
												}, {
													text : '历史',
													iconCls : 'book_open',
													itemId : 'history'
												}, {
													text : '刷新',
													iconCls : 'refresh_backwards',
													itemId : 'btn_refresh',
													handler : function() {
														me.store.loadPage(1);
													}
												}, {
													text : '提交对象维护',
													iconCls : '',
													itemId : 'maintenance'
												},{text:'打印',iconCls:'printer',itemId:erp.Const.FUNC_ITEMID_BTN_PRINT,
										    		  menu: new Ext.menu.Menu({
										   	  		    	itemId:'menu_printer'
										   	  		  })},{
													text : '退出',
													iconCls : '',
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
								itemId : 'grd_PayApply',
								overflowY : 'auto',
								overflowX : 'auto',
								features : [{
											ftype : 'summary',
											summaryType : 'count',
											dock : 'bottom'
										}],
								selModel:Ext.create('Ext.selection.CheckboxModel',{
								mode:'SINGLE'//单选模式
							    }),
								columns : [{
									header : '完成',
									width : 40,
									dataIndex : 'wcbj',
									renderer : erp.Util.Staterenderer,
									sumaryType : 'count',
									summaryRenderer : function(value,summaryData, dataIndex) {
										return '合计';
									}
								}, {
									header : '中止',
									width : 40,
									dataIndex : 'zzbj',
									renderer : erp.Util.Staterenderer
								}, {
									header : '打印',
									width : 40,
									dataIndex : 'dybj',
									renderer : erp.Util.Staterenderer
								}, {
									header : '已转',
									width : 40,
									dataIndex : 'yzbj',
									renderer : erp.Util.Staterenderer
								}, {
									header : '审批',
									width : 40,
									dataIndex : 'spbj',
									renderer : erp.Util.Staterenderer
								}, {
									header : '复核',
									width : 50,
									dataIndex : 'fhbj',
									renderer : erp.Util.Staterenderer
								}, {
									header : '提交',
									width : 40,
									dataIndex : 'tjbj',
									renderer : erp.Util.Staterenderer
								}, {
									header : '预付款',
									width : 50,
									dataIndex : 'yfkbj',
									renderer : erp.Util.Staterenderer
								}, {
									header : '还贷',
									width : 40,
									dataIndex : 'hdbj',
									renderer : erp.Util.Staterenderer
								}, {
									header : '申请编号',
									width : 70,
									dataIndex : 'sqbh'
								}, {
									header : '申请日期',
									width : 80,
									dataIndex : 'sqrq',
									xtype : 'datecolumn',
									format : 'Y-m-d'
								}, {
									header : '申请金额',
									width : 80,
									dataIndex : 'sqje',
									renderer : function(v) {
										return Ext.util.Format.number(v,
												'0,000.00');
									},
									summaryType : 'sum',
									summaryRenderer : function(value,
											summaryData, dataIndex) {
										return Ext.util.Format.number(value,
												'0,000.00');
									},
									renderer : function(value, summaryData,
											dataIndex) {
										return Ext.util.Format.number(value,
												'0,000.00');
									}
								}, {
									header : '已付金额',
									width : 80,
									dataIndex : 'yfje',
									renderer : function(v) {
										return Ext.util.Format.number(v,
												'0,000.00');
									},
									summaryType : 'sum',
									summaryRenderer : function(value,
											summaryData, dataIndex) {
										return Ext.util.Format.number(value,
												'0,000.00');
									},
									renderer : function(value, summaryData,
											dataIndex) {
										return Ext.util.Format.number(value,
												'0,000.00');
									}
								}, {
									header : '质押总额',
									width : 85,
									dataIndex : 'zyze',
									renderer : function(v) {
										return Ext.util.Format.number(v,
												'0,000.00');
									},
									summaryType : 'sum',
									summaryRenderer : function(value,
											summaryData, dataIndex) {
										return Ext.util.Format.number(value,
												'0,000.00');
									},
									renderer : function(value, summaryData,
											dataIndex) {
										return Ext.util.Format.number(value,
												'0,000.00');
									}
								}, {
									header : '币种',
									width : 50,
									dataIndex : 'wbdh'
								}, {
									header : '币种编号',
									width : 60,
									dataIndex : 'wbbh',
									hidden : true
								}, {
									header : '汇率',
									width : 50,
									dataIndex : 'wbhl',
									renderer : function(v) {
										return Ext.util.Format.number(v,
												'0,000.0000');
									}
//									,
//									summaryType : 'sum',
//									summaryRenderer : function(value,
//											summaryData, dataIndex) {
//										return Ext.util.Format.number(value,
//												'0,000.00');
//									},
//									renderer : function(value, summaryData,
//											dataIndex) {
//										return Ext.util.Format.number(value,
//												'0,000.00');
//									}
								}, {
									header : '外币金额',
									width : 80,
									dataIndex : 'wbje',
									renderer : function(v) {
										return Ext.util.Format.number(v,
												'0,000.00');
									},
									summaryType : 'sum',
									summaryRenderer : function(value,
											summaryData, dataIndex) {
										return Ext.util.Format.number(value,
												'0,000.00');
									},
									renderer : function(value, summaryData,
											dataIndex) {
										return Ext.util.Format.number(value,
												'0,000.00');
									}
								}, {
									header : '已付外币',
									width : 80,
									dataIndex : 'wbyf',
									renderer : function(v) {
										return Ext.util.Format.number(v,
												'0,000.00');
									},
									summaryType : 'sum',
									summaryRenderer : function(value,
											summaryData, dataIndex) {
										return Ext.util.Format.number(value,
												'0,000.00');
									},
									renderer : function(value, summaryData,
											dataIndex) {
										return Ext.util.Format.number(value,
												'0,000.00');
									}
								}, {
									header : '发票金额',
									width : 80,
									dataIndex : 'yfkje',
									renderer : function(v) {
										return Ext.util.Format.number(v,
												'0,000.00');
									},
									summaryType : 'sum',
									summaryRenderer : function(value,
											summaryData, dataIndex) {
										return Ext.util.Format.number(value,
												'0,000.00');
									},
									renderer : function(value, summaryData,
											dataIndex) {
										return Ext.util.Format.number(value,
												'0,000.00');
									}
								}, {
									header : '发票外币金额',
									width : 80,
									dataIndex : 'yfkwb',
									renderer : function(v) {
										return Ext.util.Format.number(v,
												'0,000.00');
									},
									summaryType : 'sum',
									summaryRenderer : function(value,
											summaryData, dataIndex) {
										return Ext.util.Format.number(value,
												'0,000.00');
									},
									renderer : function(value, summaryData,
											dataIndex) {
										return Ext.util.Format.number(value,
												'0,000.00');
									}
								}, {
									header : '用途摘要',
									width : 100,
									dataIndex : 'yotu'
								}, {
									header : '厂商名称',
									width : 200,
									dataIndex : 'csmc'
								}, {
									header : '考评等级',
									width : 40,
									dataIndex : 'kpdj',
									renderer : function(v) {
										if (v == 1) {
											return 'A'
										}
										if (v == 2) {
											return 'B'
										}
										if (v == 3) {
											return 'C'
										}
										if (v == 4) {
											return 'D'
										}
									}
								}, {
									header : '采购员',
									width : 60,
									dataIndex : 'cgyxm'
								}, {
									header : '收款单位',
									width : 200,
									dataIndex : 'skdw',
									hidden : true
								}, {
									header : '收款单位',
									width : 200,
									dataIndex : 'skdwmc'
								}, {
									header : '开户银行',
									width : 200,
									dataIndex : 'khyh'
								}, {
									header : '银行账号',
									width : 200,
									dataIndex : 'cszh'
								}, {
									header : '付款方式',
									width : 50,
									dataIndex : 'fkfs'
								}, {
									header : '付款期限',
									width : 80,
									dataIndex : 'fkqx',
									xtype : 'datecolumn',
									format : 'Y-m-d'
								}, {
									header : '付款日期',
									width : 80,
									dataIndex : 'zfrq',
									xtype : 'datecolumn',
									format : 'Y-m-d'
								}, {
									header : '付款条件',
									width : 200,
									dataIndex : 'fktj'
								}, {
									header : '付款天数',
									width : 60,
									dataIndex : 'fkts'
								}, {
									header : '主体单位',
									width : 200,
									dataIndex : 'ztmc'
								}, {
									header : '主体单位编号',
									width : 200,
									dataIndex : 'ztdw',
									hidden : true
								}, {
									header : '备注说明',
									width : 100,
									dataIndex : 'bzsm'
								}, {
									header : '申请人',
									width : 80,
									dataIndex : 'sqrm'
								}, {
									header : '所属部门',
									width : 80,
									dataIndex : 'sqbm'
								}, {
									header : '所属部门编号',
									width : 100,
									dataIndex : 'sqbmbh',
									hidden : true
								}, {
									header : '审批人名',
									width : 80,
									dataIndex : 'sprm'
								}, {
									header : '审批意见',
									width : 100,
									dataIndex : 'spyj'
								}, {
									header : '审批日期',
									width : 80,
									dataIndex : 'spsj',
									xtype : 'datecolumn',
									format : 'Y-m-d'
								}, {
									header : '提交人',
									width : 80,
									dataIndex : 'tjrm'
								}, {
									header : '提交时间',
									width : 100,
									dataIndex : 'tjsj',
									xtype : 'datecolumn',
									format : 'Y-m-d H:i'
								}, {
									header : '提交审批',
									width : 80,
									dataIndex : 'tjdx'
								}, {
									header : '复核人',
									width : 80,
									dataIndex : 'fhrm'
								}, {
									header : '复核时间',
									width : 80,
									dataIndex : 'fhsj',
									xtype : 'datecolumn',
									format : 'Y-m-d'
								}, {
									header : '复核意见',
									width : 100,
									dataIndex : 'fhyj'
								}, {
									header : '打印人',
									width : 80,
									dataIndex : 'dyrm'
								}, {
									header : '打印时间',
									width : 80,
									dataIndex : 'dysj',
									xtype : 'datecolumn',
									format : 'Y-m-d'
								}, {
									header : '已转人',
									width : 80,
									dataIndex : 'yzrm'

								}, {
									header : '已转时间',
									width : 80,
									dataIndex : 'yzsj',
									xtype : 'datecolumn',
									format : 'Y-m-d H:i'
								}, {
									header : '数据来源',
									width : 80,
									dataIndex : 'sjly'
								},{header : '业务类型',
								    width : 80,
								    dataIndex : 'ywlx',
								    renderer : function(v){
								     if(v == 0){
								       return '软面外协类';								     
								     }else if(v == 1){
								       return '喷涂外协加工类';
								     }else if(v == 2){
								       return '佣金类';
								     }else if(v == 3){
								       return '其他类';
								     }
								    }
								}],
								dockedItems : [{
									xtype : 'pagingbar',
									stateId : '8081d6f3-9db7-47dsad0d-b764-dbb70c5e81b1',
									store : me.store,
									dock : 'bottom',
									usePaging : 'true',
									defaultPageSize : 200,
									displayInfo : true
								}],
								store : me.store
							}, {
								region : 'south',
								split : true,
								height : 300,
								xtype : 'tabpanel',
								itemId:'payapplyPL',
								items : [/*{
									itemId : 'gyfpPl',
									title : '供应发票',
									overflowY : 'auto',
									overflowX : 'auto',
									items : [{
										xtype : 'grid',
										itemId : 'grdGyfp',
										features : [{
													ftype : 'summary',
													dock : 'bottom'
												}],
										columns : [{
											header : '序号',
											dataIndex : 'sqxh',
											width : 60,
											sumaryType : 'count',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return '合计';
											}
										}, {
											header : '已传',
											dataIndex : 'ycbj',
											width : 60,
											renderer : erp.Util.Staterenderer
										}, {
											header : '发票类别',
											dataIndex : 'fplb',
											width : 100
										}, {
											header : '发票号码',
											dataIndex : 'fphm',
											width : 100
										}, {
											header : '核算部门',
											dataIndex : 'hsbm',
											width : 100
										}, {
											header : '开票日期',
											dataIndex : 'kprq',
											width : 100
										}, {
											header : '记账日期',
											dataIndex : 'jzrq',
											width : 100
										}, {
											header : '发票金额',
											dataIndex : 'fpje',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000.00');
											},
											renderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000.00');
											}
										}, {
											header : '币种',
											dataIndex : 'wbbh',
											width : 50
										}, {
											header : '汇率',
											dataIndex : 'wbhl',
											width : 80
										}, {
											header : '外币金额',
											dataIndex : 'wbje',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000.00');
											},
											renderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000.00');
											}
										}, {
											header : '申请金额',
											dataIndex : 'sqje',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000.00');
											},
											renderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000.00');
											}
										}],
										store : me.gyfpStore
									}]
								}, {
									itemId : 'cghtPl',
									title : '采购合同',
									overflowY : 'auto',
									overflowX : 'auto',
									removePanelHeader : true,
									items : [{
										xtype : 'grid',
										itemId : 'grdCght',
										features : [{
													ftype : 'summary',
													dock : 'bottom'
												}],
										columns : [{
											header : '序号',
											dataIndex : 'sqxh',
											width : 50,
											sumaryType : 'count',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return '合计';
											}
										}, {
											header : '核算部门',
											dataIndex : 'hsbm',
											width : 100
										}, {
											header : '合同编号',
											dataIndex : 'htbh',
											width : 100
										}, {
											header : '合同金额',
											dataIndex : 'htje',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											},
											renderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											}
										}, {
											header : '申请金额',
											dataIndex : 'sqje',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											},
											renderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											}
										}, {
											header : '已付金额',
											dataIndex : 'yfje',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											},
											renderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											}
										}, {
											header : '外币总额',
											dataIndex : 'wbze',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											},
											renderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											}
										}, {
											header : '外币金额',
											dataIndex : 'wbje',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000.00');
											},
											renderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000.00');
											}
										}],
										store : me.cghtStore
									}]
								}, {
									itemId : 'xsfyPl',
									title : '销售费用',
									overflowY : 'auto',
									overflowX : 'auto',
									items : [{
										xtype : 'grid',
										itemId : 'grdXsfy',
										features : [{
													ftype : 'summary',
													dock : 'bottom'
												}],
										columns : [{
											header : '序号',
											dataIndex : 'sqxh',
											width : 50,
											sumaryType : 'count',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return '合计';
											}
										}, {
											header : '核算部门',
											dataIndex : 'hsbm',
											width : 100
										}, {
											header : '费用号',
											dataIndex : 'fyh',
											width : 100
										}, {
											header : '费用金额',
											dataIndex : 'fyje',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											},
											renderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											}
										}, {
											header : '申请金额',
											dataIndex : 'sqje',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											},
											renderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											}
										}, {
											header : '币种',
											dataIndex : 'wbbh',
											width : 100
										}, {
											header : '汇率',
											dataIndex : 'wbhl',
											width : 100
										}, {
											header : '外币金额',
											dataIndex : 'wbje',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											},
											renderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											}
										}, {
											header : '外币申请',
											dataIndex : 'wbsq',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000.00');
											},
											renderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000.00');
											}
										}],
										store : me.xsfyStore
									}]
								}, {
									itemId : 'cgfyPl',
									title : '采购费用',
									overflowY : 'auto',
									overflowX : 'auto',
									items : [{
										xtype : 'grid',
										itemId : 'grdCgfy',
										features : [{
													ftype : 'summary',
													dock : 'bottom'
												}],
										columns : [{
											header : '序号',
											dataIndex : 'sqxh',
											width : 50,
											sumaryType : 'count',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return '合计';
											}
										}, {
											header : '核算部门',
											dataIndex : 'hsbm',
											width : 100
										}, {
											header : '费用号',
											dataIndex : 'fyh',
											width : 100
										}, {
											header : '费用金额',
											dataIndex : 'fyje',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											},
											renderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											}
										}, {
											header : '申请金额',
											dataIndex : 'sqje',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											},
											renderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											}
										}, {
											header : '已付金额',
											dataIndex : 'yfje',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											},
											renderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											}
										}, {
											header : '币种',
											dataIndex : 'wbbh',
											width : 100
										}, {
											header : '汇率',
											dataIndex : 'wbhl',
											width : 100
										}, {
											header : '外币金额',
											dataIndex : 'wbje',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											},
											renderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											}
										}, {
											header : '外币申请',
											dataIndex : 'wbsq',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000.00');
											},
											renderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000.00');
											}
										}],
										store : me.cgfyStore
									}]
								}, {
									itemId : 'fybxPl',
									title : '费用报销',
									overflowY : 'auto',
									overflowX : 'auto',
									items : [{
										xtype : 'grid',
										itemId : 'grdFybx',
										features : [{
													ftype : 'summary',
													dock : 'bottom'
												}],
										columns : [{
											header : '序号',
											dataIndex : 'sqxh',
											width : 50,
											sumaryType : 'count',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return '合计';
											}
										}, {
											header : '核算部门',
											dataIndex : 'hsbm',
											width : 100
										}, {
											header : '报销号',
											dataIndex : 'bxh',
											width : 100
										}, {
											header : '报销金额',
											dataIndex : 'bxje',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											},
											renderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											}
										}, {
											header : '申请金额',
											dataIndex : 'sqje',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											},
											renderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											}
										}, {
											header : '币种',
											dataIndex : 'wbbh',
											width : 60
										}, {
											header : '汇率',
											dataIndex : 'wbhl',
											width : 80
										}, {
											header : '外币金额',
											dataIndex : 'wbje',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											},
											renderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											}
										}, {
											header : '外币申请',
											dataIndex : 'wbsq',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000.00');
											},
											renderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000.00');
											}
										}],
										store : me.fybxStore
									}]
								}, {
									itemId : 'zggzPl',
									title : '职工工资',
									overflowY : 'auto',
									overflowX : 'auto',
									items : [{
										xtype : 'grid',
										itemId : 'grdZggz',
										features : [{
													ftype : 'summary',
													dock : 'bottom'
												}],
										columns : [{
											header : '序号',
											dataIndex : 'sqxh',
											width : 50,
											sumaryType : 'count',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return '合计';
											}
										}, {
											header : '核算部门',
											dataIndex : 'hsbm',
											width : 100
										}, {
											header : '年份',
											dataIndex : 'gznf',
											width : 80
										}, {
											header : '月份',
											dataIndex : 'gzyf',
											width : 80
										}, {
											header : '工资模式',
											dataIndex : 'msbh',
											width : 100
										}, {
											header : '职工工号',
											dataIndex : 'zggh',
											width : 100
										}, {
											header : '栏目名称',
											dataIndex : 'lmmc',
											width : 100
										}, {
											header : '工资金额',
											dataIndex : 'gzje',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											},
											renderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											}
										}, {
											header : '申请金额',
											dataIndex : 'sqje',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											},
											renderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											}
										}, {
											header : '币种',
											dataIndex : 'wbbh',
											width : 60
										}, {
											header : '汇率',
											dataIndex : 'wbhl',
											width : 80
										}, {
											header : '外币金额',
											dataIndex : 'wbje',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											},
											renderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000');
											}
										}, {
											header : '外币申请',
											dataIndex : 'wbsq',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000.00');
											},
											renderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000.00');
											}
										}],
										store : me.zggzStore
									}]
								}, {
									itemId : 'htxxPl',
									title : '合同信息',
									overflowY : 'auto',
									overflowX : 'auto',
									items : [{
												xtype : 'grid',
												itemId : 'grdHtxx',
												columns : [{
															header : '合同编号',
															dataIndex : 'htbh',
															width : 50
														}, {
															header : '厂商编号',
															dataIndex : 'csbh',
															width : 100
														}, {
															header : '厂商名称',
															dataIndex : 'csmc',
															width : 200
														}, {
															header : '合同金额',
															dataIndex : 'htze',
															width : 100
														}, {
															header : '已申请金额',
															dataIndex : 'sqze',
															width : 100
														}, {
															header : '可申请金额',
															dataIndex : 'ksqze',
															width : 100
														}],
												store : me.htxxStore
											}]
								}, {
									itemId : 'fkxxPl',
									title : '付款信息',
									overflowY : 'auto',
									overflowX : 'auto',
									items : [{
										xtype : 'grid',
										itemId : 'grdFkxx',
										features : [{
													ftype : 'summary',
													dock : 'bottom'
												}],
										columns : [{
											header : '锁定',
											dataIndex : 'sdbj',
											width : 80,
											sumaryType : 'count',
											renderer : erp.Util.Staterenderer,
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return '合计';
											}
										}, {
											header : '已转',
											dataIndex : 'pzbj',
											renderer : erp.Util.Staterenderer,
											width : 80
										}, {
											header : '预付款',
											dataIndex : 'yfkbj',
											renderer : erp.Util.Staterenderer,
											width : 80
										}, {
											header : '单据编号',
											dataIndex : 'zfpzh',
											width : 100
										}, {
											header : '序号',
											dataIndex : 'zdxh',
											width : 50
										}, {
											header : '支付日期',
											dataIndex : 'zfrq',
											width : 100
										}, {
											header : '支付金额',
											dataIndex : 'zfje',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000.00');
											}
										}, {
											header : '币种',
											dataIndex : 'wbbh',
											width : 50
										}, {
											header : '汇率',
											dataIndex : 'wbhl',
											width : 80
										}, {
											header : '外币金额',
											dataIndex : 'wbzf',
											width : 100
										}, {
											header : '所属用户',
											dataIndex : 'yhbh',
											width : 100
										}, {
											header : '采购类别',
											dataIndex : 'cglb',
											width : 100
										}, {
											header : '厂商名称',
											dataIndex : 'csmc',
											width : 200
										}, {
											header : '支付来源',
											dataIndex : 'zhbh',
											width : 200
										}, {
											header : '支付形式',
											dataIndex : 'zfxs',
											width : 100
										}, {
											header : '备注摘要',
											dataIndex : 'bzsm',
											width : 200
										}, {
											header : '凭证类别',
											dataIndex : 'pzlb',
											width : 100
										}, {
											header : '凭证编号',
											dataIndex : 'pzbh',
											width : 100
										}, {
											header : '合同编号',
											dataIndex : 'htbh',
											width : 100
										}, {
											header : '收支类别',
											dataIndex : 'lbbh',
											width : 150
										}, {
											header : '核算类别',
											dataIndex : 'hslb',
											width : 150
										}, {
											header : '现金流量',
											dataIndex : 'xjlb',
											width : 150
										}, {
											header : '其他应收应付',
											dataIndex : 'qtlb',
											width : 150
										}, {
											header : '方向',
											dataIndex : 'qtfx',
											width : 80
										}, {
											header : '操作员名',
											dataIndex : 'czym',
											width : 80
										}, {
											header : '操作时间',
											dataIndex : 'czsj',
											width : 100
										}, {
											header : '锁定人名',
											dataIndex : 'sdrm',
											width : 80
										}, {
											header : '锁定时间',
											dataIndex : 'sdsj',
											width : 100
										}, {
											header : '资金使用号',
											dataIndex : 'syh',
											width : 100
										}, {
											header : '采购支付号',
											dataIndex : 'fkh',
											width : 100
										}],
										store : me.fkxxStore
									}]
								}, {
									itemId : 'glfpPl',
									title : '关联发票',
									items : [{
										xtype : 'grid',
										itemId : 'grdGlfp',
										features : [{
													ftype : 'summary',
													dock : 'bottom'
												}],
										columns : [{
											header : '发票类别',
											dataIndex : 'fplb',
											width : 100,
											renderer : erp.Util.Staterenderer,
											sumaryType : 'count',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return '合计';
											}
										}, {
											header : '发票号码',
											dataIndex : 'fphm',
											width : 100
										}, {
											header : '开票日期',
											dataIndex : 'kprq',
											width : 100
										}, {
											header : '记账日期',
											dataIndex : 'jzrq',
											width : 100
										}, {
											header : '发票金额',
											dataIndex : 'fpje',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000.00');
											}
										}, {
											header : '预付金额',
											dataIndex : 'yfkje',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000.00');
											}
										}, {
											header : '外币预付',
											dataIndex : 'yfkwb',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000.00');
											}
										}],
										store : me.glfpStore
									}]
								}, {
									itemId : 'tzmxPl',
									title : '调整明细',
									items : [{
										xtype : 'grid',
										itemId : 'grdTzmx',
										features : [{
													ftype : 'summary',
													dock : 'bottom'
												}],
										columns : [{
											header : '锁定',
											dataIndex : 'sdbj',
											width : 60,
											renderer : erp.Util.Staterenderer,
											sumaryType : 'count',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return '合计';
											}
										}, {
											header : '调整单号',
											dataIndex : 'tzdh',
											width : 100
										}, {
											header : '调整日期',
											dataIndex : 'tzrq',
											width : 100
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
											width : 100
										}, {
											header : '调整核算部门',
											dataIndex : 'tzhsbm',
											width : 100
										}, {
											header : '目标核算部门',
											dataIndex : 'mbhsbm',
											width : 100
										}, {
											header : '调整合同号',
											dataIndex : 'tzhtbh',
											width : 100
										}, {
											header : '目标合同号',
											dataIndex : 'mbhtbh',
											width : 100
										}, {
											header : '调整费用单',
											dataIndex : 'tzfydh',
											width : 100
										}, {
											header : '目标费用单',
											dataIndex : 'mbfydh',
											width : 100
										}, {
											header : '调整金额',
											dataIndex : 'tzje',
											width : 100,
											summaryType : 'sum',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000.00');
											}
										}, {
											header : '调整原因',
											dataIndex : 'tzyy',
											width : 100
										}, {
											header : '备注说明',
											dataIndex : 'bzsm',
											width : 100
										}, {
											header : '锁定人',
											dataIndex : 'sdrm',
											width : 100
										}, {
											header : '锁定时间',
											dataIndex : 'sdsj',
											width : 100
										}, {
											header : '操作员',
											dataIndex : 'czym',
											width : 100
										}, {
											header : '操作时间',
											dataIndex : 'czsj',
											width : 100
										}],
										store : me.tzmxStore
									}]
								}*/]
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
//									me.down('#grd_PayApply')
//											.getSelectionModel()
//											.select(records[0]);
								}
							}
						});
			},
			PrintProcess:function(item){
			var me=this;
			var recs;
			var grid = me.down('#grd_PayApply');
			recs=grid.getSelectionModel().getSelection();
			if(recs.length==0){
				Ext.Msg.alert("提示","请至少选择一条数据");
				return ;
			}
			//刷新打印
			/*var myMask = new Ext.LoadMask({
				target : me
			});
			var sql  =" update fksqspb set dybj=1,dysj=getdate(),dyrm= '"+ erp.Util.currentUser.userInfo.name + "' where sqbh='"+recs[0].get('sqbh')+"' ";
			var result = erp.Const.callServiceMethodSync('payapply/payapply.act?method=getStringFromSql',
			{sql : sql});
			myMask.unmask();
			var data = Ext.decode(result);
			if (!data.bool) {
				Ext.toastErrorInfo(data.msg);
				return ;
			} */	
			//此回调函数用于刷新相关打印标记
			var callback=function(recs,scope){
				var sql  =" update fksqspb set dybj=1,dysj=getdate(),dyrm= '"+ erp.Util.currentUser.userInfo.name + "' where sqbh='"+recs[0].get('sqbh')+"' ";
				scope.refreshPrintInfo(sql);
				recs[0].set('dybj',1);
				recs[0].set('dysj',new Date());
				recs[0].set('dyrm',erp.Util.currentUser.userInfo.name);
				recs[0].commit();
			};//是否需要刷新相关数据
			recs[0].callback=callback;
			return recs;
		}

		});