Ext.define('erp.payApply.view.NotArrived', {
			extend : 'erp.ux.Panel',
			alias : 'widget.NotArrived',
			requires : [
     			 	'erp.ux.PagingBar',
    				'erp.payApply.model.NotArrivedQueryParams'
     		 ],
			initComponent : function() {
				var me = this;
				var sqbh=me.sqbh;
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
//				var panel=me.down('#wdrkPl');
				me.wdrkStore = Ext.create('erp.payApply.store.Wdrk');
				me.wdfyStore = Ext.create('erp.payApply.store.Wdfy');
				me.wdrkStore.load({params : {sqbh : sqbh,jzrq : jzrq}});
				me.wdfyStore.load({params : {sqbh : sqbh,jzrq : jzrq}});
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
													text : '筛选',
													glyph : 0xf002,
													itemId : 'btn_query',
													handler : function() {
														me.querys();
													}
													
												},{
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
								itemId:'notarrivedPL',
								items : [{
									itemId : 'wdrkPl',
									title : '未达入库',
									overflowY : 'auto',
									items : [{
										xtype : 'grid',
										itemId : 'grdWdrk',
										features : [{
													ftype : 'summary',
													dock : 'bottom'
												}],
										columns : [{
											header : '核销',
											dataIndex : 'hxbj',
											width : 60,
											renderer : erp.Util.Staterenderer,
											sumaryType : 'count',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return '合计';
											}
										}, {
											header : '仓库名称',
											dataIndex : 'ckbh',
											width : 100
										}, {
											header : '入库单号',
											dataIndex : 'rkdh',
											width : 100
										}, {
											header : '序号',
											dataIndex : 'rkxh',
											width : 60
										}, {
											header : '入库日期',
											dataIndex : 'rkrq',
											width : 100,
											xtype : 'datecolumn',
											format : 'Y-m-d'
										}, {
											header : '材料名称',
											dataIndex : 'clmc',
											width : 200
										}, {
											header : '规格尺寸',
											dataIndex : 'ggcc',
											width : 100
										}, {
											header : '单位',
											dataIndex : 'jldw',
											width : 60
										}, {
											header : '入库数量',
											dataIndex : 'rksl',
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
											header : '含税单价',
											dataIndex : 'rkdj',
											width : 100
										}, {
											header : '含税金额',
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
											header : '税率',
											dataIndex : 'zzsl',
											width : 50
										}, {
											header : '除税单价',
											dataIndex : 'csdj',
											width : 100
										}, {
											header : '除税金额',
											dataIndex : 'csje',
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
											header : '税额',
											dataIndex : 'zzse',
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
											width : 60
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
											header : '入库类别',
											dataIndex : 'rklb',
											width : 80
										}, {
											header : '开票通知号',
											dataIndex : 'tzdh',
											width : 100
										}, {
											header : '采购员',
											dataIndex : 'cgym',
											width : 100
										}],
										store : me.wdrkStore
									}]
								}, {
									itemId : 'wdfyPl',
									title : '未达费用',
									overflowY : 'auto',
									overflowX : 'auto',
									removePanelHeader : true,
									items : [{
										xtype : 'grid',
										itemId : 'grdWdfy',
										features : [{
													ftype : 'summary',
													dock : 'bottom'
												}],
										columns : [{
											header : '核销',
											dataIndex : 'hxbj',
											width : 60,
											renderer : erp.Util.Staterenderer,
											sumaryType : 'count',
											summaryRenderer : function(value,
													summaryData, dataIndex) {
												return '合计';
											}
										}, {
											header : '锁定',
											dataIndex : 'sdbj',
											renderer : erp.Util.Staterenderer,
											width : 60
										}, {
											header : '费用单号',
											dataIndex : 'fydh',
											width : 100
										}, {
											header : '序号',
											dataIndex : 'fyxh',
											width : 60
										}, {
											header : '费用日期',
											dataIndex : 'fyrq',
											width : 100,
											xtype : 'datecolumn',
											format : 'Y-m-d'
										}, {
											header : '采购类别',
											dataIndex : 'cglb',
											width : 100
										}, {
											header : '供应厂商',
											dataIndex : 'csbh',
											width : 200
										}, {
											header : '费用摘要',
											dataIndex : 'fyzy',
											width : 200
										}, {
											header : '数量',
											dataIndex : 'fysl',
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
											header : '含税单价',
											dataIndex : 'fydj',
											width : 100
										}, {
											header : '含税金额',
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
											header : '税率',
											dataIndex : 'zzsl',
											width : 80
										}, {
											header : '除税单价',
											dataIndex : 'csdj',
											width : 100
										}, {
											header : '除税金额',
											dataIndex : 'csje',
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
											header : '税额',
											dataIndex : 'zzse',
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
											width : 100
										}, {
											header : '合同号',
											dataIndex : 'hth',
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
											header : '通知单号',
											dataIndex : 'tzdh',
											width : 100
										}, {
											header : '发票类别',
											dataIndex : 'fplb',
											width : 100
										}, {
											header : '发票号码',
											dataIndex : 'fphm',
											width : 100
										}],
										store : me.wdfyStore
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
			},
			querys : function(){
				var me = this;
				var win=Ext.widget('NotArrivedQuery',{
							itemId:'NotArrivedQuery',
							mainstore:me.wdrkStore
//							mainview:me.panel
						});
				win.show();
			}
		});