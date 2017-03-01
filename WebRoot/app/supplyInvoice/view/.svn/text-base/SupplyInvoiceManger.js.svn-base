Ext.define('erp.supplyInvoice.view.SupplyInvoiceManger', {
	extend : 'erp.ux.Panel',
	alias : 'widget.mng_SupplyInvoice',
	initComponent : function() {
		var me = this;
		me.can_use_btn = true;
		Ext.apply(me.store.proxy.extraParams, {
			begin_date : me.begin_date,
			end_date : me.end_date,
			gsbj : me.gsbj,
			czyh : me.czyh,
			usePaging : true
		});
		Ext.apply(me, {
			layout : {
				type : 'border',
				padding : 2
			},
			dockedItems : [ {
				xtype : 'toolbar',
				dock : 'top',
				itemId : 'function_btn',
				items : [
				/*
				 * {text : '添加', iconCls:'page_add', itemId:'btn_add',disabled :
				 * me.hasPay}, {text : '编辑', iconCls:'page_edit',
				 * itemId:'btn_edt'}, {text : '删除', iconCls:'page_delete',
				 * itemId:'btn_del',disabled : me.hasPay}, {text : '提交',
				 * iconCls:'stamp', itemId:'btn_commit'}, {text : '审批',
				 * iconCls:'email_edit', itemId:'btn_appro',disabled : true},
				 */
				{
					text : '筛选',
					glyph : 0xf002,
					itemId : 'btn_query'
				}, {
					text : '工行信息更新',
					iconCls:'refresh_backwards',
					 handler:function(){
						 if(me.store.proxy.extraParams.gsbj==null){
							 me.store.proxy.extraParams.gsbj = 1;
						 }
	  				    	me.store.load();
	  				    },
					itemId : 'btn_refresh'
				},
				/*
				 * {text:'刷新',iconCls:'refresh_backwards', handler:function(){
				 * me.store.loadPage(1); }}, {text : '批量修改',
				 * iconCls:'page_edit', itemId:'btn_batch'},
				 */
				{
					text : '退出',
					iconCls : '',
					itemId : 'btn_out',
					handler : function() {
						me.close();
					}
				} ]
			} ],
			items : [ {
				flex : 1,
				region : 'center',
				xtype : 'grid',
				itemId : 'grd_SupplyInvoice',
				overflowY : 'auto',
				overflowX : 'auto',
				selModel : Ext.create('Ext.selection.CheckboxModel'),
				 features: [{
				        ftype: 'summary',
				        summaryType: 'count',
						dock: 'bottom'
				    }], 
				columns : [ {
					header : '已传',
					width : 40,
					dataIndex : 'ycbj',
					renderer : erp.Util.Staterenderer,
					 sumaryType: 'count',
			         summaryRenderer: function(value, summaryData, dataIndex) {
				                 return '合计';
				            }   
				},{
					header : '待传',
					width : 40,
					dataIndex : 'dcbj',
					renderer : erp.Util.Staterenderer
				},  
				{
					header : '审核',
					width : 40,
					dataIndex : 'shbj',
					renderer : erp.Util.Staterenderer
				}, {
					header : '递送',
					width : 40,
					dataIndex : 'dsbj',
					renderer : erp.Util.Staterenderer
				}, {
					header : '入账',
					width : 40,
					dataIndex : 'yfbj',
					renderer : erp.Util.Staterenderer
				}, {
					header : '冻结',
					width : 40,
					dataIndex : 'djbj',
					renderer : erp.Util.Staterenderer
				}, {
					header : '发票类型',
					width : 100,
					dataIndex : 'fplx'
				}, {
					header : '发票代码',
					width : 100,
					dataIndex : 'fplb'
				}, {
					header : '发票号码',
					width : 100,
					dataIndex : 'fphm'
				}, {
					header : '主发票号',
					width : 100,
					dataIndex : 'zfph'
				}, {
					header : '开票日期',
					width : 120,
					dataIndex : 'kprq',
					xtype:'datecolumn',format:'Y-m-d'
				}, {
					header : '记账日期',
					width : 120,
					dataIndex : 'jzrq',
					xtype:'datecolumn',format:'Y-m-d'
				}, {
					header : '预计付款日期',
					width : 120,
					dataIndex : 'yjfkrq',
					xtype:'datecolumn',format:'Y-m-d'
				}, {
					header : '所属用户',
					width : 100,
					dataIndex : 'yhbh',
					 renderer : function(v){
					     	if(v=='000001'){
					     	 return '恒丰皮革';
					     	}
					     }
				}, {
					header : '厂商名称',
					width : 200,
					dataIndex : 'csmc'
				}, {
					header : '采购员',
					width : 60,
					dataIndex : 'cgym'
				}, {
					header : '发票数量',
					width : 80,
					dataIndex : 'fpsl',
					summaryType: 'sum',
				      summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000') ;
					  }, 
					  renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000') ;
					            },
				      renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}
				}, {
					header : '发票金额',
					width : 100,
					dataIndex : 'fpje',
					renderer:function(v){
						  return Ext.util.Format.number(v,'0,000.00');
						   },
						  summaryType: 'sum',
					      summaryRenderer: function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						  }, 
						  renderer:function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						            }
				}, {
					header : '－预付金额',
					width : 100,
					dataIndex : 'yfkje',
					renderer:function(v){
						  return Ext.util.Format.number(v,'0,000.00');
						   },
						  summaryType: 'sum',
					      summaryRenderer: function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						  }, 
						  renderer:function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						            }
				}, {
					header : '－已申请金额',
					width : 100,
					dataIndex : 'sqje',
					renderer:function(v){
						  return Ext.util.Format.number(v,'0,000.00');
						   },
						  summaryType: 'sum',
					      summaryRenderer: function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						  }, 
						  renderer:function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						            }
				}, {
					header : '－质押金额',
					width : 100,
					dataIndex : 'zyje',
					renderer:function(v){
						  return Ext.util.Format.number(v,'0,000.00');
						   },
						  summaryType: 'sum',
					      summaryRenderer: function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						  }, 
						  renderer:function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						            }
				}, {
					header : '＝未申请金额',
					width : 100,
					dataIndex : 'wqje',
					renderer:function(v){
						  return Ext.util.Format.number(v,'0,000.00');
						   },
						  summaryType: 'sum',
					      summaryRenderer: function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						  }, 
						  renderer:function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						            }
				}, {
					header : '除税金额',
					width : 100,
					dataIndex : 'csje',
					renderer:function(v){
						  return Ext.util.Format.number(v,'0,000.00');
						   },
						  summaryType: 'sum',
					      summaryRenderer: function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						  }, 
						  renderer:function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						            }
				}, {
					header : '税额',
					width : 100,
					dataIndex : 'zzse',
					renderer:function(v){
						  return Ext.util.Format.number(v,'0,000.00');
						   },
						  summaryType: 'sum',
					      summaryRenderer: function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						  }, 
						  renderer:function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						            }
				}, {
					header : '币种',
					width : 60,
					dataIndex : 'wbbh'
				}, {
					header : '汇率',
					width : 80,
					dataIndex : 'wbhl'
				}, {
					header : '外币金额',
					width : 100,
					dataIndex : 'wbje',
					renderer:function(v){
						  return Ext.util.Format.number(v,'0,000.00');
						   },
						  summaryType: 'sum',
					      summaryRenderer: function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						  }, 
						  renderer:function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						            }
				}, {
					header : '－外币预付',
					width : 100,
					dataIndex : 'wbyfk',
					renderer:function(v){
						  return Ext.util.Format.number(v,'0,000.00');
						   },
						  summaryType: 'sum',
					      summaryRenderer: function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						  }, 
						  renderer:function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						            }
				}, {
					header : '－外币已申请',
					width : 100,
					dataIndex : 'wbsq',
					renderer:function(v){
						  return Ext.util.Format.number(v,'0,000.00');
						   },
						  summaryType: 'sum',
					      summaryRenderer: function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						  }, 
						  renderer:function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						            }
				}, {
					header : '＝外币未申请',
					width : 100,
					dataIndex : 'wqwb',
					renderer:function(v){
						  return Ext.util.Format.number(v,'0,000.00');
						   },
						  summaryType: 'sum',
					      summaryRenderer: function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						  }, 
						  renderer:function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						            }
				}, {
					header : '未结发票总额',
					width : 100,
					dataIndex : 'wjje',
					renderer:function(v){
						  return Ext.util.Format.number(v,'0,000.00');
						   },
						  summaryType: 'sum',
					      summaryRenderer: function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						  }, 
						  renderer:function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						            }
				}, {
					header : '已提未结总额',
					width : 100,
					dataIndex : 'ycje',
					renderer:function(v){
						  return Ext.util.Format.number(v,'0,000.00');
						   },
						  summaryType: 'sum',
					      summaryRenderer: function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						  }, 
						  renderer:function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						            }
				}, {
					header : '限传金额',
					width : 100,
					dataIndex : 'xcje',
					renderer:function(v){
						  return Ext.util.Format.number(v,'0,000.00');
						   },
						  summaryType: 'sum',
					      summaryRenderer: function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						  }, 
						  renderer:function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						            }
				}, {
					header : '备注说明',
					width : 250,
					dataIndex : 'bzsm'
				}, {
					header : '财务凭证号',
					width : 100,
					dataIndex : 'pzh'
				}, {
					header : '主体单位',
					width : 200,
					dataIndex : 'ztdw'
				}, {
					header : '发票抬头',
					width : 200,
					dataIndex : 'fptt'
				}, {
					header : '抬头账号',
					width : 150,
					dataIndex : 'ttzh'
				}, {
					header : '工行回传信息',
					width : 120,
					dataIndex : 'hcxx'
				}, {
					header : '冻结人',
					width : 100,
					dataIndex : 'djrm'
				}, {
					header : '冻结时间',
					width : 120,
					dataIndex : 'djsj',
					xtype:'datecolumn',format:'Y-m-d H:i:s'
				}, {
					header : '审核人',
					width : 100,
					dataIndex : 'shrm'
				}, {
					header : '审核时间',
					width : 120,
					dataIndex : 'shsj',
					xtype:'datecolumn',format:'Y-m-d H:i:s'
				}, {
					header : '操作人名',
					width : 100,
					dataIndex : 'kprm'
				}, {
					header : '操作时间',
					width : 120,
					dataIndex : 'kpsj',
					xtype:'datecolumn',format:'Y-m-d H:i:s'
				}, {
					header : '递送人',
					width : 100,
					dataIndex : 'dsrm'
				}, {
					header : '递送时间',
					width : 120,
					dataIndex : 'dssj',
					xtype:'datecolumn',format:'Y-m-d H:i:s'
				} ],
				dockedItems : [ {
					xtype : 'pagingbar',
					stateId : "pagingbar"+Ext.id(),
					store : me.store,
					dock : 'bottom',
					defaultPageSize : 50,
					displayInfo : true
				} ],
				store : me.store
			},{
		        region:'south',
				split:true,
				height:300,
				xtype:'tabpanel',
				items: [{
		         itemId:'fpmxPl',
		         title: '发票明细',
		         overflowY : 'auto',
					overflowX : 'auto',
		         items:[{
		            xtype: 'grid',
		            itemId:'grdFpmx',
		            features: [{
				        ftype: 'summary',
						dock: 'bottom'
				    }],
		            columns: [{header: '序号',dataIndex:'fpxh',width:50 ,
		            	sumaryType: 'count',
						 summaryRenderer: function(value, summaryData, dataIndex) {
						 return '合计';}
		            	},
		                      {header: '非核销',dataIndex:'hxlb',width:60,
		            		renderer : erp.Util.Staterenderer},
		                      {header: '核算部门',dataIndex:'hsbm',width:100},
		                      {header: '商品名称',dataIndex:'spmc',width:150 },
		                      {header: '单位',dataIndex:'jldw',width:50 },
		                      {header: '数量',dataIndex:'rksl',width:100,
		                    	  summaryType: 'sum',
		    				      summaryRenderer: function(value, summaryData, dataIndex) {
		    					              	 return Ext.util.Format.number(value,'0,000') ;
		    					  }, 
		    					  renderer:function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000') ;
						            }
		                    	  },
		                      {header: '含税单价',dataIndex:'rkdj',width:100},
		                      {header: '单价（除税）',dataIndex:'csdj',width:100},
		                      {header: '金额（除税）',dataIndex:'csje',width:100,
		                    	  summaryType: 'sum',
							      summaryRenderer: function(value, summaryData, dataIndex) {
								              	 return Ext.util.Format.number(value,'0,000.00') ;
								  }, 
								  renderer:function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						            }
		                    	  },
		                      {header: '税率',dataIndex:'zzsl',width:50 },
		                      {header: '税额',dataIndex:'zzse',width:100  ,
		                    	  summaryType: 'sum',
							      summaryRenderer: function(value, summaryData, dataIndex) {
								              	 return Ext.util.Format.number(value,'0,000.00') ;
								  }, 
								  renderer:function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						            }
		                    	  },
		                      {header: '价税合计',dataIndex:'rkje',width:100,
		                    		  summaryType: 'sum',
								      summaryRenderer: function(value, summaryData, dataIndex) {
									              	 return Ext.util.Format.number(value,'0,000.00') ;
									  }, 
									  renderer:function(value, summaryData, dataIndex) {
							              	 return Ext.util.Format.number(value,'0,000.00') ;
							            }
		                    		  },
		                      {header: '币种',dataIndex:'wbbh',width:60 },
		                      {header: '汇率',dataIndex:'wbhl',width:80 },
		                      {header: '外币单价',dataIndex:'wbdj',width:100},
		                      {header: '外币金额',dataIndex:'wbje',width:100,
		                    	  summaryType: 'sum',
							      summaryRenderer: function(value, summaryData, dataIndex) {
								              	 return Ext.util.Format.number(value,'0,000.00') ;
								  },
								  renderer:function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						            }
		                    	  },
		                      {header: '合同编号',dataIndex:'htbh',width:100 }
		            ],
		         store:me.fpmxStore
		            }]
		         },{
		         itemId:'rkqdPl',
		         title: '入库清单',
		         overflowY : 'auto',
					overflowX : 'auto',
		         items:[{
		            xtype: 'grid',
		            itemId:'grdRkqd',
		            features: [{
				        ftype: 'summary',
						dock: 'bottom'
				    }],
		            columns: [
		            {header:'单据类型',dataIndex:'djlx',width:80,
		            	sumaryType: 'count',
						 summaryRenderer: function(value, summaryData, dataIndex) {
						 return '合计';}
		            	},
		            {header: '费用性质',dataIndex:'fyxz',width:80},
		            {header: '合同号',dataIndex:'hth',width:80},
		            {header: '外协号',dataIndex:'wxh',width:80},
		            {header: '红冲',dataIndex:'hcbj',width:50,
		            	renderer : function(v){
					     	if(v==0){
					     	 return ''
					     	}
					     }
		            	},
		            {header: '仓库名称',dataIndex:'ckbh',width:100},
		            {header: '入库单号',dataIndex:'rkdh',width:80},
		            {header: '序号',dataIndex:'rkxh',width:50},
		            {header: '出运编号',dataIndex:'cybh',width:100},
		            {header: '入库日期',dataIndex:'rkrq',width:100},
		            {header: '客户名称',dataIndex:'khbh',width:80},
		            {header: '材料货号',dataIndex:'clhh',width:80},
		            {header: '材料货号',dataIndex:'plmth',width:80},
		            {header: '事物特性',dataIndex:'plmtx',width:80},
		            {header: '材料名称',dataIndex:'clmc',width:80},
		            {header: '材料特性1',dataIndex:'cltx1',width:80},
		            {header: '材料特性2',dataIndex:'cltx2',width:80},
		            {header: '材料特性3',dataIndex:'cltx3',width:80},
		            {header: '单位',dataIndex:'jldw',width:50},
		            {header: '箱量',dataIndex:'mxzl',width:150},
		            {header: '入库数量',dataIndex:'rksl',width:80,
		            	 summaryType: 'sum',
   				      summaryRenderer: function(value, summaryData, dataIndex) {
   					              	 return Ext.util.Format.number(value,'0,000') ;
   					  } 
		            	},
		            {header: '含税单价',dataIndex:'rkdj',width:80},
		            {header: '含税金额',dataIndex:'rkje',width:80,
		            	 summaryType: 'sum',
					      summaryRenderer: function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						  }
		            	},
		            {header: '税率',dataIndex:'zzsl',width:60},
		            {header: '除税单价',dataIndex:'csdj',width:80},
		            {header: '除税金额',dataIndex:'csje',width:80,
		            	summaryType: 'sum',
					      summaryRenderer: function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						  }
		            	},
		            {header: '税额',dataIndex:'zzse',width:80,
		            		summaryType: 'sum',
						      summaryRenderer: function(value, summaryData, dataIndex) {
							              	 return Ext.util.Format.number(value,'0,000.00') ;
							  }
		            		},
		            {header: '币种',dataIndex:'wbbh',width:80},
		            {header: '辅助单位',dataIndex:'fzdw',width:80},
		            {header: '辅助数量',dataIndex:'fzsl',width:80,
		            	summaryType: 'sum',
	   				      summaryRenderer: function(value, summaryData, dataIndex) {
	   					              	 return Ext.util.Format.number(value,'0,000') ;
	   					  } 
		            	},
		            {header: '汇率',dataIndex:'wbhl',width:80},
		            {header: '外币单价',dataIndex:'wbdj',width:80},
		            {header: '外币金额',dataIndex:'wbje',width:80,
		            	summaryType: 'sum',
					      summaryRenderer: function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						  }
		            	},
		            {header: '入库类别',dataIndex:'rklb',width:80},
		            {header: '送货单号',dataIndex:'shdh',width:80},
		            {header: '送货日期',dataIndex:'shrq',width:80},
		            {header: '采购员',dataIndex:'cgyxm',width:80},
		            {header: '备注说明',dataIndex:'bzsm',width:200}
		            ],
		            store: me.rkqdStore
		         }]
		         },
		         {
		         itemId:'fkmxPl',
		         title:'付款明细',
		         items:[{
		            xtype: 'grid',
		            itemId: 'grdFkmx',
		            features: [{
				        ftype: 'summary',
						dock: 'bottom'
				    }],
		            columns:[
		            {header:'锁定',dataIndex:'sdbj',width:60,
		            	renderer : erp.Util.Staterenderer,
		             sumaryType: 'count',
					 summaryRenderer: function(value, summaryData, dataIndex) {
					 return '合计';}},
		            {header:'单据编号',dataIndex:'zfpzh',width:100},
		            {header:'支付日期',dataIndex:'zfrq',width:100},
		            {header:'支付金额',dataIndex:'zfje',width:100,
		            	summaryType: 'sum',
					      summaryRenderer: function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						  }},
		            {header:'币种',dataIndex:'wbbh',width:60},
		            {header:'汇率',dataIndex:'wbhl',width:60,
		              summaryType: 'sum',
		              summaryRenderer: function(value, summaryData, dataIndex) {
					  return Ext.util.Format.number(value,'0,000.000') ;
					 }},
		            {header:'外币金额',dataIndex:'wbje',width:100,
						 summaryType: 'sum',
					      summaryRenderer: function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						  }},
		            {header:'备注说明',dataIndex:'bzsm',width:200},
		            {header:'合同编号',dataIndex:'htbh',width:100}
		            ],
		            store: me.fkmxStore
		         }]
		         },
		         {
		         	itemId: 'sqfpPl',
		         	title: '申请发票',
		         	items:[{
		         	   xtype:'grid',
		         	   itemId: 'grdSqfp',
		         	  features: [{
					        ftype: 'summary',
							dock: 'bottom'
					    }],
		         	   columns:[
		         	   {header: '申请编号',dataIndex:'sqbh',width:100,
		         		  sumaryType: 'count',
							 summaryRenderer: function(value, summaryData, dataIndex) {
							 return '合计';}},
		         	   {header: '序号',dataIndex:'sqxh',width:60},
		         	   {header: '申请金额',dataIndex:'sqje',width:100,
		         		  summaryType: 'sum',
					      summaryRenderer: function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						  }},
		         	   {header: '已付金额',dataIndex:'yfje',width:100,
		         		  summaryType: 'sum',
					      summaryRenderer: function(value, summaryData, dataIndex) {
						              	 return Ext.util.Format.number(value,'0,000.00') ;
						  }}
		         	   ],
		         	   store: me.sqfpStore
		         	}]
		         },
		         {
			         	itemId: 'sqhtPl',
			         	title: '申请合同',
			         	items:[{
			         	   xtype:'grid',
			         	   itemId: 'grdSqht',
			         	  features: [{
						        ftype: 'summary',
								dock: 'bottom'
						    }],
			         	   columns:[
			         	   {header: '申请编号',dataIndex:'sqbh',width:100,
			         		  sumaryType: 'count',
								 summaryRenderer: function(value, summaryData, dataIndex) {
								 return '合计';}},
			         	   {header: '序号',dataIndex:'sqxh',width:60},
			         	   {header: '核算部门',dataIndex:'hsbm',width:100},
			         	   {header: '合同编号',dataIndex:'htbh',width:100},
			         	  {header: '合同金额',dataIndex:'htze',width:100,
			         		 summaryType: 'sum',
						      summaryRenderer: function(value, summaryData, dataIndex) {
							              	 return Ext.util.Format.number(value,'0,000.00') ;
							  }},
			         	 {header: '申请金额',dataIndex:'sqje',width:100,
			         		 summaryType: 'sum',
						      summaryRenderer: function(value, summaryData, dataIndex) {
							              	 return Ext.util.Format.number(value,'0,000.00') ;
							  }},
			         	{header: '已付金额',dataIndex:'yfje',width:100,
			         		 summaryType: 'sum',
						      summaryRenderer: function(value, summaryData, dataIndex) {
							              	 return Ext.util.Format.number(value,'0,000.00') ;
							  }},
			         	{header: '预付款金额',dataIndex:'yfkje',width:100,
			         		 summaryType: 'sum',
						      summaryRenderer: function(value, summaryData, dataIndex) {
							              	 return Ext.util.Format.number(value,'0,000.00') ;
							  }}
			         	   ],
			         	   store: me.sqhtStore
			         	}]
			         },
			         {
				         	itemId: 'sqfyPl',
				         	title: '申请费用',
				         	items:[{
				         	   xtype:'grid',
				         	   itemId: 'grdSqfy',
				         	  features: [{
							        ftype: 'summary',
									dock: 'bottom'
							    }],
				         	   columns:[
				         	           {header: '申请编号',dataIndex:'sqbh',width:100,
							         		  sumaryType: 'count',
												 summaryRenderer: function(value, summaryData, dataIndex) {
												 return '合计';}},
							         	   {header: '序号',dataIndex:'sqxh',width:60},
							         	   {header: '核算部门',dataIndex:'hsbm',width:100},
							         	   {header: '费用号',dataIndex:'fyh',width:100},
							         	  {header: '费用金额',dataIndex:'fyje',width:100,
							         		 summaryType: 'sum',
										      summaryRenderer: function(value, summaryData, dataIndex) {
											              	 return Ext.util.Format.number(value,'0,000.00') ;
											  }},
							         	 {header: '申请金额',dataIndex:'sqje',width:100,
							         		 summaryType: 'sum',
										      summaryRenderer: function(value, summaryData, dataIndex) {
											              	 return Ext.util.Format.number(value,'0,000.00') ;
											  }},
							         	{header: '已付金额',dataIndex:'yfje',width:100,
							         		 summaryType: 'sum',
										      summaryRenderer: function(value, summaryData, dataIndex) {
											              	 return Ext.util.Format.number(value,'0,000.00') ;
											  }},
							         	{header: '预付款金额',dataIndex:'yfkje',width:100,
							         		 summaryType: 'sum',
										      summaryRenderer: function(value, summaryData, dataIndex) {
											              	 return Ext.util.Format.number(value,'0,000.00') ;
											  }}
				         	   ],
				         	   store: me.sqfyStore
				         	}]
				         },
				         {
					         	itemId: 'yftzPl',
					         	title: '预付调整',
					         	items:[{
					         	   xtype:'grid',
					         	   itemId: 'grdYftz',
					         	  features: [{
								        ftype: 'summary',
										dock: 'bottom'
								    }],
					         	   columns:[
					         	   {header: '锁定',dataIndex:'sdbj',width:60,
					         		  renderer : erp.Util.Staterenderer,
					         		  sumaryType: 'count',
										 summaryRenderer: function(value, summaryData, dataIndex) {
										 return '合计';}},
					         	   {header: '调整单号',dataIndex:'tzdh',width:100},
					         	   {header: '调整日期',dataIndex:'tzrq',width:100},
					         	   {header: '调整类型',dataIndex:'tzlx',width:100},
					         	  {header: '序号',dataIndex:'tzxh',width:60},
					         	 {header: '调整付款合同号',dataIndex:'yfhtbh',width:100},
					         	{header: '调整预付费用单',dataIndex:'yffydh',width:100},
					         	{header: '追加发票类别',dataIndex:'tzfplb',width:100},
					         	{header: '追加发票号码',dataIndex:'tzfphm',width:100},					         	
					         	{header: '调整金额',dataIndex:'tzje',width:100,
					         		summaryType: 'sum',
								      summaryRenderer: function(value, summaryData, dataIndex) {
									              	 return Ext.util.Format.number(value,'0,000.00') ;
									  }},
					         	{header: '调整原因',dataIndex:'tzyy',width:200},
					         	{header: '备注说明',dataIndex:'bzsm',width:200},
					         	{header: '锁定人',dataIndex:'sdrm',width:100},
					         	{header: '锁定时间',dataIndex:'sdsj',width:100}
					         	   ],
					         	   store: me.yftzStore
					         	}]
					         }
		         ]
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
					me.down('#grd_SupplyInvoice').getSelectionModel().select(
							records[0]);
				}
			}
		});
	}

});