Ext.define('erp.payApply.controller.PayApplyCtrl',{
     extend : 'Ext.app.Controller',
      requires : [
      'erp.ux.PagingBar',
      'erp.payApply.store.PayApply',
//      'erp.payApply.store.PayApplyBufferrd',
      'erp.payApply.model.PayApply',
      'erp.payApply.model.QueryParams',
      'erp.payApply.model.EmployeeSalaryChoose'
      ],
      views : ['erp.payApply.view.PayApplyManger',
     		   'erp.payApply.view.LinkedSearch',
     		   'erp.payApply.view.NotArrived',
     		   'erp.payApply.view.EmployeeSalaryChoose',
      		   'erp.payApply.view.PayApplyQuery',
      		   'erp.payApply.view.EditPayApply',
      		   'erp.payApply.view.SubmitObjectChoose',
      		   'erp.payApply.view.SubmitObjectOam',
      		   'erp.payApply.view.SupplyInvoiceImp',
      		   'erp.payApply.view.EmployeeSalaryImp',
      		   'erp.payApply.view.SaleFeeImp',
      		   'erp.payApply.view.PurchaseFeeImp',
      		   'erp.payApply.view.FeeReimbursementImp',
      		   'erp.payApply.view.NotArrivedQuery',
      		   'erp.payApply.view.PurchaseAgreementImp',
      		   'erp.payApply.view.ContractDetail'],
      refs : [{ref : 'PayApply',selector : 'mng_PayApply'} ,
              {ref : 'GrdPayApply',selector : 'mng_PayApply #grd_PayApply'},
              {ref : 'ApplyBar2',selector : 'mng_PayApply #PayApplyBar'},
              {ref : 'EdtPayApply',selector : 'edt_PayApply'},
              {ref : 'EdtPayApplyForm',selector : 'edt_PayApply #EdtPayApplyForm'},
              {ref : 'EdtPayApplyPanel',selector : 'edt_PayApply #payapplyPL'} ,
              {ref : 'SupplyInvoiceImp',selector : 'Imp_SupplyInvoice'} ,
              {ref : 'GrdSupplyInvoiceImp',selector : 'Imp_SupplyInvoice #SupplyInvoice'},
              {ref : 'GrdSupplyInvoiceImpDetail',selector : 'Imp_SupplyInvoice #SupplyInvoiceDetail'}
      ],
      
      init : function(){
          var me = this;
          if (me.isInited)
			return;
			me.control({
			    'mng_PayApply' : {
			    	beforerender:function(cmp){
					var bar2=cmp.down('#PayApplyBar');
//					erp.Util.setMenuFunc(bar2.down('#BTN_PRINT'),cmp.modId,cmp);
					me.setMenuFunc_fb(bar2.down('#BTN_PRINT'),cmp.modId,cmp);
				    },
			           afterrender : function(){
			               me.panel = me.getPayApply();
			               me.grdmain = me.getGrdPayApply();
			               me.gdbj=me.panel.gdbj;
			               me.grdStore = me.panel.store;
			               /* var rz_czy=erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id;
				    		var sql  =" select cgybh  from cgyb where cgyb.czy_gh ='"+rz_czy+"'";
							var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
							{sql : sql});
							var data = Ext.decode(result);
							if (data.val) {
								Ext.apply(me.grdStore.proxy.extraParams,{sqrm:erp.Util.currentUser.userInfo.name});
							}*/
			               var isCgy=false;
					       Ext.each(erp.Util.currentUser.roleList,function(role){
								if(role.role_name=='采购员'){
								isCgy=true;
								return false;
							 }
						   })
						   if(!erp.Util.currentUser.isAdmin&&isCgy){
						    	//判断当前操作员是否为采购员
								Ext.apply(me.grdStore.proxy.extraParams,{sqrm:erp.Util.currentUser.userInfo.name});
							}
			               me.grdStore.load();
			               me.gyfpStore = me.panel.gyfpStore;
			               me.cghtStore = me.panel.cghtStore;
			               me.xsfyStore = me.panel.xsfyStore;
			               me.cgfyStore = me.panel.cgfyStore;
			               me.fybxStore = me.panel.fybxStore;
			               me.zggzStore = me.panel.zggzStore;
			               me.htxxStore = me.panel.htxxStore;
			               me.fkxxStore = me.panel.fkxxStore;
			               me.glfpStore = me.panel.glfpStore;
			               me.tzmxStore = me.panel.tzmxStore;
			               me.query_rec=Ext.create('erp.payApply.model.QueryParams');
			           }
			    },
			     'mng_PayApply button' : {
			         click : me.doAction
			     },	
			     /*
			      'mng_PayApply #menu_printer' : {
			         click : me.doMenuPrinter
			     },	*/
			     'mng_PayApply #grd_PayApply' : {
			    	 
			      selectionchange : function(grid, rec) {
			      	   me.panel.down('#payapplyPL').removeAll();
			           if (rec.length > 0) {
			        	 var applyBar2 = me.getApplyBar2();//获取toolbar
			        	 var printButton = applyBar2.getComponent('BTN_PRINT');//获取打印button	
			        	 var ls_spbj = erp.Const.callServiceMethodSync('payapply/payapply.act?method=getLsSpbj', {sqbh:rec[0].get('sqbh')});
			        	 if(rec[0].get('yfkbj')==0 && (rec[0].get('spbj')==1 && rec[0].get('fhbj')==0)){
			        	     printButton.setDisabled(false);//非预付款，只要审批了，没有复核才能打印
			        	 }else if(rec[0].get('yfkbj')==1 && (rec[0].get('fhbj')==0 && ls_spbj==1)){
			        	     printButton.setDisabled(false);//.预付款，中间表t_inf_payment_hdr 的SPBJ 字段为1，但是fksqspb中的spbj=0才能打印
			        	 }else{
			        	     printButton.setDisabled(true);//其他的不允许打印
			        	 }
			           	if(rec[0].get('sjly')=='供应发票'){
			           		me.panel.down('#payapplyPL').add({
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
											dataIndex : 'bmmc',
											width : 100
										}, {
											header : '开票日期',
											dataIndex : 'kprq',
											xtype:'datecolumn',
											format:'Y-m-d',
											width : 100
										}, {
											header : '记账日期',
											dataIndex : 'jzrq',
											xtype:'datecolumn',
											format:'Y-m-d',
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
											xtype:'datecolumn',
											format:'Y-m-d',
											width : 100
										}, {
											header : '支付金额',
											dataIndex : 'zfje',
											width : 100,
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											xtype:'datecolumn',
											format:'Y-m-d H:i:s',
											width : 100
										}, {
											header : '锁定人名',
											dataIndex : 'sdrm',
											width : 80
										}, {
											header : '锁定时间',
											dataIndex : 'sdsj',
											xtype:'datecolumn',
											format:'Y-m-d H:i:s',
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
											xtype:'datecolumn',
											format:'Y-m-d',
											width : 100
										}, {
											header : '记账日期',
											dataIndex : 'jzrq',
											xtype:'datecolumn',
											format:'Y-m-d',
											width : 100
										}, {
											header : '发票金额',
											dataIndex : 'fpje',
											width : 100,
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											xtype:'datecolumn',
											format:'Y-m-d',
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											xtype:'datecolumn',
											format:'Y-m-d H:i:s',
											width : 100
										}, {
											header : '操作员',
											dataIndex : 'czym',
											width : 100
										}, {
											header : '操作时间',
											dataIndex : 'czsj',
											xtype:'datecolumn',
											format:'Y-m-d H:i:s',
											width : 100
										}],
										store : me.tzmxStore
									}]
								});
			           	}
			           	if(rec[0].get('sjly')=='采购合同'){
			           		me.panel.down('#payapplyPL').add({
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
//											summaryType : 'sum',
//											summaryRenderer : function(value,
//													summaryData, dataIndex) {
//												return Ext.util.Format.number(
//														value, '0,000');
//											},
//											renderer : function(value,
//													summaryData, dataIndex) {
//												return Ext.util.Format.number(
//														value, '0,000');
//											}
										}, {
											header : '申请金额',
											dataIndex : 'sqje',
											width : 100,
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											dataIndex : 'yfje',
											width : 100,
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											header : '外币总额',
											dataIndex : 'wbze',
											width : 100,
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											header : '外币金额',
											dataIndex : 'wbje',
											width : 100,
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											xtype:'datecolumn',
											format:'Y-m-d',
											width : 100
										}, {
											header : '支付金额',
											dataIndex : 'zfje',
											width : 100,
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											xtype:'datecolumn',
											format:'Y-m-d H:i:s',
											width : 100
										}, {
											header : '锁定人名',
											dataIndex : 'sdrm',
											width : 80
										}, {
											header : '锁定时间',
											dataIndex : 'sdsj',
											xtype:'datecolumn',
											format:'Y-m-d H:i:s',
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
											xtype:'datecolumn',
											format:'Y-m-d',
											width : 100
										}, {
											header : '记账日期',
											dataIndex : 'jzrq',
											xtype:'datecolumn',
											format:'Y-m-d',
											width : 100
										}, {
											header : '发票金额',
											dataIndex : 'fpje',
											width : 100,
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											xtype:'datecolumn',
											format:'Y-m-d',
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											xtype:'datecolumn',
											format:'Y-m-d H:i:s',
											width : 100
										}, {
											header : '操作员',
											dataIndex : 'czym',
											width : 100
										}, {
											header : '操作时间',
											dataIndex : 'czsj',
											xtype:'datecolumn',
											format:'Y-m-d H:i:s',
											width : 100
										}],
										store : me.tzmxStore
									}]
								});
			           	}
			           	if(rec[0].get('sjly')=='费用报销'){
			           		 me.panel.down('#payapplyPL').add( {
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											xtype:'datecolumn',
											format:'Y-m-d',
											width : 100
										}, {
											header : '支付金额',
											dataIndex : 'zfje',
											width : 100,
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											xtype:'datecolumn',
											format:'Y-m-d H:i:s',
											width : 100
										}, {
											header : '锁定人名',
											dataIndex : 'sdrm',
											width : 80
										}, {
											header : '锁定时间',
											dataIndex : 'sdsj',
											xtype:'datecolumn',
											format:'Y-m-d H:i:s',
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
											xtype:'datecolumn',
											format:'Y-m-d',
											width : 100
										}, {
											header : '记账日期',
											dataIndex : 'jzrq',
											xtype:'datecolumn',
											format:'Y-m-d',
											width : 100
										}, {
											header : '发票金额',
											dataIndex : 'fpje',
											width : 100,
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											xtype:'datecolumn',
											format:'Y-m-d',
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											xtype:'datecolumn',
											format:'Y-m-d H:i:s',
											width : 100
										}, {
											header : '操作员',
											dataIndex : 'czym',
											width : 100
										}, {
											header : '操作时间',
											dataIndex : 'czsj',
											xtype:'datecolumn',
											format:'Y-m-d H:i:s',
											width : 100
										}],
										store : me.tzmxStore
									}]
								});
			           	}
			           	if(rec[0].get('sjly')=='采购费用'){
			           		 me.panel.down('#payapplyPL').add( {
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											dataIndex : 'yfje',
											width : 100,
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											xtype:'datecolumn',
											format:'Y-m-d',
											width : 100
										}, {
											header : '支付金额',
											dataIndex : 'zfje',
											width : 100,
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											xtype:'datecolumn',
											format:'Y-m-d H:i:s',
											width : 100
										}, {
											header : '锁定人名',
											dataIndex : 'sdrm',
											width : 80
										}, {
											header : '锁定时间',
											dataIndex : 'sdsj',
											xtype:'datecolumn',
											format:'Y-m-d H:i:s',
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
											xtype:'datecolumn',
											format:'Y-m-d',
											width : 100
										}, {
											header : '记账日期',
											dataIndex : 'jzrq',
											xtype:'datecolumn',
											format:'Y-m-d',
											width : 100
										}, {
											header : '发票金额',
											dataIndex : 'fpje',
											width : 100,
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											xtype:'datecolumn',
											format:'Y-m-d',
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											xtype:'datecolumn',
											format:'Y-m-d H:i:s',
											width : 100
										}, {
											header : '操作员',
											dataIndex : 'czym',
											width : 100
										}, {
											header : '操作时间',
											dataIndex : 'czsj',
											xtype:'datecolumn',
											format:'Y-m-d H:i:s',
											width : 100
										}],
										store : me.tzmxStore
									}]
								});
			           	}
			           	if(rec[0].get('sjly')=='职工工资'){
			           		 me.panel.down('#payapplyPL').add({
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											xtype:'datecolumn',
											format:'Y-m-d',
											width : 100
										}, {
											header : '支付金额',
											dataIndex : 'zfje',
											width : 100,
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											xtype:'datecolumn',
											format:'Y-m-d H:i:s',
											width : 100
										}, {
											header : '锁定人名',
											dataIndex : 'sdrm',
											width : 80
										}, {
											header : '锁定时间',
											dataIndex : 'sdsj',
											xtype:'datecolumn',
											format:'Y-m-d H:i:s',
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
											xtype:'datecolumn',
											format:'Y-m-d',
											width : 100
										}, {
											header : '记账日期',
											dataIndex : 'jzrq',
											xtype:'datecolumn',
											format:'Y-m-d',
											width : 100
										}, {
											header : '发票金额',
											dataIndex : 'fpje',
											width : 100,
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											xtype:'datecolumn',
											format:'Y-m-d',
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											xtype:'datecolumn',
											format:'Y-m-d H:i:s',
											width : 100
										}, {
											header : '操作员',
											dataIndex : 'czym',
											width : 100
										}, {
											header : '操作时间',
											dataIndex : 'czsj',
											xtype:'datecolumn',
											format:'Y-m-d H:i:s',
											width : 100
										}],
										store : me.tzmxStore
									}]
								});
			           	}
			           	if(rec[0].get('sjly')=='销售费用'){
			           		 me.panel.down('#payapplyPL').add({
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											xtype:'datecolumn',
											format:'Y-m-d',
											width : 100
										}, {
											header : '支付金额',
											dataIndex : 'zfje',
											width : 100,
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											xtype:'datecolumn',
											format:'Y-m-d H:i:s',
											width : 100
										}, {
											header : '锁定人名',
											dataIndex : 'sdrm',
											width : 80
										}, {
											header : '锁定时间',
											dataIndex : 'sdsj',
											xtype:'datecolumn',
											format:'Y-m-d H:i:s',
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
											xtype:'datecolumn',
											format:'Y-m-d',
											width : 100
										}, {
											header : '记账日期',
											dataIndex : 'jzrq',
											xtype:'datecolumn',
											format:'Y-m-d',
											width : 100
										}, {
											header : '发票金额',
											dataIndex : 'fpje',
											width : 100,
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											xtype:'datecolumn',
											format:'Y-m-d',
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
											renderer : function(v) {
												return Ext.util.Format.number(v,
														'0,000.00');
											},
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
											xtype:'datecolumn',
											format:'Y-m-d H:i:s',
											width : 100
										}, {
											header : '操作员',
											dataIndex : 'czym',
											width : 100
										}, {
											header : '操作时间',
											dataIndex : 'czsj',
											xtype:'datecolumn',
											format:'Y-m-d H:i:s',
											width : 100
										}],
										store : me.tzmxStore
									}]
								});
			           	}
			            me.gyfpStore.load({params:{ sqbh:rec[0].get('sqbh')}});
			            me.cghtStore.load({params:{ sqbh:rec[0].get('sqbh')}});
			            me.xsfyStore.load({params:{ sqbh:rec[0].get('sqbh')}});
			            me.cgfyStore.load({params:{ sqbh:rec[0].get('sqbh')}});
			            me.fybxStore.load({params:{ sqbh:rec[0].get('sqbh')}});
			            me.zggzStore.load({params:{ sqbh:rec[0].get('sqbh')}});
			            me.htxxStore.load({params:{ sqbh:rec[0].get('sqbh')}});
			            me.fkxxStore.load({params:{ sqbh:rec[0].get('sqbh')}});
			            me.glfpStore.load({params:{ sqbh:rec[0].get('sqbh')}});
			            me.tzmxStore.load({params:{ sqbh:rec[0].get('sqbh')}});
			           }
			       },
			       itemdblclick : function(grid, rec) {
			          /* me.EdtNotice('btn_edt')*/
			       		me.EdtPayApply('btn_edt');
			       }
			     },
			     'edt_PayApply' : {
						afterrender : function(th) {
							me.getEdtPayApply().down('#EdtPayApplyBar').enable();
							me.getEdtPayApplyPanel().enable();
							me.getEdtPayApply().can_use_btn = true;
//							if(me.getEdtPayApply().isEdit){
//								me.getEdtPayApply().down('#yfkbj').setValue(1);
//							}
						}
				},
				'edt_PayApply button' : {
						click : me.doEditAction
				},
				'Imp_SupplyInvoice #SupplyInvoice' :{	
					//单击表格单元格时触发
					cellclick : function(a,td,cellIndex,record){
						var arr = [];
						arr[0] = record;
						if (arr.length > 0) {
						 	var fplb=arr[0].get('fplb');
						 	var fphm=arr[0].get('fphm');
						 	me.getSupplyInvoiceImp().dstore.proxy.extraParams.fphm = fphm;
						 	me.getSupplyInvoiceImp().dstore.proxy.extraParams.fplb = fplb;
						 	me.getSupplyInvoiceImp().dstore.load();
						 }
						
					}
				},
				'Imp_SupplyInvoice #SupplyInvoiceDetail' :{
					afterrender : function() {												
					}
				}
			});
		me.isInited=true;
      },
      //渲染打印按钮
      setMenuFunc_fb:function(menu,modId,scope){
		var me=this;
		Ext.Ajax.request({
		 url: 'report/SysReports.do?method=getSysPrintModelList',                       
         method: 'POST',
         async:false,
         callback: function (o, s, r) {
	         var resp=Ext.decode(r.responseText);
	         var data=resp.data;
	         if(Ext.isEmpty(data)){
	         	Ext.apply(menu,{disabled:true});
	         }
	         else{
	         Ext.each(data,function(rec){	         	       
			          	menu.menu.add({
			          		 iconCls:'printer',
			          	     text:rec.name,
			          	     record:rec,		//将打印模板记录保存在record中,用于那些需要选择模板的情况；
			          	     handler:function(item){
			          	     	//加入作用域变量,主要用于打印前条件检查等
			          	     	//PrintCheck:在页面中实现具体代码
			          	     	//华慧
			          	     	//2015-06-08
			          	     	if(scope){
			          	     		if (!Ext.isEmpty(scope.PrintProcess)&&Ext.isFunction(scope.PrintProcess)){
			          	     			var recs=scope.PrintProcess(item);
			          	     			if(Ext.isEmpty(recs))
			          	     				return;
			          	     			else
			          	     				recs[0].set('dyr',erp.Util.currentUser.name);
			          	     		}
			          	     		else{
			          	     			Ext.Msg.alert("提示","打印设置出现问题，请联系管理员!");
			          	     			return;
			          	     		}
			          	     	}else
			          	     		return;
			          	     	//开始打印	
			          	      	me.doPrint(modId,rec,recs);
			          	      	
			          	     }
			          	  });
			    });			   
	         }
          },
		 params:{menu_id:modId,is_active:'true'}
		});
	},
	//打印
	doPrint:function(modId,rec,recs){	
		var wbbh = Ext.util.Format.trim(recs[0].get('wbbh'));
		if(wbbh == '' || wbbh == null){
		 wbbh = 'RMB';
		}else{
		 wbbh = recs[0].get('wbbh');
		}
		var order_seq = 0;
		var sjly = Ext.util.Format.trim(recs[0].get('sjly'));
		if(rec.name == '付款申请单_合并'){//合并正式库97 测试库81
		    order_seq = 20;
		}else if(rec.name == '付款申请单-宏升-合并'){
		    order_seq = 30;
		}
		else{
			if(sjly=='供应发票' && (wbbh=='RMB' || recs[0].get('wbbh')=='60')){//供应发票 人民币打印
			   order_seq = 0;
			}else if(sjly=='供应发票' && (wbbh !='RMB' || recs[0].get('wbbh') != 60)){//供应发票 外币打印
			    order_seq = 1;
			}else if(sjly=='采购合同' && (wbbh =='RMB' || recs[0].get('wbbh') == 60)){//采购合同 人民币打印
			    order_seq = 3;
			}else if(sjly=='采购合同' && (wbbh !='RMB' || recs[0].get('wbbh') != 60)){//采购合同 外币打印
			    order_seq = 4;
			}else if(sjly=='采购费用' && (wbbh =='RMB' || recs[0].get('wbbh') == 60)){//采购费用 人民币打印
			    order_seq = 6;
			}else if(sjly=='采购费用' && (wbbh !='RMB' || recs[0].get('wbbh') != 60)){//采购费用 外币打印
			    order_seq = 5;
			}
		}
		var print_result = erp.Const.callServiceMethodSync('report/SysReports.do?method=getPayApplyPrintModelList',
	    			{menu_id:modId,order_seq:order_seq});
	    var mod_id = print_result[0].mod_id;
	    var default_style = print_result[0].default_style;
	    var mod_tpl = print_result[0].mod_tpl;
		var recprint = Ext.create('erp.report.engine.model.SysPrintModel', {
					mod_id : mod_id,
					default_style : default_style,
					mod_tpl : mod_tpl,
					report_type : 'SYS',
					// 打印模式
					tpl_type : '04'
				});	
		if (!Ext.isEmpty(recprint.get('mod_tpl')))
			if (recs.length > 0){
				erp.Util.addContentTab({
							xtype : 'sys_tpldesigner',
							iconCls : 'printer',
							itemId : Ext.id(),
							title : rec.name,
							printRecs : recs,
							tplRec : recprint,
							closable : true
						});
			}
			else {
				Ext.Msg.alert("提示", "请选择一笔打印记录!");
			}
		else
			erp.AnalysisFun.doquery(recprint, null);
	},
    doAction : function(btn){
          var me = this;
          if(!me.panel.can_use_btn){
			Ext.Msg.alert('提示',"编辑状态不可操作");
			return;
		}
        
		switch(btn.itemId){
//		    case 'print' :
//		    	this.doPrint();
//		    break;
			case 'btn_add' :
				this.EdtPayApply(btn.itemId);
			break;
			
			case 'btn_edt' :
				this.EdtPayApply(btn.itemId);
			break;
			
			case 'btn_del' :
				this.DeletePayApply();
			break;
			case 'btn_commit' :
				var recs = me.grdmain.getSelectionModel().getSelection();
				if (Ext.isEmpty(recs)) {
					Ext.Msg.alert('提示', '请选择一条记录!');
					break;
				}
				var rec = recs[0];
				var tjbj = 1;
				var bb = '确认';
				var czym = erp.Util.currentUser.userInfo.name;

				if (rec.get('tjbj') == 1) {
					tjbj = 0;
					bb = '取消';
					if (rec.get('spbj') == 1) {
						Ext.Msg.alert('提示', '【' + rec.get('sqbh')+ '】号记录已审批，不能取消提交！');
						break;
					}
					var ls_spbj = erp.Const.callServiceMethodSync('payapply/payapply.act?method=getLsSpbj', {sqbh:rec.get('sqbh')});
					if (ls_spbj != 0) {
						Ext.Msg.alert('提示', '【' + rec.get('sqbh')+ '】号单据已有领导审批，不能取消提交！');
						break;
					}
				}
				Ext.Msg.confirm('提示', '是否' + bb + '提交【' + rec.get('sqbh')+ '】号记录?', function(btn) {
							if (btn == 'yes') {
								if(bb=="取消"){
									Ext.Ajax.request({
									// 将生成的xml发送到服务器端,需特别注意这个页面的地址
									url : 'payapply/payapply.act?method=submitPayApply',
									async : false,
									timeout : 600000,
									method : 'POST',
									waitMsg : '正在进行数据验证，请耐心等候...',
									success : function(response, opts) {
										me.grdStore.reload();
									},
									params : {
										tjbj : tjbj,
										tjrm : czym,
										tjsj : Ext.Date.format(new Date(),'Y-m-d H:i:s'),
										tjdx : '',
										sqbh : rec.get('sqbh')
									}
								});
								}else{
									var win = Ext.widget('SubmitObjectChoose',{});
									win.down('#btn_confirm').on({
									click : function(btn) {
									var win = btn.up('window');
									var grid = win.down('#SubmitObject');
									if(grid.getSelectionModel().getSelection().length<1){
									 Ext.Msg.alert('提示','请选择提交对象!');
									 return
									}
									var rec1 = grid.getSelectionModel().getSelection()[0];																		
									Ext.Ajax.request({
									// 将生成的xml发送到服务器端,需特别注意这个页面的地址
									url : 'payapply/payapply.act?method=submitPayApply',
									async : false,
									timeout : 600000,
									method : 'POST',
									waitMsg : '正在进行数据验证，请耐心等候...',
									success : function(response, opts) {
										me.grdStore.reload();
									},
									params : {
										tjbj : tjbj,
										tjrm : czym,
										tjsj : Ext.Date.format(new Date(),'Y-m-d H:i:s'),
										tjdx : rec1.get('czy_gh'),//TODO
										sqbh : rec.get('sqbh')
									}
								});
									win.close();
									}
								});
								win.show();
								}
							}
						});
			break;
			case 'review' :
				var recs = me.grdmain.getSelectionModel().getSelection();
				if (Ext.isEmpty(recs)) {
					Ext.Msg.alert('提示', '请选择一条记录!');
					break;
				}
				var rec = recs[0];
				var fhbj = 1;
				var bb = '确认';
				var czym = erp.Util.currentUser.userInfo.name;

				if (rec.get('fhbj') == 1) {
					fhbj = 0;
					bb = '取消';
					if (rec.get('spbj') == 1) {
						Ext.Msg.alert('提示', '【' + rec.get('sqbh')+ '】号记录已审批，不能取消复核！');
						break;
					}
				}
				Ext.Msg.confirm('提示', '是否' + bb + '复核【' + rec.get('sqbh')+ '】号记录?', function(btn) {
							if (btn == 'yes') {
								Ext.Ajax.request({
									// 将生成的xml发送到服务器端,需特别注意这个页面的地址
									url : 'payapply/payapply.act?method=reviewPayApply',
									async : false,
									timeout : 600000,
									method : 'POST',
									waitMsg : '正在进行数据验证，请耐心等候...',
									success : function(response, opts) {
										me.grdStore.reload();
									},
									params : {
										fhbj : fhbj,
										fhrm : czym,
										fhsj : Ext.Date.format(new Date(),'Y-m-d H:i:s'),
										sqbh : rec.get('sqbh')
									}
								});
							}
						});
			break
			case 'approval' :
				var recs = me.grdmain.getSelectionModel().getSelection();
				if (Ext.isEmpty(recs)) {
					Ext.Msg.alert('提示', '请选择一条记录!');
					break;
				}
				var rec = recs[0];
				var spbj = 1;
				var bb = '确认';
				var czym = erp.Util.currentUser.userInfo.name;

				if (rec.get('spbj') == 1) {
					spbj = 0;
					bb = '取消';
				}
				Ext.Msg.confirm('提示', '是否' + bb + '审批【' + rec.get('sqbh')+ '】号记录?', function(btn) {
							if (btn == 'yes') {
								Ext.Ajax.request({
									// 将生成的xml发送到服务器端,需特别注意这个页面的地址
									url : 'payapply/payapply.act?method=approvalPayApply',
									async : false,
									timeout : 600000,
									method : 'POST',
									waitMsg : '正在进行数据验证，请耐心等候...',
									success : function(response, opts) {
										me.grdStore.reload();
									},
									params : {
										spbj : spbj,
										sprm : czym,
										spsj : Ext.Date.format(new Date(),'Y-m-d H:i:s'),
										sqbh : rec.get('sqbh')
									}
								});
							}
						});
			break;
			case 'transferred' :
				var recs = me.grdmain.getSelectionModel().getSelection();
				if (Ext.isEmpty(recs)) {
					Ext.Msg.alert('提示', '请选择一条记录!');
					break;
				}
				var rec = recs[0];
				var yzbj = 1;
				var bb = '确认';
				var czym = erp.Util.currentUser.userInfo.name;

				if (rec.get('yzbj') == 1) {
					yzbj = 0;
					bb = '取消';
				}
				Ext.Msg.confirm('提示', '是否' + bb + '【' + rec.get('sqbh')+ '】号记录已转?', function(btn) {
							if (btn == 'yes') {
								Ext.Ajax.request({
									// 将生成的xml发送到服务器端,需特别注意这个页面的地址
									url : 'payapply/payapply.act?method=transferredPayApply',
									async : false,
									timeout : 600000,
									method : 'POST',
									waitMsg : '正在进行数据验证，请耐心等候...',
									success : function(response, opts) {
										me.grdStore.reload();
									},
									params : {
										yzbj : yzbj,
										yzrm : czym,
										yzsj : Ext.Date.format(new Date(),'Y-m-d H:i:s'),
										sqbh : rec.get('sqbh')
									}
								});
							}
						});
			break
			case 'stop' :
				var recs = me.grdmain.getSelectionModel().getSelection();
				if (Ext.isEmpty(recs)) {
					Ext.Msg.alert('提示', '请选择一条记录!');
					break;
				}
				var rec = recs[0];
				var zzbj = 1;
				var bb = '确认';
				var czym = erp.Util.currentUser.userInfo.name;

				if (rec.get('zzbj') == 1) {
					zzbj = 0;
					bb = '取消';
				}
				Ext.Msg.confirm('提示', '是否' + bb + '中止【' + rec.get('sqbh')+ '】号记录?', function(btn) {
							if (btn == 'yes') {
								Ext.Ajax.request({
									// 将生成的xml发送到服务器端,需特别注意这个页面的地址
									url : 'payapply/payapply.act?method=stopPayApply',
									async : false,
									timeout : 600000,
									method : 'POST',
									waitMsg : '正在进行数据验证，请耐心等候...',
									success : function(response, opts) {
										me.grdStore.reload();
									},
									params : {
										zzbj : zzbj,
										sqbh : rec.get('sqbh')
									}
								});
							}
						});
			break
			case 'btn_query':			
				var rz_czy=erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id;
	    		var sql  =" select cgybh  from cgyb where cgyb.czy_gh ='"+rz_czy+"'";
				var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
				{sql : sql});
				var data = Ext.decode(result);
				if (data.val) {
					me.query_rec.set('sqrm',erp.Util.currentUser.userInfo.name)
				}
				var win=Ext.widget('PayApplyQuery',{
							itemId:'PayApplyQuery',
							mainstore:me.grdStore,
							mainview:me.panel,
							rec:me.query_rec
						});
				win.show();
			break;
			case 'linked_query':
				var recs = me.grdmain.getSelectionModel().getSelection();
				if (Ext.isEmpty(recs)) {
					Ext.Msg.alert('提示', '请选择一条记录!');
					break;
				}
				var rec = recs[0];
				var sqbh=rec.get('sqbh');
				var wbbh=rec.get('wbbh');
				var panel = erp.Util.addContentTab({
					xtype : 'LinkedSearch',
					itemId : 'LinkedSearch',
					closable : true,
					sqbh : sqbh,
					wbbh : wbbh
				});
				panel.setTitle('付款计划关联查询【厂商:'+rec.get('csmc')+'  付款条件:'+rec.get('fktj')+'  付款天数:'+rec.get('fkts')+'天】');
			break;
			case 'not_arrived':
				var recs = me.grdmain.getSelectionModel().getSelection();
				if (Ext.isEmpty(recs)) {
					Ext.Msg.alert('提示', '请选择一条记录!');
					break;
				}
				var rec = recs[0];
				var sqbh=rec.get('sqbh');
				var panel = erp.Util.addContentTab({
					xtype : 'NotArrived',
					itemId : 'NotArrived',
					closable : true,
					sqbh:sqbh
				});
				panel.setTitle('未达明细查询【厂商:'+rec.get('csmc')+'】');
			break;
			case 'archive' :
				var recs = me.grdmain.getSelectionModel().getSelection();
				if (Ext.isEmpty(recs)) {
					Ext.Msg.alert('提示', '请选择一条记录!');
					break;
				}
				var rec = recs[0];
				var gdbj = 1;
				var bb = '归档';
				var czym = erp.Util.currentUser.userInfo.name;

				if (rec.get('gdbj') == 1) {
					gdbj = 0;
					bb = '恢复';
				}
				Ext.Msg.confirm('提示', '是否' + bb + '【' + rec.get('sqbh')+ '】号记录?', function(btn) {
							if (btn == 'yes') {
								Ext.Ajax.request({
									// 将生成的xml发送到服务器端,需特别注意这个页面的地址
									url : 'payapply/payapply.act?method=archivePayApply',
									async : false,
									timeout : 600000,
									method : 'POST',
									waitMsg : '正在进行数据验证，请耐心等候...',
									success : function(response, opts) {
										me.grdStore.reload();
									},
									params : {
										gdbj : gdbj,
										sqbh : rec.get('sqbh')
									}
								});
							}
						});
			break;
			case 'history':
				var history=me.panel.down('#history');
				var btn_add=me.panel.down('#btn_add');
				var btn_del=me.panel.down('#btn_del');
				var approval=me.panel.down('#approval');
				var archive=me.panel.down('#archive');
				if(me.panel.gdbj==null){
					me.panel.gdbj=0;
				}
				if(me.panel.gdbj==0){
					me.panel.gdbj=1;
					history.setText('当前');
					archive.setText('恢复');
					me.panel.setTitle('历史付款申请单审批');
					btn_add.disable();
					btn_del.disable();
					approval.disable();
					me.grdStore.proxy.extraParams.gdbj=me.panel.gdbj;
					me.grdStore.reload();
				}else{
					me.panel.gdbj=0;
					history.setText('历史');
					archive.setText('归档');
					me.panel.setTitle('付款申请单审批');
					btn_add.enable();
					btn_del.enable();
					approval.enable();
					me.grdStore.proxy.extraParams.gdbj=me.panel.gdbj;
					me.grdStore.reload();
				}
			break;
			case 'maintenance' :
				var win = Ext.widget('SubmitObjectOam',{});
				win.show();
			break;
		
		}
      },
    EdtPayApply : function(type) {
		var me = this;
		var rec;
		var isAdd = isEdit = false;
		var canedit = true;	
		var s_isEdit = false;
		switch (type) {
			case 'btn_add' :
				isAdd = true;
//				isEdit = false;
				canedit = true;
				s_isEdit = false;
				var newsqbh = null;
				Ext.Ajax.request({
					url : 'payapply/payapply.act?method=getPayApplyOne',
					async : false,
					success : function(response, opts) {
						var obj = Ext.decode(response.responseText);
						newsqbh = obj.data;
					},
					method : "POST",
					scope : this
				});
				var editor_readonly = false;
				var rec = Ext.create(
						'erp.payApply.model.PayApply', {
							sqbh : parseInt(newsqbh) + 1,
							sjly : '供应发票',
							ywlx : '3',
							sqrq : new Date(),
							sqrm: erp.Util.currentUser.userInfo.name
						});
					rec.phantom=true;
				break;
			case 'btn_edt' :
				var rec = me.grdmain.getSelectionModel().getSelection()[0];
				if (Ext.isEmpty(rec)) {
					Ext.Msg.alert('提示', '请先选中一条记录');
					return;
				}
                var yfbj = rec.get('yfbj');
				var spbj = rec.get('spbj');
				var gdbj = rec.get('gdbj');
				var tjbj = rec.get('tjbj');
				var yfkbj = rec.get('yfkbj');
				canedit = true;
				isAdd = false;
				s_isEdit = true;
				isEdit = true;
				var save_enabled = false;//保存按钮
				var editor_readonly = false;
				if(s_isEdit){
					if(yfbj==1 || spbj==1 || gdbj==1){
					  save_enabled = true;//保存按钮隐藏  hidden : Boolean
					  editor_readonly = true;// 明细中不允许编辑
					}
					var czy_gh = erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id;
					var bj_result = erp.Const.callServiceMethodSync('payapply/payapply.act?method=getBjList',{sqbh : rec.get('sqbh'),czy_gh:czy_gh});					
					var data = Ext.decode(bj_result);
					var s_yyfbj = data.s_yyfbj;
					var ls_yyfbj = data.ls_yyfbj;
					var sys_manager = data.sys_manager.val;
					var sqrm = Ext.util.Format.trim(rec.get('sqrm'));
					if(spbj==1 || tjbj ==1 || ((s_yyfbj==1 || ls_yyfbj==1) && yfkbj==1)){
					 save_enabled = true; //保存按钮隐藏  hidden : Boolean
			         editor_readonly = true;// 明细中不允许编辑
					}
					if(Ext.util.Format.trim(erp.Util.currentUser.userInfo.name) != sqrm && sys_manager==0){
					 save_enabled = true; 
					 editor_readonly = true;
					}
				}
				break;
		}
		var panel = erp.Util.addContentTab({
					xtype : 'edt_PayApply',
					itemId : 'EdtPayApply',
					isAdd : isAdd,
					canedit : canedit,
					s_isEdit : s_isEdit,
					mainPanel : me.panel,
					closable : true,
					closeAction:'destroy',
					isEdit : isEdit,
					rec : rec,	
					save_enabled : save_enabled,
					editor_readonly : editor_readonly,
					mainstore : me.grdStore
				});
		panel.LoadData(rec, isAdd, s_isEdit, canedit,editor_readonly);
	},
	DeletePayApply : function() {
		var me = this;
		var rec = me.grdmain.getSelectionModel().getSelection()[0];
		if (Ext.isEmpty(rec)) {
			Ext.Msg.alert('提示', '请先选中一条记录');
			return;
		}
		var s_sqrm = rec.get('sqrm');		
		var s_czrm = erp.Util.currentUser.userInfo.name;
		var sqrm = Ext.String.trim(s_sqrm);
		var czrm = Ext.String.trim(s_czrm);
		var isAdmin = erp.Util.currentUser.isAdmin;
		if( !isAdmin && czrm != sqrm){
		 Ext.Msg.alert('提示','非管理员或者非本人操作的单据不能删除！');
		 return;
		}
		// 删除前验证
		if (rec.get('tjbj') == "1") {
			Ext.Msg.alert("提示", "" + rec.get('sqbh') + "付款申请单已提交不能删除!");
			return;
		}
		if (rec.get('fhbj') == "1") {
			Ext.Msg.alert("提示", "" + rec.get('sqbh') + "付款申请单已复核不能删除!");
			return;
		}
		if (rec.get('spbj') == "1") {
			Ext.Msg.alert("提示", "" + rec.get('sqbh') + "付款申请单已审批不能删除!");
			return;
		}
		
		Ext.Msg.confirm("提示", "确认删除记录?", function(btn) {
					if (btn == "yes"){
						var del = erp.Const.callServiceMethodSync('payapply/payapply.act?method=getDeletePayApply',{
							  sqbh:rec.get('sqbh'),sjly:rec.get('sjly')
							})
							var data = Ext.decode(del);
							if(!data.bool){
								Ext.Msg.alert('提示',data.msg);
								return;
							}
							Ext.Msg.alert('提示',data.msg);
							me.grdStore.reload();
					}
		})
	},
	doEditAction : function(btn) {
		var me = this;
		var panel=me.getEdtPayApply();
		var s_isEdit = panel.s_isEdit;
		var isAdd = panel.isAdd;		
		var form=me.getEdtPayApplyForm();
		var sqbm = form.down('#sqbmbh').getRawValue();
		var fkfs = form.down('#fkfs').getRawValue();
		if(csbh==null)csbh="";
		if(sjly==null)sjly="";		
		var formrec=form.getRecord();
		form.updateRecord(formrec);	
		formrec.set('sqbm',sqbm);
		formrec.set('fkfs',fkfs);
		var s_sqje = formrec.get('sqje');
		var s_wbje = formrec.get('wbje');	
		var yfkbj;
		var s_yfkbj=form.down('#yfkbj').getValue();
		
		if(s_yfkbj){
			formrec.set('yfkbj',1);
			yfkbj = 1;
		}else{
			formrec.set('yfkbj',0);
			yfkbj = 0;
		}
		var s_hdbj = form.down('#hdbj').getValue();
		if(s_hdbj){
			formrec.set('hdbj',1);
			
		}else{
			formrec.set('hdbj',0);
			
		}
		var csbh = form.down('#csbh').getValue();
		formrec.set('csbh',csbh);
		var sjly = form.down('#sjly').getRawValue();
		formrec.set('sjly',sjly);
		var tabPanel= me.getEdtPayApplyPanel();
		var zPanel=tabPanel.items.items[0];
		var zGrid=zPanel.items.items[0];
		var zStore=zGrid.getStore();
		var dStore = panel.dStore;
		var zSt_count = zStore.getCount();
		var s_fyje = 0;
		var s_htze = 0;
		var s_wbze = 0;
		if(zSt_count > 0){
		 for(var i=0; i< zSt_count;i++){
		 	var zst_rec = zStore.getAt(i);
		 	s_fyje += zst_rec.get('fyje');
		 	s_htze += zst_rec.get('htze');
		 	s_wbze += zst_rec.get('wbze');
		 }
		}else{
			formrec.set('sqje',0);
			formrec.set('wbje',0);
		}
		switch (btn.itemId) {
			case 'imp' :
			if(sjly=='供应发票'){
				    if(csbh==null || csbh == ''){
				     Ext.Msg.alert('提示','供货厂商不能为空！');
				     return;
				    }
					if(formrec.get('yfkbj')==1){
						Ext.Msg.alert('提示', '只有非预付的付款申请才能导入供应发票!');
						return;
					}
					
					var win = Ext.widget('Imp_SupplyInvoice',{
						csbh:csbh
					});
					win.down('#btn_confirm').on({
						click : function(btn) {
						var win = btn.up('window');
						   var arr = [];
							var grid = win.down('#SupplyInvoice');
							var recs = grid.getSelectionModel().getSelection();
							if (recs.length > 0) {
								for (var i = 0; i < recs.length; i++) {
									if (recs[i].get('csbh') != recs[0].get('csbh')) {
										Ext.Msg.alert('提示', '请选择相同的厂商！')
										return;
									}
									var rec_result = erp.Const.callServiceMethodSync('payapply/supplyinvoice.act?method=getSupplyInvoiceImpDetailList',{fplb:recs[i].get('fplb'),fphm:recs[i].get('fphm')});
									arr[i] = rec_result;
								}
							}else{
								Ext.Msg.alert('提示','请选择至少一条记录！');
								return;
							}
							for (var i = 0; i < recs.length; i++){
								for(j=0;j<arr[i].length;j++){
								var record = arr[i][j];
								var r = Ext.create('erp.payApply.model.SupplyInvoice', {
									sqxh : zStore.max('sqxh') == null? 1: zStore.max('sqxh') + 1,
									fplb : record.fplb,
									fphm : record.fphm,
									bmmc : record.bmmc,
									hsbm : record.hsbm,
									jzrq : record.jzrq,
									fpje : record.rkje,
									wbje : record.wbje,
									sqje : record.wqje,
									wbbh : recs[0].get('wbbh'),
									wbdh : recs[0].get('wbdh'),
									wbhl : record.wbhl,
									kprq : record.kprq,
									ycbj : record.ycbj,
									wbsq : record.wqwb		
								});								
								zStore.add(r);	
								s_sqje += record.wqje;
								s_wbje += record.wqwb;
								formrec.set('wbhl', record.wbhl);
								}
							}
							    formrec.set('sqje', Ext.util.Format.round(s_sqje,2));
								formrec.set('wbje', Ext.util.Format.round(s_wbje,2));
								formrec.set('yhbh', recs[0].get('yhbh'));
								formrec.set('csmc', recs[0].get('csmc'));
								formrec.set('csbh', recs[0].get('csbh'));
								formrec.set('yfkbj', 0);
								formrec.set('khyh', recs[0].get('khyh'));
								formrec.set('cszh', recs[0].get('cszh'));
								formrec.set('fktj', recs[0].get('fktj'));
								formrec.set('fkts', recs[0].get('fkts'));
								formrec.set('bzsm', recs[0].get('bzsm'));
								formrec.set('wbbh', recs[0].get('wbbh'));
								formrec.set('wbhl', recs[0].get('wbhl'));
								formrec.set('ztdw', recs[0].get('ztdw'));
								if(formrec.get('hdbj')!=1){
								formrec.set('skdwmc', recs[0].get('fptt'));
								formrec.set('skdw', recs[0].get('fpttbh'));
								}
								form.loadRecord(formrec);
						win.close();
					}
				});
				win.show();
			}
			if(sjly=='采购合同'){
				   
					if(yfkbj==0){
						Ext.Msg.alert('提示', '只有预付的付款申请才能导入采购合同!');
						return;
					}
					 if(csbh==null || csbh == ''){
				     Ext.Msg.alert('提示','供货厂商不能为空！');
				     return;
				    }
				    //采购合同不允许重复导入相同合同号 2016.7.25 舒飞
				    var cghtedit_store = panel.cghtStore;
				    var cghtedit_htbh = new Array();
				    if(cghtedit_store.getCount()>0){
				    	for(var i=0;i<cghtedit_store.getCount();i++){
				    		var cghtedit_rec = cghtedit_store.getAt(i);
				    		cghtedit_htbh.push(cghtedit_rec.get('htbh'));
				    	}			    	
				    }				    
					var win = Ext.widget('Imp_PurchaseAgreement',{
						csbh:csbh
					});
					win.down('#btn_confirm').on({
						click : function(btn) {
						var win = btn.up('window');
						var grid = win.down('#PurchaseAgreement');
						var recs = grid.getSelectionModel().getSelection();
						var sqxh = zStore.max('sqxh') == null ? 1 : zStore.max('sqxh') + 1;
						var nrecs =new Array();
						if (recs.length < 1) {
							Ext.Msg.alert('提示','请选择至少一条记录！');
							return;
						}
						for(x in recs){	
							var bool=false;
							if(cghtedit_htbh.length >0){
								Ext.Array.each(cghtedit_htbh,function(s_htbh){
									if(recs[x].get('htbh')==s_htbh){
										Ext.Msg.alert('提示','合同编号：'+recs[x].get('htbh')+'号合同在本次申请中已经导入，不允许重复导入!');
										bool=true;
									}
								})
							}
							if(bool){
							  return;
							}
							var r = Ext.create('erp.payApply.model.PurchaseAgreement',{
								sqxh : sqxh,
								hsbm : recs[x].get('hsbm'),
								bmmc : recs[x].get('bmmc'),
								htbh : recs[x].get('htbh'),
								htze : recs[x].get('htze'),
								sqje : recs[x].get('wrje'),
								wbze : recs[x].get('wbze'),
								wbje : recs[x].get('wrwb')								
							});
							nrecs.push(r);
							sqxh++;
							s_sqje += recs[x].get('wrje');
							s_wbje += recs[x].get('wrwb');
							s_htze += recs[x].get('htze');
							s_wbze += recs[x].get('wbze');
						}
						zStore.add(nrecs);
						    var wbhl;
						    if(s_wbje != 0){
						     wbhl = Ext.util.Format.round(s_htze/s_wbze,6);
						     formrec.set('wbhl',wbhl);
						    }
							formrec.set('sqje',Ext.util.Format.round(s_sqje,2));
							formrec.set('wbje',Ext.util.Format.round(s_wbje,2));
							formrec.set('yfkbj',1);
							formrec.set('wbbh',recs[0].get('wbbh'));							
							formrec.set('ztdw', recs[0].get('ztdw'));
							form.loadRecord(formrec);
						win.close();					
					}
				});
				win.show();
			}
			if(sjly=='销售费用'){
					if(yfkbj==1){
						Ext.Msg.alert('提示', '只有非预付的付款申请才能导入销售费用!');
						return;
					}
					 if(csbh==null || csbh == ''){
				     Ext.Msg.alert('提示','供货厂商不能为空！');
				     return;
				    }		
					var win = Ext.widget('Imp_SaleFee',{
						csbh:csbh
					});
					win.down('#btn_confirm').on({
						click : function(btn) {
						var win = btn.up('window');
						var grid = win.down('#SaleFee');
						var recs = grid.getSelectionModel().getSelection();
						if (recs.length < 1) {
							Ext.Msg.alert('提示','请选择至少一条记录！');
							return;
						}
						if(recs.length>1){
							for(var i=1;i<recs.length;i++){
          	                    if(recs[i].get('csbh')!=recs[0].get('csbh')){
          	                         Ext.Msg.alert('提示','请选择相同的厂商！')
          	                         return;
          	                    }
          	                } 
						}		
						var xsfyedit_store = panel.xsfyStore;
						var nrecs =new Array();
						var sqxh = zStore.max('sqxh') == null ? 1 : zStore.max('sqxh') + 1;
						for(var i=0;i<recs.length;i++){
							//销售费用不允许重复导入相同费用号 2016.7.26 舒飞
							var bool = false;
							if(xsfyedit_store.getCount()>0){
				    	      for(var j=0;j<xsfyedit_store.getCount();j++){
				    		   var xsfyedit_rec = xsfyedit_store.getAt(j);
				    		   var xsfyedit_fydh = xsfyedit_rec.get('fydh');
				    		   var xsfyedit_fyxh = xsfyedit_rec.get('fyxh');
				    		   var dr_fydh = recs[i].get('fydh');
				    		   var dr_fyxh = recs[i].get('fyxh');
				    		    if(dr_fydh==xsfyedit_fydh && dr_fyxh==xsfyedit_fyxh){
				    		    	Ext.Msg.alert('提示','费用号：'+recs[i].get('fydh')+'-'+recs[i].get('fyxh')+'号费用单在本次申请中已经导入，不允许重复导入!')
				    		    	bool = true;
				    		    }
				    	       }			    	
				            }
				            if(bool){
				            	return;
				            }
							var r = Ext.create('erp.payApply.model.SaleFee',{
								sqxh : sqxh,
								hsbm : recs[i].get('hsbm'),
								bmmc : recs[i].get('bmmc'),
								sqje : recs[i].get('wqje'),
								fydh : recs[i].get('fydh'),
								fyxh : recs[i].get('fyxh'),
								fyh : recs[i].get('fydh')+'-'+recs[i].get('fyxh'),								
								fyje : recs[i].get('fyje'),
								yfje : recs[i].get('yfje'),
								wbbh : recs[i].get('wbbh'),
								wbdh : recs[i].get('wbdh'),
								wbhl : recs[i].get('wbhl'),
								wbje : recs[i].get('wbje'),
								wbsq : recs[i].get('wqwb')
							});
							nrecs.push(r);
							sqxh++;
							s_sqje += recs[i].get('wqje');
							s_wbje += recs[i].get('wbje');
	                        formrec.set('wbhl',recs[i].get('wbhl'));
						}
						zStore.add(nrecs);
						formrec.set('sqje',Ext.util.Format.round(s_sqje,2));
						formrec.set('wbje',Ext.util.Format.round(s_wbje,2));
						formrec.set('yhbh',recs[0].get('yhbh'));
						formrec.set('csmc',recs[0].get('csmc'));
						formrec.set('csbh',recs[0].get('csbh'));
						formrec.set('khyh',recs[0].get('khyh'));
						formrec.set('yfkbj',0);
						formrec.set('cszh',recs[0].get('cszh'));
						formrec.set('fktj',recs[0].get('fktj'));
						formrec.set('fkts',recs[0].get('fkts'));
						formrec.set('bzsm',recs[0].get('bzsm'));
						form.loadRecord(formrec);
						win.close();
					}
				});
				win.show();
			}
			if(sjly=='采购费用'){
					if(yfkbj==0){
						Ext.Msg.alert('提示', '只有预付的付款申请才能导入采购合同!');
						return;
					}
					 if(csbh==null || csbh == ''){
				     Ext.Msg.alert('提示','供货厂商不能为空！');
				     return;
				    }
					var win = Ext.widget('Imp_PurchaseFee',{
						csbh:csbh
					});
					win.down('#btn_confirm').on({
						click : function(btn) {
						var win = btn.up('window');
						var grid = win.down('#PurchaseFee');
						var rec = grid.getSelectionModel().getSelection();
						var cgfyedit_store = panel.cgfyStore;
						var nrecs =new Array();
						var sqxh = zStore.max('sqxh') == null ? 1 : zStore.max('sqxh') + 1;
						if (rec.length < 1) {
							Ext.Msg.alert('提示','请选择至少一条记录！');
							return;
						}
						Ext.each(rec,function(rec1){
							//采购费用不允许重复导入相同费用号 2016.7.26 舒飞						
							var bool = false;
							if(cgfyedit_store.getCount()>0){
				    	      for(var j=0;j<cgfyedit_store.getCount();j++){
				    		   var cgfyedit_rec = cgfyedit_store.getAt(j);
				    		   var cgfyedit_fydh = cgfyedit_rec.get('fydh');
				    		   var cgfyedit_fyxh = cgfyedit_rec.get('fyxh');
				    		   var dr_fydh = rec1.get('fydh');
				    		   var dr_fyxh = rec1.get('fyxh');
				    		    if(dr_fydh==cgfyedit_fydh && dr_fyxh==cgfyedit_fyxh){
				    		    	Ext.Msg.alert('提示','费用号：'+rec1.get('fydh')+'-'+rec1.get('fyxh')+'号费用单在本次申请中已经导入，不允许重复导入!')
				    		    	bool = true;
				    		    }
				    	       }			    	
				            }
				            if(bool){
				            	return;
				            }
						  	var r = Ext.create('erp.payApply.model.PurchaseFee',
							{
							sqxh : sqxh,
							hsbm : rec1.get('hsbm'),
							bmmc : rec1.get('bmmc'),
							fydh : rec1.get('fydh'),
							fyxh : rec1.get('fyxh'),
							fyh : rec1.get('fyh'),
							fyje : rec1.get('fyje'),
							sqje : rec1.get('wqje'),
							wbbh : rec1.get('wbbh'),
							wbdh : rec1.get('wbdh'),
							wbhl : rec1.get('wbhl'),
							wbje : rec1.get('wbje'),
							wbsq : rec1.get('wqwb')
							});	
							nrecs.push(r);
							sqxh++;
							s_sqje += rec1.get('wqje');
							s_wbje += rec1.get('wbje');
							s_fyje += rec1.get('fyje');
						});
						zStore.add(nrecs);
						var wbhl;
						if(s_wbje != 0){
						  wbhl = Ext.util.Format.round(s_fyje/s_wbje,6);
						  formrec.set('wbhl',wbhl);
						}
						formrec.set('sqje',Ext.util.Format.round(s_sqje,2));
						formrec.set('wbbh',rec[0].get('wbbh'));						
//						formrec.set('wbhl',rec[0].get('wbdh'));
//						formrec.set('wbhl',rec[0].get('wbhl'));
						formrec.set('wbje',Ext.util.Format.round(s_wbje,2));
						formrec.set('yhbh',rec[0].get('yhbh'));
						formrec.set('csmc',rec[0].get('csmc'));
						formrec.set('csbh',rec[0].get('csbh'));
//						formrec.set('skdw',rec[0].get('csmc'));
						formrec.set('yfkbj',1);
						formrec.set('khyh',rec[0].get('khyh'));
						formrec.set('cszh',rec[0].get('cszh'));
						formrec.set('fktj',rec[0].get('fktj'));
						formrec.set('fkts',rec[0].get('fkts'));
						formrec.set('bzsm',rec[0].get('bzsm'));
//						formrec.set('ztmc',rec[0].get('ztmc'));
						formrec.set('ztdw',rec[0].get('ztdw'));
						form.loadRecord(formrec);
						win.close();
					}
				});
				win.show();
			}
			if(sjly=='费用报销'){
					if(yfkbj==1){
						Ext.Msg.alert('提示', '只有非预付的付款申请才能导入费用报销!');
						return;
					}
					 if(csbh==null || csbh == ''){
				     Ext.Msg.alert('提示','供货厂商不能为空！');
				     return;
				    }
					var win = Ext.widget('Imp_FeeReimbursement',{
						csbh:csbh
					});
					win.down('#btn_confirm').on({
						click : function(btn) {
						var win = btn.up('window');
						var grid = win.down('#FeeReimbursement');
						var recs = grid.getSelectionModel().getSelection();
						var nrecs =new Array();
						var sqxh = zStore.max('sqxh') == null ? 1 : zStore.max('sqxh') + 1;
						var fybxedit_store = panel.fybxStore;
						if (recs.length < 1) {
							Ext.Msg.alert('提示','请选择至少一条记录！');
							return;
						}
						for(x in recs){	
							//费用报销不允许重复导入相同费用号 2016.7.26 舒飞						
							var bool = false;
							if(fybxedit_store.getCount()>0){
				    	      for(var j=0;j<fybxedit_store.getCount();j++){
				    		   var fybxedit_rec = fybxedit_store.getAt(j);
				    		   var fybxedit_jlbh = fybxedit_rec.get('jlbh');
				    		   var fybxedit_jlxh = fybxedit_rec.get('jlxh');
				    		   var dr_jlbh = recs[x].get('jlbh');
				    		   var dr_jlxh = recs[x].get('jlxh');
				    		    if(dr_jlbh==fybxedit_jlbh && dr_jlxh==fybxedit_jlxh){
				    		    	Ext.Msg.alert('提示','费用号：'+dr_jlbh+'-'+dr_jlxh+'号费用单在本次申请中已经导入，不允许重复导入!')
				    		    	bool = true;
				    		    }
				    	       }			    	
				            }
				            if(bool){
				            	return;
				            }
							
							var r = Ext.create('erp.payApply.model.FeeReimbursement',{
						    sqxh : sqxh,
							hsbm : recs[x].get('hsbm'),
							bmmc : recs[x].get('bmmc3'),
							bxh : recs[x].get('jlh'),
							jlbh : recs[x].get('jlbh'),
							jlxh : recs[x].get('jlxh'),
							bxje : recs[x].get('hjje'),
							sqje : recs[x].get('hjje'),
							wbbh : recs[x].get('wbbh'),
							wbdh : recs[x].get('wbdh'),
							wbhl : recs[x].get('wbhl')
						     });
						     nrecs.push(r);
						     sqxh++;
						     s_sqje += recs[x].get('hjje');
							 s_wbje += recs[x].get('wqwb');							
						}
						zStore.add(nrecs);
						formrec.set('sqje',Ext.util.Format.round(s_sqje,2));
//						formrec.set('wbbh',recs[x].get('wbbh'));
//						formrec.set('wbdh',recs[x].get('wbdh'));
						formrec.set('yfkbj',0);
						formrec.set('wbhl',recs[x].get('wbhl'));
						formrec.set('wbje',Ext.util.Format.round(s_wbje,2));
						form.loadRecord(formrec);
						win.close();
					}
				});
				win.show();
			}
			if(sjly=='职工工资'){
					if(yfkbj==1){
						Ext.Msg.alert('提示', '只有非预付的付款申请才能导入职工工资!');
						return;
					}
					 if(csbh==null || csbh == ''){
				     Ext.Msg.alert('提示','供货厂商不能为空！');
				     return;
				    }
					var win = Ext.widget('EmployeeSalaryChoose',{});
					win.show();
			}
			break;
			case 'imp_search' :
			 if(formrec.get('sjly') == '采购合同'){
			 var mx_rec = zGrid.getSelectionModel().getSelection()[0];
			 if(Ext.isEmpty(mx_rec)){
			   Ext.Msg.alert('提示','请选择预付款明细后使用该功能！');
			   return;
			 }			 		 
			 var htbh = mx_rec.get('htbh');
			 var panel = erp.Util.addContentTab({
					xtype : 'contract_detail',
					itemId : 'ContractDetail',										
					htbh : htbh
				});

			 }
			break;
			case 'imp_delete' :
				var sel_recs = zGrid.getSelectionModel().getSelection();
				if (Ext.isEmpty(sel_recs)) {
					Ext.Msg.alert('提示', '请先选中至少一条记录');
					return;
				}
				zStore.remove(sel_recs);
				var len = zStore.getCount();
				var sqje = 0;
				var wbje = 0;
				for(var i=0;i<len;i++){
				  record = zStore.getAt(i);
				  sqje += record.get('sqje');
				  wbje += record.get('wbje');
				}
				formrec.set('sqje',Ext.util.Format.round(sqje,2));
				formrec.set('wbje',Ext.util.Format.round(wbje,2));
				form.loadRecord(formrec);
			break;
			case 'imp_BTN' :	
			    //2016.08.19保存前验证明细条数是否>0，小于0不允许保存
			    var cont = zStore.getCount();
			    if(cont<1){
			    	Ext.Msg.alert('提示','导入的明细条数为空，请导入后再保存！')
			    	return;
			    }
				//保存前申请金额，外币金额验证
				formrec.set('sqrq',Ext.util.Format.date(new Date(),'Y-m-d H:i:s'));
				if(formrec.get('sqje')<0){
				  Ext.Msg.alert('提示','申请总额小于0，不允许保存!');
			      return;
				}
				if(formrec.get('wbje')<0){
				  Ext.Msg.alert('提示','外币申请总额小于0，不允许保存!');
			      return;
				}
                //保存前付款方式验证
			    if(formrec.get('fkfs')==null || Ext.util.Format.trim(formrec.get('fkfs'))==''){
			     Ext.Msg.alert('提示','请选择付款方式');
			     return;
			    }
			    //保存前主体单位验证
			    if(formrec.get('ztdw')==null || Ext.util.Format.trim(formrec.get('ztdw'))==''){
			     Ext.Msg.alert('提示','主体单位不能为空！');
			     return;
			    }
			    //保存前申请部门验证
			    if(Ext.isEmpty(formrec.get('sqbm'))){
			     Ext.Msg.alert('提示','申请部门不能为空！');
			     return;
			    }
			    //保存前付款期限验证
			    if(Ext.isEmpty(formrec.get('fkqx'))){
			      Ext.Msg.alert('提示','付款期限不能为空！');
			      return;
			    }
			    //用途摘要长度验证
			    var ytzy = formrec.get('yotu');
			    var sum = 0;
			    for ( var i = 0; i < ytzy.length; i++) {
			        var c = ytzy.charCodeAt(i);
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
				//备注说明长度验证
				 var beizhu = formrec.get('bzsm');
				 var s_sum = 0;
			     for ( var i = 0; i < beizhu.length; i++) {
			        var c = beizhu.charCodeAt(i);
			        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
			            s_sum++;
			        } else {
			            s_sum += 2;
			        }
			     }
			     if(s_sum>250){
				 Ext.Msg.alert('提示','备注说明总字节数不能超过250个(汉字算2个)');
				 return;
				}
			     //保存前开户银行验证
			    var confirmmsg = '是否确认保存?';
			    if(formrec.get('khyh')==null || Ext.util.Format.trim(formrec.get('khyh'))==''){
			        confirmmsg = '开户银行为空,是否确认保存?';
			    }
			    //保存前收款单位验证
			    if((formrec.get('skdw')==null || Ext.util.Format.trim(formrec.get('skdw'))=='') 
			        && (formrec.get('sjly')=='供应发票' || formrec.get('sjly')=='采购合同' || formrec.get('sjly')=='采购费用')){
			     Ext.Msg.alert('提示','数据来源为'+formrec.get('sjly')+'时收款单位不能为空!');
			     return;
			    }
			    //保存前厂商名称验证
			    if((formrec.get('csbh')==null || Ext.util.Format.trim(formrec.get('csbh'))=='') 
			        && (formrec.get('sjly')=='供应发票' || formrec.get('sjly')=='采购合同' || formrec.get('sjly')=='采购费用')){
			     Ext.Msg.alert('提示','数据来源为'+formrec.get('sjly')+'时收款单位不能为空!');
			     return;
			    }
			    //保存前预付款标记验证
			    if(formrec.get('sjly')=='采购合同' || formrec.get('sjly')=='采购费用'){
			    	if(formrec.get('yfkbj')==0){
				    	Ext.Msg.alert('提示','数据来源为'+formrec.get('sjly')+'时必须为打上预付款标记!');
				        return;
			    	}			      
			    }else{
			        if(formrec.get('yfkbj')==1){
			            Ext.Msg.alert('提示','数据来源为'+formrec.get('sjly')+'时必须为非预付款!');
				        return;
			        }
			    }
			    var count = zStore.getCount();
			    if(count > 0 && formrec.get('sjly')=='采购合同'){
			        for(var k=0;k<count;k++){
			    	var k_rec = zStore.getAt(k);
			    	var ls_htbh = k_rec.get('htbh');
			    	var ls_wbbh = formrec.get('wbbh');
			    	var s_sqbh = formrec.get('sqbh');
			    	if(panel.isAdd){
			    	   var addPanel = "1";
			    	}else{
			    	   var addPanel = "0";
			    	}
			    	var result = erp.Const.callServiceMethodSync('payapply/payapply.act?method=getCheckHTMoney',
			    		{isAdd:addPanel,htbh:ls_htbh,wbbh:ls_wbbh,sqbh:s_sqbh,sqje:k_rec.get('sqje'),wbje:k_rec.get('wbje'),rowCount:k+1
			    		});
			    	var data = Ext.decode(result);
			    	if(!data.bool){
			    	  Ext.Msg.alert('提示',data.msg);
			    	  return;
			    	}			    			    	
			      }
			    }
			    if(count > 0 && formrec.get('sjly')=='采购费用'){
			        for(var k=0;k<count;k++){
			    	var k_rec = zStore.getAt(k);
			    	var ls_fydh = k_rec.get('fydh');
			    	var ls_fyxh = k_rec.get('fyxh');
			    	var s_sqbh = formrec.get('sqbh');
			    	if(panel.isAdd){
			    	   var addPanel = "1";
			    	}else{
			    	   var addPanel = "0";
			    	}
			    	var result2 = erp.Const.callServiceMethodSync('payapply/payapply.act?method=getCheckCGMoney',
			    		{isAdd:addPanel,sqbh:s_sqbh,sqje:k_rec.get('sqje'),rowCount:k+1,fydh:ls_fydh,fyxh:ls_fyxh
			    		});
			    	var data = Ext.decode(result2);
			    	if(!data.bool){
			    	  Ext.Msg.alert('提示',data.msg);
			    	  return;
			    	}			    			    	
			      }
			    }
			    var bool = false;
			    if(count > 0 && formrec.get('sjly')=='供应发票'){
			    	for(var k=0;k<count;k++){
			    	var k_rec = zStore.getAt(k);
			    	var ls_sqxh = k_rec.get('sqxh');
			    	var ls_hsbm = k_rec.get('hsbm');
			    	var ls_fplb = k_rec.get('fplb');
			    	var ls_fphm = k_rec.get('fphm');
			    	var ls_fpje = k_rec.get('fpje');
			    	var ls_sqje = k_rec.get('sqje');
			    	if(ls_hsbm == null || ls_hsbm==''){
				    	Ext.Msg.alert('提示','核算部门不允许为空!')
				        return;
			    	}
			    	//TODO
			    	var checkSqje = erp.Const.callServiceMethodSync('payapply/payapply.act?method=getCheckApplyMoney',
			    		  {sqbh:formrec.get('sqbh'),fplb:ls_fplb,fphm:ls_fphm,hsbm:ls_hsbm,fpje:ls_fpje,sqje:ls_sqje,rowCount:k+1,wbbh:k_rec.get('wbbh'),
			    		  wbje:k_rec.get('wbje'),wbsq:k_rec.get('wbsq') 
			    		 });			    		
			    	var data = Ext.decode(checkSqje);
			    	if(!data.bool){
			    	  Ext.Msg.alert('提示',data.msg);
			    	  return;
			    	}
			    	
					    zStore.each(function(z_rec){					     			     
					     var ls_hsbm1 = z_rec.get('hsbm');
					     var ls_fplb1 = z_rec.get('fplb');
					     var ls_fphm1 = z_rec.get('fphm');
					     var ls_sqxh1 = z_rec.get('sqxh');					     
					     if(ls_hsbm==ls_hsbm1 && ls_sqxh != ls_sqxh1 && ls_fplb==ls_fplb1 && ls_fphm==ls_fphm1){
					      bool = true;
					     }
					    });
			    	}
			    }
			    if(bool){
			     Ext.Msg.alert('提示','同一核算部门下相同张发票不允许同时导入两次！')
			     return;
			    }
				Ext.Msg.confirm('提示', confirmmsg, function(btn) {
					if (btn == 'yes') {						
						formrec.set('czsj',new Date());
						// 还贷不需检测，非还贷需要检测是否还有贷款记录，并进行抵押额检测2016/6/7
						var ls_hdbj = 0;
						var ls_sqje_ze = formrec.get('sqje');
						if(formrec.get('hdbj')==1){
							ls_hdbj = 1;
						}
						var csbh = formrec.get('csbh');
						var sqbh = formrec.get('sqbh');
						var ls_skdw = formrec.get('skdw');						
						if(ls_hdbj == 0 ){
							var ls_zyze = erp.Const.callServiceMethodSync('payapply/payapply.act?method=getZyze',{ csbh : csbh });
							if (ls_zyze==null){
								ls_zyze = 0;
							}	
							if (ls_zyze != 0){
								Ext.Ajax.setTimeout(120000);
						        Ext.getBody().mask('正在检测厂商质押额度，请等待......');								
							var today = new Date();
							var nf_today = today.getYear();
							var nf_today = today.getYear();
							var nf_today = today.getYear();
							var ls_jznf = erp.Const.callServiceMethodSync('payapply/payapply.act?method=getJznf');
							// 厂商应付总额
							var ls_csyfze = erp.Const.callServiceMethodSync('payapply/payapply.act?method=getCsyfze',{csbh:csbh,ls_jznf:ls_jznf});
							if(ls_csyfze == null){ls_csyfze = 0;}
							// 已申请未支付金额
							ls_ysqje = erp.Const.callServiceMethodSync('payapply/payapply.act?method=getYsqje',{csbh:csbh,sqbh:sqbh});
							if(ls_ysqje == null){ls_ysqje = 0;}
							var a = Ext.util.Format.round(ls_csyfze -ls_ysqje - ls_sqje_ze,2);							
							var b = Ext.util.Format.round(ls_zyze,2);
							Ext.getBody().unmask();
							if(a<b){
								Ext.Msg.alert('提示','申请生效后的应付余额少于该厂商的质押额度！应付余额:'+a+' 质押额度：'+b);
								return;
							}
						 }
						}else{
						  var result = erp.Const.callServiceMethodSync('payapply/payapply.act?method=getSkdwList',{csbh:csbh});
						  var data = Ext.decode(result);
						  var ls_hddw1 = data.hddw;
						  var ls_hddw2 = data.hddw2;
						  if(ls_hddw1==null){
						     ls_hddw1 = '';
						  }
						  if(ls_hddw2==null){
						     ls_hddw2 = '';
						  }
						  if(ls_hddw1==''){
						     Ext.Msg.alert('提示','厂商未维护还贷单位，不可进行还贷！');
						     return 
						  }
						  if (ls_hddw1!=ls_skdw && ls_hddw2!=ls_skdw){
						     Ext.Msg.alert('提示','收款单位与厂商的还贷单位不一致，不可还贷！');
						     return;
						  }
						}
						
						var myMask = new Ext.LoadMask({
						  target : panel
						});
						if (panel.isAdd) {
							formrec.phantom =true;
							myMask.mask('数据保存中...');
							var data2 = '';
							zStore.each(function(dr){
										data2 = data2 + Ext.encode(dr.data)+',';
									});
							var data3 = '['+data2.substring(0,data2.lastIndexOf(','))+']';
							console.log(data3);
							console.log(Ext.encode(formrec.data));
							var result = erp.Const.callServiceMethodSync(
											'payapply/payapply.act?method=addPayApplyCustom', {
											data1:'['+Ext.encode(formrec.data)+']',data3:data3
										});
							myMask.unmask();
							var data = Ext.decode(result);	
							console.log(result);
							console.log(data);
							
							if(data.bool){
								Ext.toastInfo('保存成功!');	
								panel.isAdd = false;
								panel.close();									
								me.grdStore.loadPage(1);
							}else{
								Ext.toastInfo('保存失败，请联系管理员!');	
							}							
							/*return;			
							dStore.add(formrec);
							dStore.sync(								
							   {success : function(batch , option) {							   	
								var nrecs=option.operations.create;
								if(nrecs.length>0){
									var nrec=nrecs[0];
									zStore.each(function(dr){
										dr.set('sqbh',nrec.get('sqbh'));
									});
									zStore.sync({
										callback:function(){					
										}
									});
									myMask.unmask();
					                Ext.toastInfo('保存完毕!');
									panel.isAdd = false;
									panel.close();									
									me.grdStore.loadPage(1);
								}
							}});*/
						} else { 
								myMask.mask('数据保存中...');
								var data2 = '';
								Ext.each(zStore.getModifiedRecords(),function(dr){
											data2 = data2 + Ext.encode(dr.data)+',';
										});
								var data3 = '['+data2.substring(0,data2.lastIndexOf(','))+']';
								console.log(data3);
								console.log(Ext.encode(formrec.data));
								var result = erp.Const.callServiceMethodSync(
												'payapply/payapply.act?method=updatePayApplyCustom', {
												data1:'['+Ext.encode(formrec.data)+']',data3:data3
											});
								myMask.unmask();
								var data = Ext.decode(result);								
								if(data.bool){
									Ext.toastInfo('保存成功!');										
								}else{
									Ext.toastInfo('保存失败，请联系管理员!');	
								}										
					           	/*var result = erp.Const.callServiceMethodSync(
											'payapply/payapply.act?method=updatePayApply', {
											data:'['+Ext.encode(formrec.data)+']'
										});								
								var data = result;
					           	var nrec = Ext.create('erp.payApply.model.PayApply',data[0]);
					           	if(nrec.get('sqbh')<=0){
					           	  Ext.toastInfo('保存异常请重试!');
								  myMask.unmask();
								  return;
					           	}
					           		Ext.each(zStore.getModifiedRecords(),function(dr){
									dr.set('sqbh',formrec.get('sqbh'));
									 });
								zStore.sync({callback:function(){}});
								myMask.unmask();
								Ext.toastInfo('保存完毕!');*/
						}
					}
				});
			break;
		}
	},
	saveAll : function (rec,form,edtPanel,zStore){
			var myMask = new Ext.LoadMask({
					target : edtPanel
				});
			var login_id=erp.Util.currentUser.loginId;
			var ip=erp.Util.currentUser.IP;
			myMask.mask('数据验证中...');
			var result = erp.Const.callServiceMethodSync(
			'payapply/payapply.act?method=getSaveBefore', {
			 rec:Ext.encode(rec.data),login_id:login_id,ip:ip
		    });
		    form.loadRecord(rec);
		    myMask.unmask();
		    var data = Ext.decode(result);
		    if(!data.bool){
		      Ext.toastErrorInfo(data.msg);
		      return;
		    }
		    var oldSqbh = rec.get('sqbh');
		    Ext.Msg.confirm('提示', '是否确认保存?', function(btn) {
		        if (btn == 'yes') {
		           if (edtPanel.isAdd) {
		           //新增界面	
		           	myMask.mask('数据保存中...');
		           	var result = erp.Const.callServiceMethodSync(
								'payapply/payapply.act?method=addPayApply', {
								data:'['+Ext.encode(rec.data)+']'
							});
		           	var data = result;
		           	var nrec = Ext.create('erp.payApply.model.PayApply',data[0]);
		           	if(nrec.get('sqbh')<=0){
		           	  Ext.toastInfo('保存异常请重试!');
					  myMask.unmask();
					  return;
		           	}
		           	zStore.each(function(dr){
							dr.set('sqbh',nrec.get('sqbh'));
						});
						zStore.sync({
							callback:function(){
							/*gyfpStore.load({params:{sqbh:nrec.get('sqbh')}});*/
							}
						});	
					myMask.unmask();
					Ext.toastInfo('保存完毕!');
					edtPanel.isAdd=false;
		           }else{
		           //编辑界面
		           	myMask.mask('数据保存中...');
		           	var result = erp.Const.callServiceMethodSync(
								'payapply/payapply.act?method=updatePayApply', {
								data:'['+Ext.encode(rec.data)+']'
							});
					var data = result;
		           	var nrec = Ext.create('erp.payApply.model.PayApply',data[0]);
		           	if(nrec.get('sqbh')<=0){
		           	  Ext.toastInfo('保存异常请重试!');
					  myMask.unmask();
					  return;
		           	}
		           		Ext.each(zStore.getNewRecords(),function(dr){
						dr.set('sqbh',rec.get('sqbh'));
						 });
					zStore.sync({callback:function(){}});
					myMask.unmask();
					Ext.toastInfo('保存完毕!');
		           }
		        }
		    	
		    })
	}
})
