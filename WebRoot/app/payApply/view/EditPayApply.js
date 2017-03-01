Ext.define('erp.payApply.view.EditPayApply', {
	extend : 'erp.ux.Panel',
	alias : 'widget.edt_PayApply',
	requires : ['erp.ux.SearchCombobox', 'erp.ux.ComboxTree','erp.ux.CommonTrigger','erp.common.basic.view.field.HelpField',
	            'erp.view.master.purchaseDetail.store.MainUnit','erp.view.master.purchaseDetail.window.MateCombo',
	            'erp.payApply.store.ZtdwPayApply',
			'erp.ux.SelectField'],
	layout : {
		type : 'border'
	},
	listeners:{
	close:function(panel){
		//为避免界面关闭时 close 时 不触发销毁方法在关闭时主动销毁界面
		if(panel){
			panel.destroy();
		}
	 }
	},
	title : '付款申请单编辑',
	initComponent : function() {
		var me = this;
		me.isinit=me.isAdd;
		me.MainUnitStore=Ext.create('erp.view.master.purchaseDetail.store.MainUnit');
		me.MainUnitStore.load();
		me.wbStore=Ext.create('erp.payApply.store.ZtdwPayApply');
		me.wbStore.load();
		me.skStore=Ext.create('erp.payApply.store.Skdw');
		me.skStore.load();
		me.dStore = Ext.create('erp.payApply.store.PayApply');
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
		me.csStore = Ext.create('erp.master.prematerial.store.Companyname');
		Ext.apply(me, {
			dockedItems : [{
						xtype : 'toolbar',
						dock : 'top',
						itemId : 'EdtPayApplyBar',
						items : [{
									text : '导入',
									iconCls : 'page_go',
									itemId : 'imp'
								}, {
									text : '合同明细查询',
									iconCls : '',
									itemId : 'imp_search'
								}, {
									text : '删除',
									iconCls : 'page_delete',
									itemId : 'imp_delete',
									disabled : me.save_enabled
								}, {
									text : '保存',
									iconCls : 'save',
									xtype : 'button',
									itemId : 'imp_BTN',
									disabled : me.save_enabled
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
				xtype : 'form',
				reference : 'EdtPayApplyForm',
				itemId : 'EdtPayApplyForm',
				store : me.dStore,
				flex : 1,
//				minHeight : 350,
//				height : 0.4 * window.screen.height,
				overflowY: 'auto',
				overflowX: 'auto',
				items : [{
					xtype : 'fieldset',
					layout : 'column',
					collapsible : false,
					defaults : {
						anchor : '90%',
						padding : '2,0,2,0',
						labelWidth : 70
					},
					margin : 10,
					padding : 5,
					defaultType : 'textfield',
					items : [{
								fieldLabel : '申请编号',
								itemId : 'sqbh',
								name : 'sqbh',
								columnWidth : 0.2,
								readOnly : true,
								fieldStyle : 'background:#E6E6E6'
							}, {
							    fieldLabel : '业务类型',
							    itemId : 'ywlx',
								name : 'ywlx',
								columnWidth : 0.2,
								xtype : 'combo',
								readOnly : !me.canedit,
								store : [['0', '软面外协类'], ['1', '喷涂外协加工类'],
										['2', '佣金类'], ['3', '其他类']]
							}, {
								fieldLabel : '数据来源',
								itemId : 'sjly',
								name : 'sjly',
								columnWidth : 0.2,
								xtype : 'combo',
								readOnly : !me.canedit,
								store : [['供应发票', '供应发票'], ['采购合同', '采购合同'],
										['销售费用', '销售费用'], ['采购费用', '采购费用'],
										['费用报销', '费用报销'], ['职工工资', '职工工资']],
								listeners : {
									'select' : function() {
										if (this.getRawValue() == '供应发票') {
											me.down('#imp_search').disable();
											me.down('#payapplyPL').removeAll();
											me.down('#payapplyPL').add({
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
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
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
														dataIndex : 'bmmc',
														width : 100
													}, {
														header : '开票日期',
														dataIndex : 'kprq',
														xtype : 'datecolumn',
														format : 'Y-m-d',
														width : 100
													}, {
														header : '记账日期',
														dataIndex : 'jzrq',
														xtype : 'datecolumn',
														format : 'Y-m-d',
														width : 100
													}, {
														header : '发票金额',
														dataIndex : 'fpje',
														width : 100,
														summaryType : 'sum',
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														},
														renderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														}
													}, {
														header : '币种',
														dataIndex : 'wbdh',
														width : 50
													}, {
														header : '汇率',
														dataIndex : 'wbhl',
														width : 80
													}, {
														header : '外币金额',
														dataIndex : 'wbje',
														width : 100,
														editor : {},
														summaryType : 'sum',
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														},
														renderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														}
													}, {
														header : '申请金额',
														dataIndex : 'sqje',
														width : 100,
														editor : {},
														summaryType : 'sum',
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														},
														renderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														}
													}, {
														header : '外币申请',
														dataIndex : 'wbsq',
														width : 100,
														editor : {},
														summaryType : 'sum',
														summaryRenderer : function(value, summaryData,
														dataIndex) {
														return Ext.util.Format.number(value, '0,000.00');
														},
														renderer : function(value, summaryData, dataIndex) {
														return Ext.util.Format.number(value, '0,000.00');
														}
													}],
													plugins : Ext.create('Ext.grid.plugin.CellEditing', {
													clicksToEdit : 1,
													editable : !me.canedit,
													autoCancel : false,
													itemId : 'cellEditing',
													listeners : {
													   'afteredit' : function(editor,e){
														var len = me.gyfpStore.getCount();									
														var wbhl = me.down('#wbhl').getValue();
						                        		if(wbhl=='' || wbhl==null){
						                        		   wbhl = 0;
						                        		}                        		
														var sum_sqje = 0;
														var sum_wbje = 0;
														for(var i = 0; i < len; i++){
															rec = me.gyfpStore.getAt(i);
															if(e.field=='sqje'){
															if(wbhl != 0 && (rec.get('sqje')==e.value && rec.get('sqje') != e.originalValue)){										
															 rec.set('wbsq',Ext.util.Format.round(rec.get('sqje')/wbhl,2));
															}else if(wbhl == 0 && (rec.get('sqje')==e.value && rec.get('sqje') != e.originalValue)){							
															 rec.set('wbsq',0);						    
															}
															sum_sqje = sum_sqje + rec.get('sqje');
															sum_wbje = sum_wbje + rec.get('wbsq');
															me.down('#sqje').setValue(sum_sqje);
															me.down('#wbje').setValue(sum_wbje);
														  }
														  
														  if(e.field=='wbsq'){
														  if(rec.get('wbsq')==e.value && rec.get('wbsq') != e.originalValue){	
														     rec.set('sqje',Ext.util.Format.round(rec.get('wbsq')*wbhl,2));
														  	}
														  sum_sqje = sum_sqje + rec.get('sqje');
														  sum_wbje = sum_wbje + rec.get('wbsq');
														  me.down('#sqje').setValue(sum_sqje);
														  me.down('#wbje').setValue(sum_wbje);
														  }
														}									
						                       		 }
						                  		   }
													}),
													store : me.gyfpStore													
												}]
											});
										}
										if (this.getRawValue() == '采购合同') {
											me.down('#imp_search').enable();
											me.down('#payapplyPL').removeAll();
											me.down('#payapplyPL').add({
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
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return '合计';
														}
													}, {
														header : '核算部门',
														dataIndex : 'bmmc',
														width : 100
													}, {
														header : '合同编号',
														dataIndex : 'htbh',
														width : 100
													}, {
														header : '合同金额',
														dataIndex : 'htze',
														width : 100,
														summaryType : 'sum',
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														},
														renderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														}
													}, {
														header : '申请金额',
														dataIndex : 'sqje',
														width : 100,
														editor : {															
														},
														summaryType : 'sum',
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														},
														renderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														}
													}, {
														header : '外币总额',
														dataIndex : 'wbze',
														width : 100,
														summaryType : 'sum',
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														},
														renderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														}
													}, {
														header : '外币金额',
														dataIndex : 'wbje',
														width : 100,
														editor : {},
														summaryType : 'sum',
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														},
														renderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														}
													}],
													plugins : Ext.create('Ext.grid.plugin.CellEditing', {
													clicksToEdit : 1,
													editable : !me.canedit,
													autoCancel : false,
													itemId : 'cellEditing',
													listeners : {
													   'afteredit' : function(editor,e){
														var len = me.cghtStore.getCount();									
														var wbhl = me.down('#wbhl').getValue();
						                        		if(wbhl=='' || wbhl==null){
						                        		   wbhl = 0;
						                        		}                        		
														var sum_sqje = 0;
														var sum_wbje = 0;
														for(var i = 0; i < len; i++){
															rec = me.cghtStore.getAt(i);
															if(e.field=='sqje'){
															if(wbhl != 0 && (rec.get('sqje')==e.value && rec.get('sqje') != e.originalValue)){										
															 rec.set('wbje',Ext.util.Format.round(rec.get('sqje')/wbhl,2));
															}else if(wbhl == 0 && (rec.get('sqje')==e.value && rec.get('sqje') != e.originalValue)){							
															 rec.set('wbje',0);						    
															}
															sum_sqje = sum_sqje + rec.get('sqje');
															sum_wbje = sum_wbje + rec.get('wbje');
															me.down('#sqje').setValue(sum_sqje);
															me.down('#wbje').setValue(sum_wbje);
														  }
														  
														  if(e.field=='wbje'){
														  if(rec.get('wbje')==e.value && rec.get('wbje') != e.originalValue){	
														     rec.set('sqje',Ext.util.Format.round(rec.get('wbje')*wbhl,2));
														  	}
														  sum_sqje = sum_sqje + rec.get('sqje');
														  sum_wbje = sum_wbje + rec.get('wbje');
														  me.down('#sqje').setValue(sum_sqje);
														  me.down('#wbje').setValue(sum_wbje);
														  }
														}									
						                       		 }
						                  		   }													 
													}),
													
													store : me.cghtStore
												}]
											});
										}
										if (this.getRawValue() == '销售费用') {
											me.down('#imp_search').disable();
											me.down('#payapplyPL').removeAll();
											me.down('#payapplyPL').add({
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
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return '合计';
														}
													}, {
														header : '核算部门',
														dataIndex : 'bmmc',
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
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														},
														renderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														}
													}, {
														header : '申请金额',
														dataIndex : 'sqje',
														width : 100,
														editor : {},
														summaryType : 'sum',
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														},
														renderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														}
													}, {
														header : '币种',
														dataIndex : 'wbdh',
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
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														},
														renderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														}
													}, {
														header : '外币申请',
														dataIndex : 'wbsq',
														width : 100,
														editor : {},
														summaryType : 'sum',
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														},
														renderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														}
													}],
													plugins : Ext.create('Ext.grid.plugin.CellEditing', {
													clicksToEdit : 1,
													editable : !me.canedit,
													autoCancel : false,
													itemId : 'cellEditing',
													listeners : {
													   'afteredit' : function(editor,e){
														var len = me.xsfyStore.getCount();									
														var wbhl = me.down('#wbhl').getValue();
						                        		if(wbhl=='' || wbhl==null){
						                        		   wbhl = 0;
						                        		}                        		
														var sum_sqje = 0;
														var sum_wbje = 0;
														for(var i = 0; i < len; i++){
															rec = me.xsfyStore.getAt(i);
															if(e.field=='sqje'){
															if(wbhl != 0 && (rec.get('sqje')==e.value && rec.get('sqje') != e.originalValue)){										
															 rec.set('wbsq',Ext.util.Format.round(rec.get('sqje')/wbhl,2));
															}else if(wbhl == 0 && (rec.get('sqje')==e.value && rec.get('sqje') != e.originalValue)){							
															 rec.set('wbsq',0);						    
															}
															sum_sqje = sum_sqje + rec.get('sqje');
															sum_wbje = sum_wbje + rec.get('wbsq');
														  }
														  
														  if(e.field=='wbsq'){
														  if(rec.get('wbsq')==e.value && rec.get('wbsq') != e.originalValue){	
														     rec.set('sqje',Ext.util.Format.round(rec.get('wbsq')*wbhl,2));
														  	}
														  sum_sqje = sum_sqje + rec.get('sqje');
														  sum_wbje = sum_wbje + rec.get('wbsq');
														  }
														}		
														me.down('#sqje').setValue(Ext.util.Format.round(sum_sqje,2));
														me.down('#wbje').setValue(Ext.util.Format.round(sum_wbje,2));
						                       		 }
						                  		   }
													}),
													store : me.xsfyStore
												}]
											});
										}
										if (this.getRawValue() == '采购费用') {
											me.down('#imp_search').disable();
											me.down('#payapplyPL').removeAll();
											me.down('#payapplyPL').add({
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
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return '合计';
														}
													}, {
														header : '核算部门',
														dataIndex : 'bmmc',
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
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														},
														renderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														}
													}, {
														header : '申请金额',
														dataIndex : 'sqje',
														width : 100,
														editor : {},
														summaryType : 'sum',
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														},
														renderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														}
													}, {
														header : '已付金额',
														dataIndex : 'yfje',
														width : 100,
														summaryType : 'sum',
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														},
														renderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														}
													}, {
														header : '币种',
														dataIndex : 'wbdh',
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
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														},
														renderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														}
													}, {
														header : '外币申请',
														dataIndex : 'wbsq',
														width : 100,
														editor : {},
														summaryType : 'sum',
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														},
														renderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														}
													}],
													plugins : Ext.create('Ext.grid.plugin.CellEditing', {
													clicksToEdit : 1,
													editable : !me.canedit,
													autoCancel : false,
													itemId : 'cellEditing',
													listeners : {
														'beforeedit' : function(editor,e,eOpts){
														 var wbbh = e.record.get('wbbh');
															if( (wbbh == null|| Ext.String.trim(wbbh) == '' || wbbh == '60') && e.field=='wbsq'){
															  var ret = false;
															  return ret;
															 }
															
														},
														'afteredit' : function(editor,e){
														var len = me.cgfyStore.getCount();									
														var wbhl = me.down('#wbhl').getValue();
						                        		if(wbhl=='' || wbhl==null){
						                        		   wbhl = 0;
						                        		}                        		
														var sum_sqje = 0;
														var sum_wbje = 0;
														for(var i = 0; i < len; i++){
															rec = me.cgfyStore.getAt(i);
															if(e.field=='sqje'){
															if(wbhl != 0 && (rec.get('sqje')==e.value && rec.get('sqje') != e.originalValue)){										
															 rec.set('wbsq',Ext.util.Format.round(rec.get('sqje')/wbhl,2));
															}else if(wbhl == 0 && (rec.get('sqje')==e.value && rec.get('sqje') != e.originalValue)){							
															 rec.set('wbsq',0);						    
															}
															sum_sqje = sum_sqje + rec.get('sqje');
															sum_wbje = sum_wbje + rec.get('wbsq');
														  }
														  
														  if(e.field=='wbsq'){
														  if(rec.get('wbsq')==e.value && rec.get('wbsq') != e.originalValue){	
														     rec.set('sqje',Ext.util.Format.round(rec.get('wbsq')*wbhl,2));
														  	}
														  sum_sqje = sum_sqje + rec.get('sqje');
														  sum_wbje = sum_wbje + rec.get('wbsq');
														  }
														}		
														me.down('#sqje').setValue(Ext.util.Format.round(sum_sqje,2));
														me.down('#wbje').setValue(Ext.util.Format.round(sum_wbje,2));
						                       		 }
						                  		     }
													}),
													store : me.cgfyStore
												}]
											});
										}
										if (this.getRawValue() == '费用报销') {
											me.down('#imp_search').disable();
											me.down('#payapplyPL').removeAll();
											me.down('#payapplyPL').add({
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
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return '合计';
														}
													}, {
														header : '核算部门',
														dataIndex : 'bmmc',
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
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														},
														renderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														}
													}, {
														header : '申请金额',
														dataIndex : 'sqje',
														width : 100,
														editor : {},
														summaryType : 'sum',
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														},
														renderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														}
													}, {
														header : '币种',
														dataIndex : 'wbdh',
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
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														},
														renderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														}
													}, {
														header : '外币申请',
														dataIndex : 'wbsq',
														width : 100,
														editor : {},
														summaryType : 'sum',
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														},
														renderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														}
													}],
													plugins : Ext.create('Ext.grid.plugin.CellEditing', {
													clicksToEdit : 1,
													editable : !me.canedit,
													autoCancel : false,
													itemId : 'cellEditing',
													listeners : {
													   'afteredit' : function(editor,e){
														var len = me.fybxStore.getCount();									
														var wbhl = me.down('#wbhl').getValue();
						                        		if(wbhl=='' || wbhl==null){
						                        		   wbhl = 0;
						                        		}                        		
														var sum_sqje = 0;
														var sum_wbje = 0;
														for(var i = 0; i < len; i++){
															rec = me.fybxStore.getAt(i);
															if(e.field=='sqje'){
															if(wbhl != 0 && (rec.get('sqje')==e.value && rec.get('sqje') != e.originalValue)){										
															 rec.set('wbje',Ext.util.Format.round(rec.get('sqje')/wbhl,2));
															}else if(wbhl == 0 && (rec.get('sqje')==e.value && rec.get('sqje') != e.originalValue)){							
															 rec.set('wbje',0);						    
															}
															sum_sqje = sum_sqje + rec.get('sqje');
															sum_wbje = sum_wbje + rec.get('wbsq');
														  }
														  
														  if(e.field=='wbsq'){
														  if(rec.get('wbsq')==e.value && rec.get('wbsq') != e.originalValue){	
														     rec.set('wbje',Ext.util.Format.round(rec.get('wbje')*wbhl,2));
														  	}
														  sum_sqje = sum_sqje + rec.get('sqje');
														  sum_wbje = sum_wbje + rec.get('wbsq');
														  }
														}		
														me.down('#sqje').setValue(Ext.util.Format.round(sum_sqje,2));
														me.down('#wbje').setValue(Ext.util.Format.round(sum_wbje,2));
						                       		 }
						                  		   }
//													listeners : {
//													   'afteredit' : function(editor,e){
//														var len = me.fybxStore.getCount();														
//														var sum_sqje = 0;
//														for(var i = 0; i < len; i++){
//															rec = me.fybxStore.getAt(i);
//															sum_sqje = sum_sqje + rec.get('sqje');
//														}									
//						                        		if(e.field=='sqje'){
//						                        		 me.down('#sqje').setValue(sum_sqje);
//						                        		}
//						                        		var sum_wbje = 0;
//						                        		for(var i = 0; i < len; i++){
//						                        			rec = me.fybxStore.getAt(i);
//															sum_wbje = sum_wbje + rec.get('wbsq');
//														}									
//						                        		if(e.field=='wbsq'){
//						                        		 me.down('#wbje').setValue(sum_wbje);
//						                        		}
//						                       		  }
//						                  		     }
													}),		
													store : me.fybxStore
												}]
											});
										}
										if (this.getRawValue() == '职工工资') {
											me.down('#imp_search').disable();
											me.down('#payapplyPL').removeAll();
											me.down('#payapplyPL').add({
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
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return '合计';
														}
													}, {
														header : '核算部门',
														dataIndex : 'bmmc',
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
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														},
														renderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														}
													}, {
														header : '申请金额',
														dataIndex : 'sqje',
														width : 100,
														editor : {},
														summaryType : 'sum',
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														},
														renderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
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
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														},
														renderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														}
													}, {
														header : '外币申请',
														dataIndex : 'wbsq',
														width : 100,
														editor : {},
														summaryType : 'sum',
														summaryRenderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														},
														renderer : function(
																value,
																summaryData,
																dataIndex) {
															return Ext.util.Format
																	.number(
																			value,
																			'0,000.00');
														}
													}],
													plugins : Ext.create('Ext.grid.plugin.CellEditing', {
													clicksToEdit : 1,
													editable : !me.canedit,
													autoCancel : false,
													itemId : 'cellEditing',
													listeners : {
													   'afteredit' : function(editor,e){
														var len = me.zggzStore.getCount();														
														var sum_sqje = 0;
														for(var i = 0; i < len; i++){
															rec = me.zggzStore.getAt(i);
															sum_sqje = sum_sqje + rec.get('sqje');
														}									
						                        		if(e.field=='sqje'){
						                        		 me.down('#sqje').setValue(sum_sqje);
						                        		}
						                        		var sum_wbje = 0;
						                        		for(var i = 0; i < len; i++){
						                        			rec = me.zggzStore.getAt(i);
															sum_wbje = sum_wbje + rec.get('wbsq');
														}									
						                        		if(e.field=='wbsq'){
						                        		 me.down('#wbje').setValue(sum_wbje);
						                        		}
						                       		  }
						                  		     }
													}),
													store : me.zggzStore
												}]
											});
										}
										me.down('#payapplyPL').items.items[0].items.items[0].getStore().load({
											params : {
												sqbh : me.down('#sqbh').getValue()
											}
										});
									}
								}
							}, {
								xtype : 'datefield',
								fieldLabel : '申请日期',
								format : 'Y-m-d',
//								value : me.s_date,
								itemId : 'sqrq',
								name : 'sqrq',
								columnWidth : 0.2,
								readOnly : !me.canedit
							},{
								fieldLabel : '申请人',
								itemId : 'sqrm',
								name : 'sqrm',
								columnWidth : 0.2
							}, {
								fieldLabel : '申请部门',
								itemId : 'sqbmbh',
								name : 'sqbmbh',
								xtype:'comboxTree',
	    						queryMode : 'local',
	    						store : Ext.create('erp.payApply.store.ApplayDepartmentTree'),
	    						displayField : 'text',
	    					    valueField: 'nodeId',
								columnWidth : 0.2
							},{
								fieldLabel : '申请金额',
								itemId : 'sqje',
								name : 'sqje',
								readOnly : true,
								columnWidth : 0.2
							}, {
								fieldLabel : '币种',
								itemId : 'wbbh',
								name : 'wbbh',
								readOnly : true,
								columnWidth : 0.2,
								typeAhead:true,
								xtype:'combo',
								queryMode : 'local',
								displayField:'wbdh',
								valueField:'wbbh',
								selectOnFocus:true,
								store:me.wbStore,
								fieldConfig:{forceSelection:true},
								listeners:{
								   	'select':function(obj,recs){
								   	}
								}						
							}, {
								fieldLabel : '汇率',
								itemId : 'wbhl',
								name : 'wbhl',
								readOnly : true,
								columnWidth : 0.2
							}, {
								fieldLabel : '外币金额',
								itemId : 'wbje',
								name : 'wbje',
								readOnly : true,
								columnWidth : 0.2
							},{
								fieldLabel : '还贷',
								itemId : 'hdbj',
								name : 'hdbj',
								xtype : 'checkbox',
								columnWidth : 0.1,
								listeners : {
									change : function(field,newValue,oldValue,eOpts){
										var csbh = me.down('#csbh').getValue();
										var csmc = erp.Const.callServiceMethodSync('payapply/payapply.act?method=getCsmc',{csbh:csbh});
										if(csmc==null){
											csmc='';
										}
										if(newValue==true && csmc!=''){
											var list_hddw = erp.Const.callServiceMethodSync('payapply/payapply.act?method=getHddw',{csbh:csbh});
											var data = Ext.decode(list_hddw);
												var hddw;
												var hddwmc;
												if(data.bool){
													hddw = Ext.decode(list_hddw).csbh;
													hddwmc = Ext.decode(list_hddw).csmc;
												}else{
													hddw = '';
													hddwmc = '';													
												}												
											if(hddw==''||hddw==null){
												hddw = csbh;
												hddwmc = csmc;
											}
										}else{
											hddw = csbh;
											hddwmc = csmc;
										}
										//TODO
										me.down('#skdw').setValue(hddw);
										me.down('#skdwmc').setValue(hddwmc);
									}
								}
							}, {
								fieldLabel : '预付款',
								itemId : 'yfkbj',
								name : 'yfkbj',
								xtype : 'checkbox',
								columnWidth : 0.1															
							},{
					  			fieldLabel:'供货厂商',
					  			itemId:'csbh',
					  			name:'csbh',
					  			xtype:'helpField',
					  			allowBlank:false,
								code : erp.DataConst.FACTORYINFO,
								fieldConfig:{forceSelection:true},
								columnWidth: .2,
								listeners:{
									change :function(o,  newValue,  oldValue,  eOpts){
										if(o.displayTplData!=null){
											var data=o.displayTplData;
//											me.isinit=true; 
											var hdbj = me.down('#hdbj').getValue();											
											if(data.length>0){
												var rec=data[0];
												var list_hddw = erp.Const.callServiceMethodSync('payapply/payapply.act?method=getHddw',{csbh:rec.csbh});
												var data = Ext.decode(list_hddw);
												var hddw;
												var hddwmc;
												if(data.bool){
													hddw = Ext.decode(list_hddw).csbh;
													hddwmc = Ext.decode(list_hddw).csmc;
												}else{
													hddw = '';
													hddwmc = '';													
												}												
												if(hddw=='' || hddw==null){
													hddw=rec.csbh;
													hddwmc = rec.csmc
												}
												
												var date = new Date();
												var nf = date.getYear()+1900;
												var month = date.getMonth()+1;
												var wbhl = erp.Const.callServiceMethodSync('payapply/manufacturer.act?method=getWbhl',{year:nf,month:month,wbbh:rec.wbbh});												
												
												if(me.isinit){
													if(hdbj==true){
													me.down('#skdw').setValue(hddw);
													me.down('#skdwmc').setValue(hddwmc);
													}else{
														me.down('#skdw').setValue(rec.csbh);
														me.down('#skdwmc').setValue(rec.csmc);
													}
												me.down('#wbbh').setValue(rec.wbbh);
												me.down('#wbhl').setValue(rec.wbhl);
												me.down('#khyh').setValue(rec.khyh);
												me.down('#cszh').setValue(rec.cszh);
												me.down('#fktj').setValue(rec.fktj);
												me.down('#fkts').setValue(rec.fkts);
//												me.down('#ztmc').setRawValue(rec.ztmc);
												me.down('#ztdw').setValue(rec.ztdw);
												}																																				
												var sjly = me.down('#sjly').getValue();
												//厂商切换，原明细清空
											    if(me.isAdd){
											    	
											    //厂商切换，原申请金额清空
												me.down('#sqje').setValue(0.00);
												//厂商切换，原外币金额清空
												me.down('#wbje').setValue(0.00);
												switch (sjly) {
												 case '供应发票' :
												 me.gyfpStore.removeAll();
												 break;
												 case '采购合同' :
												 me.cghtStore.removeAll();
												 break;
												 case '销售费用' :
												 me.xsfyStore.removeAll();
												 break;
												 case '采购费用' :
												 me.cgfyStore.removeAll();
												 break;
												 case '费用报销' :
												 me.fybxStore.removeAll();
												 break;
												 case '职工工资' :
												 me.zggzStore.removeAll();
												 break;
												}
											    }
											}
										}
										me.isinit=true;
				                    }
								}
					  		},{
								fieldLabel : '收款单位',
								itemId : 'skdw',
								name : 'skdw',
								columnWidth : 0,
								hidden:true
							},{
								fieldLabel : '收款单位',
								itemId : 'skdwmc',
								name : 'skdwmc',
								columnWidth : 0.2,
								readOnly : true
							},{
								fieldLabel : '付款条件',
								itemId : 'fktj',
								name : 'fktj',
								readOnly : true,
								columnWidth : 0.2
							},{
								fieldLabel : '开户银行',
								itemId : 'khyh',
								name : 'khyh',
								readOnly : true,
								columnWidth : 0.2
							}, {
								fieldLabel : '银行账户',
								itemId : 'cszh',
								name : 'cszh',
								readOnly : true,
								columnWidth : 0.2
							}, {
								fieldLabel : '付款方式',
								itemId : 'fkfs',
								name : 'fkfs',
								xtype: 'combo',
								store: Ext.create('erp.payApply.store.Sysmjb',{autoLoad: true}),
								displayField : 'fkfs',
	    					    valueField: 'mjxl',
								columnWidth : 0.2
							}, {
								fieldLabel : '付款期限',
								itemId : 'fkqx',
								name : 'fkqx',
								xtype : 'datefield',
								format : 'Y-m-d',
								columnWidth : 0.2
							}, {
								fieldLabel : '付款天数',
								itemId : 'fkts',
								name : 'fkts',
								readOnly : true,
								columnWidth : 0.2
							},{
								fieldLabel : '主体单位',
								itemId : 'ztdw',
								name : 'ztdw',
								columnWidth : 0.2,
								typeAhead:true,
//								readOnly : true,
								xtype:'combo',
								queryMode : 'local',
								displayField:'ztmc',
								valueField:'ztbh',
								selectOnFocus:true,
								store:me.MainUnitStore,
								fieldConfig:{forceSelection:true},
								listeners:{
								   	'select':function(obj,recs){
								   	}
								}								
							},{
								fieldLabel : '用途摘要',
								itemId : 'yotu',
								name : 'yotu',
								columnWidth : 1,
								maxLength : 40,
								maxLengthText : '最大输入40个字节',
								listeners : {
									change : function(f,newValue,oldValue){
										var sum = 0;
									    for ( var i = 0; i < newValue.length; i++) {
									        var c = newValue.charCodeAt(i);
									        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
									            sum++;
									        } else {
									            sum += 2;
									        }
									    }
										if(sum>40){
										Ext.Msg.alert('提示','用途摘要总字节数不能超过40个(汉字算2个)');
										return;
										}
									}
//								 validitychange : function(e,isValid,eOpts ){								 	
//								 	if(isValid==false){
//								 	 var yotu = e.lastValue;
//								 	 var s_yotu = yotu.substring(0,40);
//								 	 me.down('#yotu').setValue(s_yotu);
//								 	}
//								 }
								}
							},{
								fieldLabel : '备注说明',
								itemId : 'bzsm',
								name : 'bzsm',
								columnWidth : 1,
								maxLength : 250,
								maxLengthText : '最大输入250个字节',
								listeners : {
								 change : function(f,newValue,oldValue){
											var sum = 0;
										    for ( var i = 0; i < newValue.length; i++) {
										        var c = newValue.charCodeAt(i);
										        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
										            sum++;
										        } else {
										            sum += 2;
										        }
										    }
											if(sum>250){
											Ext.Msg.alert('提示','备注说明总字节数不能超过250个(汉字算2个)');
											return;
											}
									}
//								 validitychange : function(e,isValid,eOpts ){								 	
//								 	if(isValid==false){
//								 	 var bzsm = e.lastValue;
//								 	 var s_bzsm = bzsm.substring(0,250);
//								 	 me.down('#bzsm').setValue(s_bzsm);
//								 	}
//								 }
								}
							}]
				}]
			}, {
				region : 'south',
				split : true,
				flex: 2.2,
//				height : 0.5 * window.screen.height,
				xtype : 'tabpanel',
				itemId : 'payapplyPL',
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
			}]
		});
		me.callParent(arguments);
	},
		csmcCallback : function(view, rec, recs) {
			var me = this;
			var form = me.down('#EdtPayApplyForm');
			var formrec=form.getRecord();
			formrec.set('csmc', rec.get('csmc'));
			formrec.set('csbh', rec.get('csbh'));
			formrec.set('yhbh', '恒丰皮革');
//			formrec.set('skdw', rec.get('csmc'));
			formrec.set('wbbh', rec.get('wbbh'));
			formrec.set('wbdh', rec.get('wbdh'));
			formrec.set('wbhl', rec.get('wbhl'));
			formrec.set('khyh', rec.get('khyh'));
			formrec.set('cszh', rec.get('cszh'));
			formrec.set('fktj', rec.get('fktj'));
			formrec.set('kfts', rec.get('kfts'));
			formrec.set('ztdw', rec.get('ztdw'));
//			formrec.set('ztmc', rec.get('ztmc'));
			form.loadRecord(formrec);
		},
		loadSqbmStore:function(node){
		var me=this;
		if(node!=null && node!="" && node!=0){//加载树
			var picker=me.down('#sqbmbh').getPicker();
			picker.expandAll();//展开所有，加载所有
		}
	 },
	Checkstrlenght : function(chars){
	    var sum = 0;
	    for ( var i = 0; i < chars.length; i++) {
	        var c = chars.charCodeAt(i);
	        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
	            sum++;
	        } else {
	            sum += 2;
	        }
	    }
    return sum;
	},
	LoadData : function(rec, isAdd, s_isEdit, canedit,editor_readonly) {
		var me = this;
		me.loadSqbmStore(rec.get('sqbmbh'));
		me.down('#EdtPayApplyForm').loadRecord(rec);
		if (rec.get('sjly') == '供应发票') {
			me.down('#imp_search').disable();
			me.down('#payapplyPL').removeAll();
			me.down('#payapplyPL').add({
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
					selModel : Ext.create('Ext.selection.CheckboxModel'),
					columns : [{
						header : '序号',
						dataIndex : 'sqxh',
						width : 60,
						sumaryType : 'count',
						summaryRenderer : function(value, summaryData,
								dataIndex) {
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
						dataIndex : 'bmmc',
						width : 100
					}, {
						header : '开票日期',
						dataIndex : 'kprq',
						xtype : 'datecolumn',
						format : 'Y-m-d',
						width : 100
					}, {
						header : '记账日期',
						dataIndex : 'jzrq',
						xtype : 'datecolumn',
						format : 'Y-m-d',
						width : 100
					}, {
						header : '发票金额',
						dataIndex : 'fpje',
						width : 100,
						summaryType : 'sum',
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer : function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					}, {
						header : '币种',
						dataIndex : 'wbdh',
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
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer : function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					}, {
						header : '申请金额',
						dataIndex : 'sqje',
						width : 100,
						editor : {disabled : editor_readonly},
						summaryType : 'sum',
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer : function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					}, {
						header : '外币申请',						
						dataIndex : 'wbsq',
						width : 100,
						editor : {disabled : editor_readonly},
						summaryType : 'sum',
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer : function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					}],
					plugins : Ext.create('Ext.grid.plugin.CellEditing', {
							clicksToEdit : 1,
							editable : !me.canedit,
							autoCancel : false,
							itemId : 'cellEditing',
							listeners : {
							   'afteredit' : function(editor,e){
								var len = me.gyfpStore.getCount();									
								var wbhl = me.down('#wbhl').getValue();
                        		if(wbhl=='' || wbhl==null){
                        		   wbhl = 0;
                        		}                        		
								var sum_sqje = 0;
								var sum_wbje = 0;
								for(var i = 0; i < len; i++){
									rec = me.gyfpStore.getAt(i);
									if(e.field=='sqje'){
									if(wbhl != 0 && (rec.get('sqje')==e.value && rec.get('sqje') != e.originalValue)){										
									 rec.set('wbsq',Ext.util.Format.round(rec.get('sqje')/wbhl,2));
									}else if(wbhl == 0 && (rec.get('sqje')==e.value && rec.get('sqje') != e.originalValue)){							
									 rec.set('wbsq',0);						    
									}
									sum_sqje = sum_sqje + rec.get('sqje');
									sum_wbje = sum_wbje + rec.get('wbsq');
								  }
								  
								  if(e.field=='wbsq'){
								  if(rec.get('wbsq')==e.value && rec.get('wbsq') != e.originalValue){	
								     rec.set('sqje',Ext.util.Format.round(rec.get('wbsq')*wbhl,2));
								  	}
								  sum_sqje = sum_sqje + rec.get('sqje');
								  sum_wbje = sum_wbje + rec.get('wbsq');
								  }
								}		
								me.down('#sqje').setValue(Ext.util.Format.round(sum_sqje,2));
								me.down('#wbje').setValue(Ext.util.Format.round(sum_wbje,2));
                       		 }
                  		   }
						}),
					store : me.gyfpStore
				}]
			});
		}
		if (rec.get('sjly') == '采购合同') {
			me.down('#imp_search').enable();
			me.down('#payapplyPL').removeAll();
			me.down('#payapplyPL').add({
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
					selModel : Ext.create('Ext.selection.CheckboxModel'),
					columns : [{
						header : '序号',
						dataIndex : 'sqxh',
						width : 50,
						sumaryType : 'count',
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return '合计';
						}
					}, {
						header : '核算部门1',
						dataIndex : 'hsbm',
						width : 100,
						hidden : true
					}, {
						header : '核算部门',
						dataIndex : 'bmmc',
						width : 100
					}, {
						header : '合同编号',
						dataIndex : 'htbh',
						width : 100
					}, {
						header : '合同金额',
						dataIndex : 'htze',
						width : 100,
						summaryType : 'sum',
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer : function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					}, {
						header : '申请金额',
						dataIndex : 'sqje',
						width : 100,
						editor : {disabled : editor_readonly},
						summaryType : 'sum',
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer : function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}						
					}, {
						header : '外币总额',
						dataIndex : 'wbze',
						width : 100,
						summaryType : 'sum',
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer : function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					}, {
						header : '外币金额',
						dataIndex : 'wbje',
						width : 100,
						summaryType : 'sum',
						editor : {disabled : editor_readonly},
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer : function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					}],
					plugins : Ext.create('Ext.grid.plugin.CellEditing', {
							clicksToEdit : 1,
							editable : !me.canedit,
							autoCancel : false,
							itemId : 'cellEditing',
							/*编辑界面不允许编辑明细*/
							listeners : {
							   'afteredit' : function(editor,e){
								var len = me.cghtStore.getCount();									
								var wbhl = me.down('#wbhl').getValue();
                        		if(wbhl=='' || wbhl==null){
                        		   wbhl = 0;
                        		}                        		
								var sum_sqje = 0;
								var sum_wbje = 0;
								for(var i = 0; i < len; i++){
									rec = me.cghtStore.getAt(i);
									//rec.modified
									if(e.field=='sqje'){
									if(wbhl != 0 && (rec.get('sqje')==e.value && rec.get('sqje') != e.originalValue)){										
									 rec.set('wbje',Ext.util.Format.round(rec.get('sqje')/wbhl,2));
									}else if(wbhl == 0 && (rec.get('sqje')==e.value && rec.get('sqje') != e.originalValue)){
									 rec.set('wbje',0);
									}
									sum_sqje = sum_sqje + rec.get('sqje');
									sum_wbje = sum_wbje + rec.get('wbje');
									me.down('#sqje').setValue(sum_sqje);
									me.down('#wbje').setValue(sum_wbje);
								  }
								  
								  if(e.field=='wbje'){
								  if(rec.get('wbje')==e.value && rec.get('wbje') != e.originalValue){	
								     rec.set('sqje',Ext.util.Format.round(rec.get('wbje')*wbhl,2));
								  	}
								  sum_sqje = sum_sqje + rec.get('sqje');
								  sum_wbje = sum_wbje + rec.get('wbje');
								  me.down('#sqje').setValue(sum_sqje);
								  me.down('#wbje').setValue(sum_wbje);
								  }
								}									
                       		 }
                  		}
						}),
					store : me.cghtStore
				}]
			});
		}
		if (rec.get('sjly') == '销售费用') {
			me.down('#imp_search').disable();
			me.down('#payapplyPL').removeAll();
			me.down('#payapplyPL').add({
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
					selModel : Ext.create('Ext.selection.CheckboxModel'),
					columns : [{
						header : '序号',
						dataIndex : 'sqxh',
						width : 50,
						sumaryType : 'count',
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return '合计';
						}
					}, {
						header : '核算部门',
						dataIndex : 'bmmc',
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
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer : function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					}, {
						header : '申请金额',
						dataIndex : 'sqje',
						width : 100,
						editor : {disabled : editor_readonly},
						summaryType : 'sum',
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer : function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					}, {
						header : '币种',
						dataIndex : 'wbdh',
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
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer : function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					}, {
						header : '外币申请',
						dataIndex : 'wbsq',
						width : 100,
						editor : {disabled : editor_readonly},
						summaryType : 'sum',
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer : function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					}],
					plugins : Ext.create('Ext.grid.plugin.CellEditing', {
							clicksToEdit : 1,
							editable : !me.canedit,
							autoCancel : false,
							itemId : 'cellEditing',
							listeners : {
							   'afteredit' : function(editor,e){
								var len = me.xsfyStore.getCount();									
								var wbhl = me.down('#wbhl').getValue();
                        		if(wbhl=='' || wbhl==null){
                        		   wbhl = 0;
                        		}                        		
								var sum_sqje = 0;
								var sum_wbje = 0;
								for(var i = 0; i < len; i++){
									rec = me.xsfyStore.getAt(i);
									if(e.field=='sqje'){
									if(wbhl != 0 && (rec.get('sqje')==e.value && rec.get('sqje') != e.originalValue)){										
									 rec.set('wbsq',Ext.util.Format.round(rec.get('sqje')/wbhl,2));
									}else if(wbhl == 0 && (rec.get('sqje')==e.value && rec.get('sqje') != e.originalValue)){							
									 rec.set('wbsq',0);						    
									}
									sum_sqje = sum_sqje + rec.get('sqje');
									sum_wbje = sum_wbje + rec.get('wbsq');
								  }
								  
								  if(e.field=='wbsq'){
								  if(rec.get('wbsq')==e.value && rec.get('wbsq') != e.originalValue){	
								     rec.set('sqje',Ext.util.Format.round(rec.get('wbsq')*wbhl,2));
								  	}
								  sum_sqje = sum_sqje + rec.get('sqje');
								  sum_wbje = sum_wbje + rec.get('wbsq');
								  }
								}		
								me.down('#sqje').setValue(Ext.util.Format.round(sum_sqje,2));
								me.down('#wbje').setValue(Ext.util.Format.round(sum_wbje,2));
                       		 }
                  		   }
						}),
					store : me.xsfyStore
				}]
			});
		}
		if (rec.get('sjly') == '采购费用') {
			me.down('#imp_search').disable();
			me.down('#payapplyPL').removeAll();
			me.down('#payapplyPL').add({
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
					selModel : Ext.create('Ext.selection.CheckboxModel'),
					columns : [{
						header : '序号',
						dataIndex : 'sqxh',
						width : 50,
						sumaryType : 'count',
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return '合计';
						}
					}, {
						header : '核算部门',
						dataIndex : 'bmmc',
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
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer : function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					}, {
						header : '申请金额',
						dataIndex : 'sqje',
						width : 100,
						editor : {disabled : editor_readonly},
						summaryType : 'sum',
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer : function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					}, {
						header : '已付金额',
						dataIndex : 'yfje',
						width : 100,
						summaryType : 'sum',
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer : function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					}, {
						header : '币种',
						dataIndex : 'wbdh',
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
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer : function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					}, {
						header : '外币申请',
						dataIndex : 'wbsq',
						width : 100,
						editor : {},
						summaryType : 'sum',
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer : function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					}],
					plugins : Ext.create('Ext.grid.plugin.CellEditing', {
							clicksToEdit : 1,
							editable : !me.canedit,
							autoCancel : false,
							itemId : 'cellEditing',
							listeners : {
								'beforeedit' : function(editor,e,eOpts){
								 var wbbh = e.record.get('wbbh');
									if( (wbbh == null|| Ext.String.trim(wbbh) == '' || wbbh == '60') && e.field=='wbsq'){
									  var ret = false;
									  return ret;
									 }
									
								},
								'afteredit' : function(editor,e){
								var len = me.cgfyStore.getCount();									
								var wbhl = me.down('#wbhl').getValue();
                        		if(wbhl=='' || wbhl==null){
                        		   wbhl = 0;
                        		}                        		
								var sum_sqje = 0;
								var sum_wbje = 0;
								for(var i = 0; i < len; i++){
									rec = me.cgfyStore.getAt(i);
									if(e.field=='sqje'){
									if(wbhl != 0 && (rec.get('sqje')==e.value && rec.get('sqje') != e.originalValue)){										
									 rec.set('wbsq',Ext.util.Format.round(rec.get('sqje')/wbhl,2));
									}else if(wbhl == 0 && (rec.get('sqje')==e.value && rec.get('sqje') != e.originalValue)){							
									 rec.set('wbsq',0);						    
									}
									sum_sqje = sum_sqje + rec.get('sqje');
									sum_wbje = sum_wbje + rec.get('wbsq');
								  }
								  
								  if(e.field=='wbsq'){
								  if(rec.get('wbsq')==e.value && rec.get('wbsq') != e.originalValue){	
								     rec.set('sqje',Ext.util.Format.round(rec.get('wbsq')*wbhl,2));
								  	}
								  sum_sqje = sum_sqje + rec.get('sqje');
								  sum_wbje = sum_wbje + rec.get('wbsq');
								  }
								}		
								me.down('#sqje').setValue(Ext.util.Format.round(sum_sqje,2));
								me.down('#wbje').setValue(Ext.util.Format.round(sum_wbje,2));
                       		 }
                  		     }
//							listeners : {
//							   'afteredit' : function(editor,e){
//								var len = me.cgfyStore.getCount();														
//								var sum_sqje = 0;
//								for(var i = 0; i < len; i++){
//									rec = me.cgfyStore.getAt(i);
//									sum_sqje = sum_sqje + rec.get('sqje');
//								}									
//                        		if(e.field=='sqje'){
//                        		 me.down('#sqje').setValue(sum_sqje);
//                        		}
//                        		var sum_wbje = 0;
//                        		for(var i = 0; i < len; i++){
//                        			rec = me.cgfyStore.getAt(i);
//									sum_wbje = sum_wbje + rec.get('wbsq');
//								}									
//                        		if(e.field=='wbsq'){
//                        		 me.down('#wbje').setValue(sum_wbje);
//                        		}
//                       		 }
//                  		}
						}),
					store : me.cgfyStore
				}]
			});
		}
		if (rec.get('sjly') == '费用报销') {
			me.down('#imp_search').disable();
			me.down('#payapplyPL').removeAll();
			me.down('#payapplyPL').add({
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
					selModel : Ext.create('Ext.selection.CheckboxModel'),
					columns : [{
						header : '序号',
						dataIndex : 'sqxh',
						width : 50,
						sumaryType : 'count',
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return '合计';
						}
					}, {
						header : '核算部门',
						dataIndex : 'bmmc',
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
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer : function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					}, {
						header : '申请金额',
						dataIndex : 'sqje',
						width : 100,
						editor : {disabled : editor_readonly},
						summaryType : 'sum',
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer : function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					}, {
						header : '币种',
						dataIndex : 'wbdh',
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
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer : function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					}, {
						header : '外币申请',
						dataIndex : 'wbsq',
						width : 100,
						editor : {disabled : editor_readonly},
						summaryType : 'sum',
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer : function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					}],
					plugins : Ext.create('Ext.grid.plugin.CellEditing', {
							clicksToEdit : 1,
							editable : !me.canedit,
							autoCancel : false,
							itemId : 'cellEditing',
							listeners : {
							   'afteredit' : function(editor,e){
								var len = me.fybxStore.getCount();														
								var sum_sqje = 0;
								for(var i = 0; i < len; i++){
									rec = me.fybxStore.getAt(i);
									sum_sqje = sum_sqje + rec.get('sqje');
								}									
                        		if(e.field=='sqje'){
                        		 me.down('#sqje').setValue(sum_sqje);
                        		}
                        		var sum_wbje = 0;
                        		for(var i = 0; i < len; i++){
                        			rec = me.fybxStore.getAt(i);
									sum_wbje = sum_wbje + rec.get('wbsq');
								}									
                        		if(e.field=='wbsq'){
                        		 me.down('#wbje').setValue(sum_wbje);
                        		}
                       		 }
                  		}
						}),
					store : me.fybxStore
				}]
			});
		}
		if (rec.get('sjly') == '职工工资') {
			me.down('#imp_search').disable();
			me.down('#payapplyPL').removeAll();
			me.down('#payapplyPL').add({
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
					selModel : Ext.create('Ext.selection.CheckboxModel'),
					columns : [{
						header : '序号',
						dataIndex : 'sqxh',
						width : 50,
						sumaryType : 'count',
						summaryRenderer : function(value, summaryData,
								dataIndex) {
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
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer : function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					}, {
						header : '申请金额',
						dataIndex : 'sqje',
						width : 100,
						editor : {disabled : editor_readonly},
						summaryType : 'sum',
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer : function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
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
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer : function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					}, {
						header : '外币申请',
						dataIndex : 'wbsq',
						width : 100,
						editor : {disabled : editor_readonly},
						summaryType : 'sum',
						summaryRenderer : function(value, summaryData,
								dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						},
						renderer : function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value, '0,000.00');
						}
					}],
					plugins : Ext.create('Ext.grid.plugin.CellEditing', {
							clicksToEdit : 1,
							editable : !me.canedit,
							autoCancel : false,
							itemId : 'cellEditing',
							listeners : {
							   'afteredit' : function(editor,e){
								var len = me.zggzStore.getCount();														
								var sum_sqje = 0;
								for(var i = 0; i < len; i++){
									rec = me.zggzStore.getAt(i);
									sum_sqje = sum_sqje + rec.get('sqje');
								}									
                        		if(e.field=='sqje'){
                        		 me.down('#sqje').setValue(sum_sqje);
                        		}
                        		var sum_wbje = 0;
                        		for(var i = 0; i < len; i++){
                        			rec = me.zggzStore.getAt(i);
									sum_wbje = sum_wbje + rec.get('wbsq');
								}									
                        		if(e.field=='wbsq'){
                        		 me.down('#wbje').setValue(sum_wbje);
                        		}
                       		 }
                  		}
						}),
					store : me.zggzStore
				}]
			});
		}
		me.down('#payapplyPL').items.items[0].items.items[0].getStore().load({
							params : {
								sqbh : rec.get('sqbh')
							}
						});
	}
});