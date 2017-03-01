Ext.define('erp.master.manufacturer.view.ManufAccountDetial', {
	extend: 'erp.ux.Panel',
	alias: 'widget.mng_manufAccount',
	requires: ['erp.ux.SelectField'],
	initComponent: function() {
		var me = this;
		me.can_use_btn = true;
		me.cpStore = Ext.create('erp.master.manufacturer.store.CreatePayPlanGrid');
		me.cc_Store = Ext.create('erp.master.manufacturer.store.CreatePayPlanForm');
		var canShow1 = me.canShow1;
		var canShow2 = me.canShow2;
		var s_jzrq = me.s_jzrq;
		var qsrq_s = Ext.util.Format.date(me.qsrq, 'Y-m-d');
		var jzrq_s = Ext.util.Format.date(me.s_jzrq, 'Y-m-d');
		Ext.apply(me.store.proxy.extraParams, {
			nf: me.nf,
			gdbj: me.gdbj,
			s_jzrq: me.s_jzrq,
			qcqs : me.qcqs,
			qsrq: me.qsrq,
			jzrq: me.jzrq,
			tjlb: me.tjlb,
			yhbh: me.yhbh,
			hsbm: me.hsbm,
			wbbj: me.wbbj,
			usePaging: true
		});
		Ext.apply(me, {
			layout: {
				type: 'border',
				padding: 2
			},
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				itemId: 'function_btn',
				items: [{
					text: '定位',
					iconCls: '',
					itemId: 'btn_location'
				},
				{
					text: '筛选',
					iconCls:'page_find',
					itemId: 'btn_query'
				},
				{
					text: '生成付款计划',
					iconCls: '',
					itemId: 'btn_payplan'
				},
				{
					text: '历史厂商',
					iconCls: '',
					itemId: 'btn_hismanuf'
				},
				{
					text: '刷新',
					iconCls: 'refresh_backwards',
					handler: function() {
					me.store.loadPage(1,{params: {
						gdbj: me.gdbj//为了避免历史厂商刷新时gdbj变为0达不到刷新效果
					}}
					);
					}
				},
				{
					text: '未达',
					iconCls: '',
					itemId: 'btn_weida'
				},
				{
					text: '票据明细',
					iconCls: '',
					itemId: 'btn_pjmx'
				},
				{
					text: '打印',
					iconCls: '',
					itemId: 'btn_print'
				},
				{
					text: '退出',
					iconCls: '',
					itemId: 'btn_out',
					handler: function() {
					me.close();
					}
				},
				{
			        xtype: 'displayfield',
			        itemId: 'tips',
			        value: '<font color="red">'+'厂商应付总账'+'【日期：'+qsrq_s+'至'+jzrq_s+'  所属用户：'+me.s_yhmc+'  核算部门：'+me.s_bmmc+' 币种：'+me.bzmc+'】</font>' 
			    }
				]
			}],
			items: [{
				flex: 1,
				region: 'center',
				xtype: 'grid',
				itemId: 'grd_ManufAccount',
				overflowY: 'auto',
				overflowX: 'auto',
				selModel: Ext.create('Ext.selection.CheckboxModel'),
				dockedItems: [{
					xtype: 'pagingbar',
					stateId : "pagingbar"+Ext.id(),
					store: me.store,
					dock: 'bottom',
					defaultPageSize: 50,					
					displayInfo: true
				}],
				features: [{
					ftype: 'summary',
					summaryType: 'count',
					dock: 'bottom'
				}],
				columns: [
				{
					header: '厂商编号',
					width: 70,
					dataIndex: 'csbh',
					sumaryType: 'count',
					summaryRenderer: function(value, summaryData, dataIndex) {
						return '合计';
					}
				},				
				{
					header: '所属部门',
					width: 100,
					dataIndex: 'yhbh',
					hideable: false,
					//隐藏此列
					hidden: true
				},
				{
					header: '截止时间',
					width: 80,
					dataIndex: 's_jzrq',
					xtype: 'datecolumn',
					format: 'Y-m-d',
					hideable: false,
					//隐藏此列
					hidden: true
				},
				{
					header: '核算部门',
					width: 70,
					dataIndex: 'bmmc'
				},
				{
					header: '厂商名称',
					width: 100,
					dataIndex: 'csmc'
				},
				{
					header: '币种',
					width: 100,
					dataIndex: 'wbbh',
					hideable: false,
					//隐藏此列
					hidden: true
				},
				{
					header: '发票期初',
					width: 100,
					dataIndex: 'fpqcye',
					hidden: canShow1,
					renderer: function(v) {
						return Ext.util.Format.number(v, '0,000.00');
					},
					summaryType: 'sum',
					summaryRenderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					},
					renderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					}
				},
				{
					header: '发票期初',
					width: 100,
					hidden: canShow2,
					dataIndex: 'wbfpqcye',
					renderer: function(v) {
						return Ext.util.Format.number(v, '0,000.00');
					},
					summaryType: 'sum',
					summaryRenderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					},
					renderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					}
				},
				{
					header: '＋发票金额',
					width: 100,
					dataIndex: 'fpje',
					hidden: canShow1,
					renderer: function(v) {
						return Ext.util.Format.number(v, '0,000.00');
					},
					summaryType: 'sum',
					summaryRenderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					},
					renderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					}
				},
				{
					header: '＋发票金额',
					width: 100,
					hidden: canShow2,
					dataIndex: 'wbfpje',
					renderer: function(v) {
						return Ext.util.Format.number(v, '0,000.00');
					},
					summaryType: 'sum',
					summaryRenderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					},
					renderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					}
				},
				{
					header: '－支付金额',
					width: 100,
					dataIndex: 'zfje',
					hidden: canShow1,
					renderer: function(v) {
						return Ext.util.Format.number(v, '0,000.00');
					},
					summaryType: 'sum',
					summaryRenderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					},
					renderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					}
				},
				{
					header: '－支付金额',
					width: 100,
					hidden: canShow2,
					dataIndex: 'wbzfje',
					renderer: function(v) {
						return Ext.util.Format.number(v, '0,000.00');
					},
					summaryType: 'sum',
					summaryRenderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					},
					renderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					}
				},
				{
					header: '＋汇率调整',
					width: 100,
					dataIndex: 'hldz',
					renderer: function(v) {
						return Ext.util.Format.number(v, '0,000.00');
					},
					summaryType: 'sum',
					summaryRenderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					},
					renderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					}
				},
				{
					header: '＝发票应付',
					width: 100,
					dataIndex: 'fpyfye',
					hidden: canShow1,
					renderer: function(v) {
						return Ext.util.Format.number(v, '0,000.00');
					},
					summaryType: 'sum',
					summaryRenderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					},
					renderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					}
				},
				{
					header: '＝发票应付',
					width: 100,
					dataIndex: 'wbfpyfye',
					hidden: canShow2,
					renderer: function(v) {
						return Ext.util.Format.number(v, '0,000.00');
					},
					summaryType: 'sum',
					summaryRenderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					},
					renderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					}
				},
				{
					header: '＋未达入库',
					width: 100,
					dataIndex: 'fpwd',
					hidden: canShow1,
					renderer: function(v) {
						return Ext.util.Format.number(v, '0,000.00');
					},
					summaryType: 'sum',
					summaryRenderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					},
					renderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					}
				},
				{
					header: '＋未达入库',
					width: 100,
					dataIndex: 'wbfpwd',
					hidden: canShow2,
					renderer: function(v) {
						return Ext.util.Format.number(v, '0,000.00');
					},
					summaryType: 'sum',
					summaryRenderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					},
					renderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					}
				},
				{
					header: '＋未达费用',
					width: 100,
					dataIndex: 'wdfy',
					hidden: canShow1,
					renderer: function(v) {
						return Ext.util.Format.number(v, '0,000.00');
					},
					summaryType: 'sum',
					summaryRenderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					},
					renderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					}
				},
				{
					header: '＋未达费用',
					width: 100,
					dataIndex: 'wbwdfy',
					hidden: canShow2,
					renderer: function(v) {
						return Ext.util.Format.number(v, '0,000.00');
					},
					summaryType: 'sum',
					summaryRenderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					},
					renderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					}
				},
				{
					header: '＝应付余额',
					width: 100,
					dataIndex: 'fpyfze',
					hidden: canShow1,
					renderer: function(v) {
						return Ext.util.Format.number(v, '0,000.00');
					},
					summaryType: 'sum',
					summaryRenderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					},
					renderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					}
				},
				{
					header: '＝应付余额',
					width: 100,
					dataIndex: 'wbfpyfze',
					hidden: canShow2,
					renderer: function(v) {
						return Ext.util.Format.number(v, '0,000.00');
					},
					summaryType: 'sum',
					summaryRenderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					},
					renderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					}
				},
				{
					header: '厂商类别',
					width: 100,
					dataIndex: 'cslb'
				},
				{
					header: '期初票据',
					width: 100,
					dataIndex: 'pjqcye',
					renderer: function(v) {
						return Ext.util.Format.number(v, '0,000.00');
					},
					summaryType: 'sum',
					summaryRenderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					},
					renderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					}
				},
				{
					header: '开出票据',
					width: 100,
					dataIndex: 'kcpj',
					renderer: function(v) {
						return Ext.util.Format.number(v, '0,000.00');
					},
					summaryType: 'sum',
					summaryRenderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					},
					renderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					}
				},
				{
					header: '已付票据',
					width: 100,
					dataIndex: 'yfpj',
					renderer: function(v) {
						return Ext.util.Format.number(v, '0,000.00');
					},
					summaryType: 'sum',
					summaryRenderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					},
					renderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					}
				},
				{
					header: '未付票据',
					width: 100,
					dataIndex: 'wfpj',
					renderer: function(v) {
						return Ext.util.Format.number(v, '0,000.00');
					},
					summaryType: 'sum',
					summaryRenderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					},
					renderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					}
				},
				{
					header: '销售已支付金额',
					width: 100,
					dataIndex: 'xszfje',
					renderer: function(v) {
						return Ext.util.Format.number(v, '0,000.00');
					},
					summaryType: 'sum',
					summaryRenderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					},
					renderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					}
				},
				{
					header: '销售未支付金额',
					width: 100,
					dataIndex: 'xswfje',
					renderer: function(v) {
						return Ext.util.Format.number(v, '0,000.00');
					},
					summaryType: 'sum',
					summaryRenderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					},
					renderer: function(value, summaryData, dataIndex) {
						return Ext.util.Format.number(value, '0,000.00');
					}
				}
				],
				store: me.store
			}]
		});
		me.callParent(arguments);
	},
	/**
	 * 操作员是否有该部门权限
	 * */
	hasPermission: function(hsbm, czyh) {
		var result = erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=hasPermission', {
			hsbm: hsbm,
			czyh: czyh
		});
		return result;
	},
	loadMain: function() {
		var me = this;
		me.store.loadPage(1, {
			callback: function(records, operation, success) {
//				if (records.length > 0) {
//					me.down('#grd_ManufAccount').getSelectionModel().select(records[0]);
//				}
			}
		});
	}
});