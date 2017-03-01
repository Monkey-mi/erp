Ext.define('erp.payApply.view.LinkedSearch', {
			extend : 'erp.ux.Panel',
			alias : 'widget.LinkedSearch',
			initComponent : function() {
				var me = this;
				var sqbh=me.sqbh;
				var wbbh=me.wbbh;
				var wbbj=0;
				if (wbbh!=null && wbbh!=''){
					wbbj=1
				}
				var myDate = new Date();
				var year = myDate.getFullYear();
				var month = myDate.getMonth()+1;
				var day=myDate.getDate();
				if (month<10){
				month = "0"+month;
				}
				if (day<10){
				day = "0"+day;
				}
				var jzrq=year+"."+month+"."+day+" 23:59:59";
				me.zjjhStore = Ext.create('erp.payApply.store.Zjjh');
				me.fkjhStore = Ext.create('erp.payApply.store.Fkjh');
				me.yfcxStore = Ext.create('erp.payApply.store.Yfcx');
				me.yfcxmxStore = Ext.create('erp.payApply.store.Yfcxmx');
				me.fpmxStore = Ext.create('erp.payApply.store.Fpmx');
				me.rkmxStore = Ext.create('erp.payApply.store.Rkmx');
				if(me.sqbh!=null && me.sqbh!=''){
					me.rkmxStore.proxy.extraParams.sqbh = me.sqbh;
				}
				me.fpwdStore = Ext.create('erp.payApply.store.Fpwd');
				me.htmxStore = Ext.create('erp.payApply.store.Htmx');
				me.cgfyStore = Ext.create('erp.payApply.store.Cgfy');
				me.zggzStore = Ext.create('erp.payApply.store.Zggz');
				me.zjjhStore.load({params : {sqbh : sqbh}});
				me.fkjhStore.load({params : {sqbh : sqbh}});
				me.yfcxStore.load({params : {sqbh : sqbh,nf:year,jzrq:jzrq}});
				me.yfcxmxStore.load({params : {sqbh : sqbh,wbbj : wbbj}});
				me.fpmxStore.load({params : {sqbh : sqbh}});
				me.rkmxStore.load({params : {sqbh : sqbh}});
				me.fpwdStore.load({params : {sqbh : sqbh}});
				me.htmxStore.load({params : {sqbh : sqbh}});
				me.cgfyStore.load({params : {sqbh : sqbh}});
				me.zggzStore.load({params : {sqbh : sqbh}});
				me.can_use_btn=true;
				Ext.apply(me, {
							layout : {
								type : 'border',
								padding : 2
							},
							dockedItems : [{
										xtype : 'toolbar',
										dock : 'top',
										items : [  {
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
								xtype : 'tabpanel',
								itemId:'linkedsearchPL',
								items : [{
									itemId : 'zjjhPl',
									title : '资金计划',
									overflowY : 'auto',
									overflowX : 'auto',
									items : [{
										xtype : 'grid',
										itemId : 'grdZjjh',
										features : [{
													ftype : 'summary',
													dock : 'bottom'
												}],
										columns : [{
											header : '序号',
											dataIndex : 'jhxh',
											width : 60,
											sumaryType : 'count',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return '合计';
											}
										}, {
											header : '用款项目',
											dataIndex : 'xmbh',
											width : 150
										}, {
											header : '用款金额',
											dataIndex : 'ykje',
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
											header : '备注说明',
											dataIndex : 'bzsm',
											width : 250
										}],
										store : me.zjjhStore
									}]
								}, {
									itemId : 'fkjhPl',
									title : '付款计划',
									overflowY : 'auto',
									overflowX : 'auto',
									removePanelHeader : true,
									items : [{
										xtype : 'grid',
										itemId : 'grdFkjh',
										features : [{
													ftype : 'summary',
													dock : 'bottom'
												}],
										columns : [{
											header : '序号',
											dataIndex : 'jhxh',
											width : 50,
											sumaryType : 'count',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return '合计';
											}
										}, {
											header : '厂商编号',
											dataIndex : 'csbh',
											width : 100
										}, {
											header : '厂商名称',
											dataIndex : 'csmc',
											width : 200
										}, {
											header : '应付金额',
											dataIndex : 'yfje',
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
											header : '已付金额',
											dataIndex : 'fkje',
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
											header : '本期应付',
											dataIndex : 'bqyf',
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
											header : '支付金额',
											dataIndex : 'zfje',
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
											header : '外币应付',
											dataIndex : 'wbyfje',
											width : 100
										}, {
											header : '本期外币',
											dataIndex : 'wbbqyf',
											width : 100
										}, {
											header : '外币支付',
											dataIndex : 'wbzfje',
											width : 100
										}, {
											header : '备注说明',
											dataIndex : 'bzsm',
											width : 250
										}],
										store : me.fkjhStore
									}]
								}, {
									itemId : 'yfcxPl',
									title : '应付查询',
									layout : {
										type : 'border',
										padding : 2
									},
									overflowY : 'auto',
									overflowX : 'auto',
									items : [{
										xtype : 'grid',
										itemId : 'grdYfcx',
										region : 'center',
										columns : [{
											header : '厂商编号',
											dataIndex : 'csbh',
											width : 100
										}, {
											header : '厂商名称',
											dataIndex : 'csmc',
											width : 200
										}, {
											header : '付款天数',
											dataIndex : 'fkts',
											width : 100
										}, {
											header : '发票应付',
											dataIndex : 'fpyfye',
											width : 100
										}, {
											header : '预付款金额',
											dataIndex : 'yfkje',
											width : 100
										}, {
											header : '0~30天',
											dataIndex : 'qjye1',
											width : 100
										}, {
											header : '30~60天',
											dataIndex : 'qjye2',
											width : 100
										}, {
											header : '60~365天',
											dataIndex : 'qjye3',
											width : 100
										}, {
											header : '超过365天',
											dataIndex : 'qjye4',
											width : 100
										}, {
											header : '未达入库',
											dataIndex : 'fpwd',
											width : 100
										}, {
											header : '未开费用',
											dataIndex : 'wkfy',
											width : 100
										}, {
											header : '应付金额',
											dataIndex : 'yfye',
											width : 100
										}, {
											header : '超信用应付',
											dataIndex : 'cxyf',
											width : 100
										}, {
											header : '信用额度',
											dataIndex : 'xyed',
											width : 100
										}],
										store : me.yfcxStore
									},{
										xtype : 'grid',
										itemId : 'grdYfcxmx',
										region : 'south',
										split : true,
										height : 500,
										features : [{
													ftype : 'summary',
													dock : 'bottom'
													},
													{
													ftype: 'groupingsummary',
													summaryType: 'count',
													dock: 'bottom',
													groupHeaderTpl: '月份: {name}'
													}],
										columns : [{
											header : '日期',
											dataIndex : 'rq',
											width : 100,
											sumaryType : 'count',
											summaryRenderer: function(value) {
												return '小计';
											},
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return '合计';
											}
										}, {
											header : '单据编号',
											dataIndex : 'pzh',
											width : 100
										}, {
											header : '发票金额',
											dataIndex : 'fpje',
											width : 100,
											summaryType : 'sum',
											summaryRenderer: function(value) {
												return Ext.util.Format.number(value, '0,000.00');
											},
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
											header : '支付金额',
											dataIndex : 'zfje',
											width : 100,
											summaryType : 'sum',
											summaryRenderer: function(value) {
												return Ext.util.Format.number(value, '0,000.00');
											},
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
											header : '汇率调整',
											dataIndex : 'hldz',
											width : 100,
											summaryType : 'sum',
											summaryRenderer: function(value) {
												return Ext.util.Format.number(value, '0.00');
											},
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0.00');
											},
											renderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0.00');
											}
										}, {
											header : '发票应付',
											dataIndex : 'fpyf',
											width : 100,
											summaryType : 'sum',
											summaryRenderer: function(value) {
												return Ext.util.Format.number(value, '0,000.00');
											},
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
											header : '账龄（天）',
											dataIndex : 'zlts',
											width : 100
										}, {
											header : '备注摘要',
											dataIndex : 'bzsm',
											width : 200
										}],
										store : me.yfcxmxStore
									}]
								}, {
									itemId : 'fpmxPl',
									title : '发票明细',
									overflowY : 'auto',
									overflowX : 'auto',
									items : [{
										xtype : 'grid',
										itemId : 'grdFpmx',
										features : [{
													ftype : 'summary',
													dock : 'bottom'
												}],
										columns : [{
											header : '发票类型',
											dataIndex : 'fplx',
											width : 100,
											sumaryType : 'count',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return '合计';
											}
										}, {
											header : '发票类别',
											dataIndex : 'fplb',
											width : 100
										}, {
											header : '发票号码',
											dataIndex : 'fphm',
											width : 100
										}, {
											header : '开票日期',
											dataIndex : 'kprq',
											width : 100,
											xtype : 'datecolumn',
											format : 'Y-m-d'
										}, {
											header : '记账日期',
											dataIndex : 'jzrq',
											width : 100,
											xtype : 'datecolumn',
											format : 'Y-m-d'
										}, {
											header : '发票数量',
											dataIndex : 'fpsl',
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
											header : '预付金额',
											dataIndex : 'yfkje',
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
											header : '已申请金额',
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
										}, {
											header : '未申请金额',
											dataIndex : 'wsqe',
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
										store : me.fpmxStore
									}]
								}, {
									itemId : 'rkmxPl',
									title : '入库明细',
									overflowY : 'auto',
									overflowX : 'auto',
									items : [{
										xtype : 'grid',
										itemId : 'grdRkmx',
										features : [{
													ftype : 'summary',
													dock : 'bottom'
												}],
//										plugins: [{ptype:'gridfilters',menuFilterText:'筛选条件'}],
										selModel:Ext.create('Ext.selection.CheckboxModel'),
										columns : [{
											header : '数据来源',
											dataIndex : 'sjly',
											width : 100,
											sumaryType : 'count',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return '合计';
											}
										}, {
											header : '合同/计划号',
											dataIndex : 'hth',
											width : 100
										}, {
											header : '送货单号',
											dataIndex : 'shdh',
											width : 100
										}, {
											header : '送货日期',
											dataIndex : 'shsj',
											width : 100,
											xtype : 'datecolumn',
											format : 'Y-m-d'
										}, {
											header : '仓库名称',
											dataIndex : 'ckbh',
											width : 100
										}, {
											header : '入库/费用单号',
											dataIndex : 'rkdh',
											width : 100
										}, {
											header : '序号',
											dataIndex : 'rkxh',
											width : 60
										}, {
											header : '入库/费用日期',
											dataIndex : 'rkrq',
											width : 100,
											xtype : 'datecolumn',
											format : 'Y-m-d'
										}, {
											header : '到货日期',
											dataIndex : 'dhrq',
											width : 100,
											xtype : 'datecolumn',
											format : 'Y-m-d'
										}, {
											header : '材料货号',
											dataIndex : 'clhh',
											width : 80
										}, {
											header : '材料名称/费用摘要',
											dataIndex : 'clmc',
											width : 150
										}, {
											header : '规格尺寸',
											dataIndex : 'ggcc',
											width : 80
										}, {
											header : '单位',
											dataIndex : 'jldw',
											width : 60
										}, {
											header : '采购数量',
											dataIndex : 'cgsl',
											width : 80,
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
											header : '到货数量',
											dataIndex : 'dhsl',
											width : 80,
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
											header : '入库/费用数量',
											dataIndex : 'rksl',
											width : 80,
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
											header : '单价',
											dataIndex : 'rkdj',
											width : 80
										}, {
											header : '金额',
											dataIndex : 'rkje',
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
											width : 80
										}, {
											header : '汇率',
											dataIndex : 'wbhl',
											width : 80
										}, {
											header : '外币单价',
											dataIndex : 'wbdj',
											width : 100
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
											header : '辅助单位',
											dataIndex : 'fzdw',
											width : 80
										}, {
											header : '辅助数量',
											dataIndex : 'fzsl',
											width : 80,
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
											header : '入库/费用类别',
											dataIndex : 'rklb',
											width : 100
										}, {
											header : '备注说明',
											dataIndex : 'bzsm',
											width : 200
										}, {
											header : '操作员',
											dataIndex : 'czym',
											width : 100
										}, {
											header : '操作时间',
											dataIndex : 'czsj',
											width : 100,
											xtype : 'datecolumn',
											format : 'Y-m-d'
										}],
										store : me.rkmxStore
									}]
								}, {
									itemId : 'fpwdPl',
									title : '发票未达',
									overflowY : 'auto',
									overflowX : 'auto',
									items : [{
										xtype : 'grid',
										itemId : 'grdFpwd',
										features : [{
													ftype : 'summary',
													dock : 'bottom'
												}],
										columns : [{
											header : '数据来源',
											dataIndex : 'sjly',
											width : 100,
											sumaryType : 'count',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return '合计';
											}
										}, {
											header : '合同/计划号',
											dataIndex : 'hth',
											width : 100
										}, {
											header : '送货单号',
											dataIndex : 'shdh',
											width : 100
										}, {
											header : '开票通知单号',
											dataIndex : 'tzdh',
											width : 100
										}, {
											header : '送货日期',
											dataIndex : 'shsj',
											width : 100,
											xtype : 'datecolumn',
											format : 'Y-m-d'
										}, {
											header : '仓库名称',
											dataIndex : 'ckbh',
											width : 100
										}, {
											header : '入库/费用单号',
											dataIndex : 'rkdh',
											width : 100
										}, {
											header : '序号',
											dataIndex : 'rkxh',
											width : 60
										}, {
											header : '入库/费用日期',
											dataIndex : 'rkrq',
											width : 100,
											xtype : 'datecolumn',
											format : 'Y-m-d'
										}, {
											header : '到货日期',
											dataIndex : 'dhrq',
											width : 100,
											xtype : 'datecolumn',
											format : 'Y-m-d'
										}, {
											header : '材料货号',
											dataIndex : 'clhh',
											width : 80
										}, {
											header : '材料名称/费用摘要',
											dataIndex : 'clmc',
											width : 150
										}, {
											header : '规格尺寸',
											dataIndex : 'ggcc',
											width : 80
										}, {
											header : '单位',
											dataIndex : 'jldw',
											width : 60
										}, {
											header : '采购数量',
											dataIndex : 'cgsl',
											width : 80,
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
											header : '到货数量',
											dataIndex : 'dhsl',
											width : 80,
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
											header : '入库/费用数量',
											dataIndex : 'rksl',
											width : 80,
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
											header : '单价',
											dataIndex : 'rkdj',
											width : 80
										}, {
											header : '金额',
											dataIndex : 'rkje',
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
											width : 80
										}, {
											header : '汇率',
											dataIndex : 'wbhl',
											width : 80
										}, {
											header : '外币单价',
											dataIndex : 'wbdj',
											width : 100
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
											header : '辅助单位',
											dataIndex : 'fzdw',
											width : 80
										}, {
											header : '辅助数量',
											dataIndex : 'fzsl',
											width : 80,
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
											header : '入库/费用类别',
											dataIndex : 'rklb',
											width : 100
										}, {
											header : '备注说明',
											dataIndex : 'bzsm',
											width : 200
										}, {
											header : '操作员',
											dataIndex : 'czym',
											width : 100
										}, {
											header : '操作时间',
											dataIndex : 'czsj',
											width : 100,
											xtype : 'datecolumn',
											format : 'Y-m-d'
										}],
										store : me.fpwdStore
									}]
								}, {
									itemId : 'htmxPl',
									title : '合同明细',
									overflowY : 'auto',
									overflowX : 'auto',
									features : [{
													ftype : 'summary',
													dock : 'bottom'
												}],
									items : [{
												xtype : 'grid',
												itemId : 'grdHtmx',
										columns : [{
											header : '合同号',
											dataIndex : 'hth',
											width : 100
										}, {
											header : '材料货号',
											dataIndex : 'clhh',
											width : 100
										}, {
											header : '材料名称',
											dataIndex : 'clmc',
											width : 150
										}, {
											header : '规格尺寸',
											dataIndex : 'ggcc',
											width : 100
										}, {
											header : '单位',
											dataIndex : 'jldw',
											width : 60
										}, {
											header : '控价类型',
											dataIndex : 'kjlx',
											width : 100
										}, {
											header : '采计数量',
											dataIndex : 'cjsl',
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
											header : '采购数量',
											dataIndex : 'cgsl',
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
											header : '辅助单位',
											dataIndex : 'fzdw',
											width : 100
										}, {
											header : '辅助数量',
											dataIndex : 'fzsl',
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
											header : '采购单价',
											dataIndex : 'cgdj',
											width : 100
										}, {
											header : '采购金额',
											dataIndex : 'cgje',
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
											header : '汇率',
											dataIndex : 'wbhl',
											width : 100
										}, {
											header : '币种',
											dataIndex : 'wbbh',
											width : 60
										}, {
											header : '外币单价',
											dataIndex : 'wbdj',
											width : 100
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
											header : '计划号',
											dataIndex : 'jhh',
											width : 100,
											sumaryType : 'count',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return '合计';
											}
										}, {
											header : '生产单号',
											dataIndex : 'jhbz',
											width : 100
										}, {
											header : '供应厂商',
											dataIndex : 'csbh',
											width : 200
										}],
										store : me.htmxStore
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
											header : '费用类型',
											dataIndex : 'fylx',
											width : 80,
											sumaryType : 'count',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return '合计';
											}
										}, {
											header : '费用单号',
											dataIndex : 'fydh',
											width : 80
										}, {
											header : '序号',
											dataIndex : 'fyxh',
											width : 60
										}, {
											header : '出货编号',
											dataIndex : 'cybh',
											width : 100
										}, {
											header : '费用金额',
											dataIndex : 'fyje',
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
											header : '费用日期',
											dataIndex : 'fyrq',
											width : 100,
											xtype : 'datecolumn',
											format : 'Y-m-d'
										}, {
											header : '供应厂商/业务对象',
											dataIndex : 'csmc',
											width : 200
										}, {
											header : '费用摘要',
											dataIndex : 'fyzy',
											width : 200
										}, {
											header : '计划号',
											dataIndex : 'jhh',
											width : 100
										}, {
											header : '合同号',
											dataIndex : 'hth',
											width : 100
										}, {
											header : '回收号',
											dataIndex : 'hsh',
											width : 100
										}, {
											header : '外协号',
											dataIndex : 'wxh',
											width : 100
										}, {
											header : '备注说明',
											dataIndex : 'bzsm',
											width : 200
										}],
										store : me.cgfyStore
									}]
								}, {
									itemId : 'zggzPl',
									title : '职工工资',
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
														value, '0,000.00');
											},
											renderer : function(value,
													summaryData, dataIndex) {
												return Ext.util.Format.number(
														value, '0,000.00');
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
								}]
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
			}

		});