Ext.define('erp.master.manufacturer.view.CreatePayPlan', {
	extend: 'erp.ux.Window',
	alias: 'widget.createpayPlan',
	requires: ['erp.ux.SearchCombobox', 
	           'erp.ux.CommonTrigger', 
	           'erp.master.manufacturer.view.CsmcSearch', 
	           'erp.ux.SelectField'],
	width: 980,
	height: 800,
	modal: true,
	initComponent: function() {
		var me = this;
		var myDate = new Date();
		myDate.setDate(01);
		me.cpStore = Ext.create('erp.master.manufacturer.store.CreatePayPlanGrid');
		me.cc_Store = Ext.create('erp.master.manufacturer.store.CreatePayPlanForm');
		me.csmcStore = Ext.create('erp.master.manufacturer.store.Csmc');
		me.CurrencyStore = Ext.create('erp.master.foreigncurrency.store.foreignCurrency');
		me.toBeDeleteFileArray = [];
		Ext.apply(me, {
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			tbar: [{
				text: '保存',
				glyph: 0xf0c7,
				itemId: 'BTN_SAVE'
			},
			{
				text: '关闭',
				glyph: 0xf00d,
				handler: function() {
					me.close();
				}
			}],
			items: [{
				xtype: 'form',
				height: 120,
				itemId: 'P1Form',
				title: '基础信息',
				bodyPadding: 10,
				store: me.cc_Store,
				layout: 'column',
				defaults: {
					labelWidth: 80,
					xtype: 'textfield',
					padding: 3
				},
				items: [{
					fieldLabel: '用户名称',
					name: 'czym',
					hidden: true,
					columnWidth: 1
				},
				{
					fieldLabel: '操作时间',
					name: 'czsj',
					columnWidth: 0.25,
					xtype: 'datefield',
					hidden: true,
					temId: 'czsj'
				},
				{
					fieldLabel: '计划编号',
					name: 'jhbh',
					columnWidth: 0.2,
					maxLength: 100
				},
				{
					fieldLabel: '计划起始',
					name: 'qsrq',
					columnWidth: 0.4,
					xtype: 'datefield',
					value: myDate,
					temId: 'qsrq',
					format: 'Y年m月d日',
					renderer : Ext.util.Format.dateRenderer('Y年m月d日')
				},
				{
					fieldLabel: '计划截止',
					name: 'jzrq',
					columnWidth: 0.4,
					xtype: 'datefield',
					temId: 'jzrq',
					value: new Date(),
					format: 'Y年m月d日',
					renderer : Ext.util.Format.dateRenderer('Y年m月d日')
				},
				{
					fieldLabel: '备注说明',
					name: 'bzsm',
					itemId: 'bzsm',
					columnWidth: 1
				}]
			},
			{
				xtype: 'tabpanel',
				flex: 1,
				items: [{
					xtype: 'grid',
					itemId: 'grdPayPlan',
					title: '询价明细',
					selModel: Ext.create('Ext.selection.CheckboxModel'),
					tbar: [{
						text: '增加',
						glyph: 0xf055,
						itemId: 'btn_cp_add'
					},
					{
						text: '删除',
						glyph: 0xf014,
						itemId: 'btn_cp_del'
					}],
					features: [{
						ftype: 'summary',
						summaryType: 'count',
						dock: 'bottom'
					}],
					columns: [{
						header: '序号',
						dataIndex: 'jhxh',
						width: 40,
						summaryType: 'count',
						summaryRenderer: function(value, summaryData, dataIndex) {
							return '合计';
						}
					},
					{
						header: '厂商名称',
						dataIndex: 'csmc',
						width: 160,
						field: {							
							xtype: 'commonTrigger',
							name: 'csmc',
							itemId: 'csmc',
							selModel:'MULTI',
							cusConfig: {
//								type: 'ContractDetail',
								field: 'csmc',
								indexNum: 4,
								callback: function(v, rec, recs) {
									me.csmcCallback(v, rec, recs);
								}
							},
							win: 'erp.master.manufacturer.view.CsmcSearch',
							listeners:{
								change :function(o,  newValue,  oldValue,  eOpts){
			                    }
							}
						}					
					},

					{
						header: '发票应付',
						dataIndex: 'fpje',
						width: 160,
						xtype: 'numbercolumn',
						summaryType: 'sum',
						summaryRenderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					},
					{
						header: '应付金额',
						dataIndex: 'yfje',
						width: 110,
						xtype: 'numbercolumn',
						summaryType: 'sum',
						summaryRenderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					},
					{
						header: '本期应付',
						dataIndex: 'bqyf',
						width: 110,
						xtype: 'numbercolumn',
						editor: {},
						summaryType: 'sum',
						summaryRenderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					},
					{
						header:'币种',
						dataIndex: 'wbdh',
						align:'center',
						width: 60,
						field:{
		   	  	  			xtype:'textfield'
		   	  	  		}
					},
					{
						header:'币种',
						dataIndex: 'wbbh',						
						width: 60,
						align:'center',
						field:{
		   	  	  			xtype:'textfield'
		   	  	  		},
						hidden:true
					},
					{
						header: '外币应付',
						dataIndex: 'wbyfje',
						width: 110,
						xtype: 'numbercolumn',
						summaryType: 'sum',
						summaryRenderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					},
					{
						header: '本期外币',
						dataIndex: 'wbbqyf',
						width: 110,
						xtype: 'numbercolumn',
						summaryType: 'sum',
						editor: {},
						summaryRenderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					},
					{
						header: '备注说明',
						dataIndex: 'bzsm',
						width: 110,
						editor: {}
					}],
					store: me.cpStore,
					plugins: Ext.create('Ext.grid.plugin.CellEditing', {
						clicksToEdit: 1,
						autoCancel: false,
						itemId: 'cellEditing'
					}),
					listeners: {
						selectionchange: function(grid, rec) {
							if (rec.length > 0) {
								me.down('#btn_cp_del').setDisabled(false);
							} else {
								me.down('#btn_cp_del').setDisabled(true);
							}
						}
					}
				}]
			}]
		});
		me.callParent(arguments);

	},
	csmcCallback: function(view, rec, recs) {
		var me = this;
		var grid = me.down('#grdPayPlan');
		var srec = grid.getSelectionModel().getSelection()[0];
		var store = grid.getStore();
		var form = me.down('#P1Form');
		srec.set('csbh', rec.get('csbh'));
		srec.set('csmc', rec.get('csmc'));
		srec.set('wbbh', rec.get('wbbh'));
		srec.set('wbdh', rec.get('wbdh'));//可以改变grdPayPlan中wbdh这一列的值
	},
	//加载数据,页面初始化
	loadData: function(rec, cp_rec) {
		var me = this;
		var p1form = me.down('#P1Form');
		var cpStore = me.cpStore;
		p1form.loadRecord(rec);
		var grid_detail = me.down('#grdPayPlan');
		var maxxh = cpStore.max('jhxh');
		maxxh = Ext.isEmpty(maxxh) ? 1 : (maxxh + 1);
		var wbbj =rec.get('wbbj');
		var fpje;
		var wbbqyf;
		var wbyfje;
		if(wbbj==0){
			fpje=cp_rec.get('fpyfye');					
		}else{
			fpje=cp_rec.get('wbfpyfye');
			wbbqyf = cp_rec.get('wbfpyfye');
			wbyfje = cp_rec.get('wbfpyfze'); 
		}
		var wbbh = cp_rec.get('wbbh');
        var wbdh = erp.Const.callServiceMethodSync('manufacturer/util.act?method=getWbdh',{wbbh:wbbh});
		var newrec = Ext.create('erp.master.manufacturer.model.CreatePayPlanGrid', {
			jhbh: rec.get('jhbh'),
			jhxh: maxxh,
			csbh: cp_rec.get('csbh'),
			csmc: cp_rec.get('csmc'),
			wbbh: wbbh,
			wbdh: wbdh,
			yfje: cp_rec.get('fpyfze'),
			bqyf: cp_rec.get('fpyfye'),
//			zfje: cp_rec.get('zfje'),
			wbyfje: wbyfje,
			wbbqyf: wbbqyf,
			wbzfje: cp_rec.get('wbzfje'),
			fpje: fpje,
			fkje: cp_rec.get('fkje'),
			bzsm: " "
		});
		newrec.phantom = true;
		cpStore.add(newrec);
		me.cpStore.loadRecords(newrec);
	}
});