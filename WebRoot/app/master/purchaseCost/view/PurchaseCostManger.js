Ext.define('erp.master.purchaseCost.view.PurchaseCostManger',{
     extend: 'erp.ux.Panel',
     alias: 'widget.mng_PurchaseCost',
     requires:['erp.ux.SelectField'],
	 listeners:{
		'close':function(cmp){
			//这里防止有些组件没有destroy,必须要加上
			cmp.destroy();
		}
	 },
     initComponent:function(){
		var me=this;
		me.can_use_btn=true;
		me.store = Ext.create('erp.master.purchaseCost.store.MainCost');
		me.search = Ext.create('erp.master.purchaseCost.model.QueryParam');
		Ext.apply(me,{
		  listeners:{
	       afterrender:function(cmp){
	            var czy_gh='admin';
					if(!erp.Util.currentUser.isAdmin){
						var sql = "	select cgyxm from cgyb where czy_gh='"+erp.Util.currentUser.accountMap[0].ref_u_id+"'";
						var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',{
							sql : sql
						});
						var data = Ext.decode(result);
						if (!data.bool) {
							Ext.toastErrorInfo(data.msg);
							return ;
						}
						if(data.val!=null){
							czy_gh=data.val;
							cmp.search.set('czym',czy_gh);
							cmp.store.proxy.extraParams.search="  and (cgfyb.czym like '%"+czy_gh+"%')";
						}
					}/*else{
						cmp.search.set('czym',czy_gh);
						cmp.store.proxy.extraParams.search="  and (cgfyb.czym like '%"+czy_gh+"%')";
					}*/
	    			cmp.store.loadPage(1);
	         }
	       },
		     layout:{
		     type: 'border',
		     padding : 2
		     },
		     dockedItems: [{
			    xtype: 'toolbar',
			    dock: 'top',
			    itemId: 'function_btn',
			    items: [
			       {text : '添加', iconCls:'page_add', itemId:'btn_add',disabled : me.ispay},
			       {text : '编辑', iconCls:'page_edit', itemId:'btn_edt'},
			       {text : '删除', iconCls:'page_delete', itemId:'btn_del',disabled : me.ispay},
			       {text : '提交', iconCls:'stamp', itemId:'btn_commit'},
			       {text : '审批', iconCls:'email_edit', itemId:'btn_appro',disabled : true},
			       {text : '信息更新',iconCls:'',itemId: 'btn_update',menu: new Ext.menu.Menu({
			           itemId : 'menu_Btnupdate',
			           items : [
			             {text: '客户信息更新',itemId : 'btn_update1'},
			             {text: '预付标记更新',itemId : 'btn_update2'}
			           ]
			       })},
			       {text : '筛选',glyph:0xf002,itemId:'btn_query'},
			       {text:'刷新',iconCls:'refresh_backwards',
			   	  				    handler:function(){
			   	  				    	me.store.reload();
			   	  				    }},
			       {text : '批量修改', iconCls:'page_edit', itemId:'btn_batch'},
			       {text : '提交对象维护',iconCls : '',itemId : 'maintenance'},
			        {text:'打印',iconCls:'printer',itemId:erp.Const.FUNC_ITEMID_BTN_PRINT,disabled:true,
	    		  menu: new Ext.menu.Menu({
	   	  		    	itemId:'menu_printer'
	   	  		  })}
			    ]
		     }],
		   items: [
		        {
	    			xtype:'treepanel',
	    			region:'west',
	    			reference:'perchasetree',
	    			collapsible:true,
	    			width:180,
	    			split:true,
	    			store : Ext.create('erp.view.master.perchasepriceadjust.store.AccountDeptTree'),
	    			listeners:{
	    			  'itemclick':function(t,rec){
	    			  	    var hsbm = rec.get('nodeId');
	    			  		  if(hsbm==0){
	    			            hsbm = 21
	    			        }
	    			  	    me.store.proxy.extraParams.hsbm=hsbm;
	    			  		me.store.loadPage(1);
	    			  }
	    			}
	    	  },
		      {
		      	flex:3,
				region: 'center',
				xtype: 'grid',
				itemId: 'grd_PurchaseCost',
				overflowY:'auto',
				overflowX:'auto',
				selModel:Ext.create('Ext.selection.CheckboxModel'),
				dockedItems:[{
			    		xtype : 'pagingbar',
			    		stateId : "pagingbar"+Ext.id(),
			    		store:me.store,
			    		dock:'bottom',
			    		defaultPageSize : 50,
			    		displayInfo:true
			    	  }],
			   /* features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock: 'bottom'
					    }], */	  
				  columns:[
				     {header : '核销',width:38,dataIndex: 'hxbj',
				          renderer: erp.Util.Staterenderer/*,
				         sumaryType: 'count',
				         summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }    */
				     },
				     {header : '审批',width:38,dataIndex: 'spbj',
				        renderer: erp.Util.Staterenderer
				     },
				     {header : '提交',width:38,dataIndex: 'tjbj',
				         renderer: erp.Util.Staterenderer
				     },
				     {header : '预付',width:38,dataIndex: 'yfbj',
				         renderer: erp.Util.Staterenderer
				     },
				     {header : '打印',width:38,dataIndex: 'dybj',
				         renderer: erp.Util.Staterenderer
				     },
				     {header : '结算方式',
				     width:80,
				     dataIndex : 'xkxj',
				     renderer : function(v){
				     	if(v==0){
				     	 return '正常结算'
				     	}else if(v==1){
				     	return '现款现结'}
				     }},{
				     header : '采购类型',
				     width:80,
				     dataIndex: 'cglx',
				      renderer : function(v){
				     	if(v==0){
				     	 return '正常采购'
				     	}else if(v==1){
				     	return '零星采购'}
				     }
				     },
				     {
				      header : '核算部门编号',
				      width:80,
				      dataIndex: 'hsbm',
				      hidden : true
				     },
				     {
				      header: '核算部门',
				      width:80,
				      dataIndex: 'bmmc'
				     },
				    /* {
				      header: '受益部门',
				      width:80,
				      dataIndex: 'sybm'
				     },{
				      header: '销售类别',
				      width: 65,
				      dataIndex: 'xslbmc'
				     }, {
				      header: '计划类别',
				      width: 65,
				      dataIndex: 'jhlbmc'
				     },*/
				     {
				      header: '费用类型',
				      width: 65,
				      dataIndex: 'fylx'
				     },
				     {
				      header: '分摊模式',
				      width: 80,
				      dataIndex: 'ftms'
				     },
				     {
				      header: '费用单号',
				      width: 80,
				      dataIndex: 'fydh'
				     },
				     /*{
				      header: '序号',
				      width: 50,
				      dataIndex: 'fyxh'
				     },
				     {
				      header: '出货编号',
				      width: 80,
				      dataIndex: 'cybh'
				     },*/
				     {
				      header: '费用日期',
				      width: 80,
				      dataIndex: 'fyrq',
				      xtype:'datecolumn',format:'Y-m-d'
				     },{
				      header : '付款方式',
				      width:80,
				      dataIndex : 'fkfs'
				     },{
				      header : '主体单位',
				      width : 170,
				      dataIndex : 'ztdw'
				     }
			       ],
			       store: me.store
		      },{
		        region:'south',
				split:true,
				flex : 2,
				xtype:'tabpanel',
				items: [/*{
		         itemId:'bzPl',
		         title: '备注说明',
		         items:[{
		            xtype: 'grid',
		            columns: [{header: '备注说明',dataIndex:'bzsm',flex: 1 }],
		         store:me.bzStore
		            }]
		         },*/{
		            title : '费用明细',
		            split:true,
		               xtype : 'grid',
		               itemId:'grdDetail',
				       height : 400,
		               store : me.bzStore,
		                features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock:'bottom'
					    }], 
					    columns: [
					    	{header: '序号',width: 50,dataIndex: 'fyxh',
				         sumaryType: 'count',
				         summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            } },
					        {
				      header: '受益部门',
				      width:80,
				      dataIndex: 'sybm'
				     },{
				      header: '销售类别',
				      width: 65,
				      dataIndex: 'xslbmc'
				     }, {
				      header: '计划类别',
				      width: 65,
				      dataIndex: 'jhlbmc'
				     },
				     {
				      header: '出货编号',
				      width: 80,
				      dataIndex: 'cybh'
				     },{
				      header: '供应商/业务对象',
				      width: 210,
				      dataIndex: 'csmc',
	    			   	renderer:function(v,metaData){
					        metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				            return v;
			            }
				     },{
				      header: '费用摘要',
				      width: 210,
				      dataIndex: 'fyzy',
	    			   	renderer:function(v,metaData){
					        metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				            return v;
			            }
				     },
				     {
				      header: '数量',
				      width: 65,
				      dataIndex: 'fysl',
				      summaryType: 'sum',
				      summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return value;
					  }, 
					  renderer:function(value, summaryData, dataIndex) {
					              	 return value;
					            },
				      renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}
				     },
				     {
				      header: '箱数',
				      width: 65,
				      dataIndex: 'fyxs',
				      renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}
				     },
				     {
				      header: '调拨箱数',
				      width: 80,
				      dataIndex: 'dbxs',
				      renderer:function(v){if(v==0){return ' '}else{return v}}
				     },
				     {
				      header: '含税单价',
				      width: 80,
				      dataIndex: 'fydj',
				      renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }
				      }
				     },
				     {
				      header: '含税金额',
				      width: 100,
				      dataIndex: 'fyje',
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
				     },
				     {
				      header: '税率',
				      width: 60,
				      dataIndex: 'zzsl',
		              renderer : function(value, dataIndex){
		              return Ext.util.Format.number(value*100,'00.00%')}
				     },
				     {
				      header: '除税单价',
				      width: 100,
				      dataIndex: 'csdj',
					  renderer:function(v){
					  return Ext.util.Format.number(v,'0,000.000000');
					   }
				     },
				     {
				      header: '除税金额',
				      width: 100,
				      dataIndex: 'csje',
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
				     },
				     {
				      header: '税额',
				      width: 80,
				      dataIndex: 'zzse',
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
				     },
				     {
				      header: '外币单价',
				      width: 80,
				      dataIndex: 'wbdj',
					  renderer:Ext.util.Format.floatRenderer
					 },{
				      header: '汇率',
				      width: 50,
				      dataIndex: 'wbhl',
					  renderer:function(v){
					  if(v==0){
				      return ' '
				      }else{
					  return Ext.util.Format.number(v,'0,000.0000');
				      } }
				     },
				     {
				      header: '外币金额',
				      width: 80,
				      dataIndex: 'wbje',
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
				     },
				     {
				      header: '生产单号',
				      width: 100,
				      dataIndex: 'jhbz'
				     },
				     {
				      header: '计划号',
				      width: 80,
				      dataIndex: 'jhh'
				     },
				     {
				      header: '客户名称',
				      width: 210,
				      dataIndex: 'khmc'
				     },
				     {
				      header: '上级支付类别',
				      width: 100,
				      dataIndex: 'sjzflbmc'
				     },
				     {
				      header: '支付类别',
				      width: 100,
				      dataIndex: 'zflbmc'
				     },
				     {
				      header: '分摊系数',
				      width: 100,
				      dataIndex: 'ftxs',
				      renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}
				     },
				     {
				      header: '生产工序',
				      width: 80,
				      dataIndex: 'scgxmc'
				     },
				     {
				      header: '合同号',
				      width: 80,
				      dataIndex: 'hth'
				     },
				     {
				      header: '任务号',
				      width: 70,
				      dataIndex: 'wxh'
				     },
				     {
				      header: '回收号',
				      width: 70,
				      dataIndex: 'hsh'
				     },
				     {
				      header: '异常号',
				      width: 70,
				      dataIndex: 'ych',
				      renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}
				     },
				     {
				      header: '发货仓库',
				      width: 80,
				      dataIndex: 'fhckmc'
				     },
				     {
				      header: '发货号',
				      width: 80,
				      dataIndex: 'fhh'
				     },
				     {
				      header: '调出仓库',
				      width: 80,
				      dataIndex: 'dcckmc'
				     },
				     {
				      header: '调出号',
				      width: 70,
				      dataIndex: 'dbh',
				      renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}
				     },
				     {
				      header: '调出日期',
				      width: 100,
				      dataIndex: 'dcrq',
				      xtype:'datecolumn',format:'Y-m-d'
				     },
				     {
				      header: '材料委托号',
				      width: 80,
				      dataIndex: 'clwth'
				     },
				     {
				      header: '产品委托号',
				      width: 80,
				      dataIndex: 'cpwth'
				     },
				     {
				      header: '手工通知号',
				      width: 80,
				      dataIndex: 'sgtzh'
				     },
				     {
				      header: '运输记录号',
				      width: 80,
				      dataIndex: 'ysjlh'
				     },
				     {
				      header: '转运人',
				      width: 65,
				      dataIndex: 'zyrm'
				     },
				     {
				      header: '备注说明',
				      width: 210,
				      dataIndex: 'bzsm',
	    			   	renderer:function(v,metaData){
					        metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				            return v;
			            }
				     },
				     {
				      header: '操作员',
				      width: 65,
				      dataIndex: 'czym'
				     },
				     {
				      header: '操作时间',
				      width: 100,
				      dataIndex: 'czsj',
				      xtype:'datecolumn',format:'Y-m-d'
				     },
				     {
				      header: '锁定人',
				      width: 65,
				      dataIndex: 'sdrm'
				     },
				     {
				      header: '锁定时间',
				      width: 80,
				      dataIndex: 'sdsj',
				      xtype:'datecolumn',format:'Y-m-d'
				     },
				     {
				      header: '通知单号',
				      width: 80,
				      dataIndex: 'tzdh',
				      renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}
				     },
				     {
				      header: '记录编号',
				      width: 65,
				      dataIndex: 'jlbh',
				      renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}
				     },
				     {
				      header: '发票类别',
				      width: 100,
				      dataIndex: 'fplb'
				     },
				     {
				      header: '发票号码',
				      width: 100,
				      dataIndex: 'fphm'
				     },
				     {
				      header: '审批意见',
				      width: 160,
				      dataIndex: 'spyj'
				     },
				     {
				      header: '审批人',
				      width: 65,
				      dataIndex: 'sprm'
				     },
				     {
				      header: '审批时间',
				      width: 100,
				      dataIndex: 'spsj',
				      xtype:'datecolumn',format:'Y-m-d'
				     },
				     {
				      header: '提交人',
				      width: 65,
				      dataIndex: 'tjrm'
				     },
				     {
				      header: '提交时间',
				      width: 100,
				      dataIndex: 'tjsj',
				      xtype:'datecolumn',format:'Y-m-d'
				     },
				     {
				      header: '打印时间',
				      width: 80,
				      dataIndex: 'dysj',
				      xtype:'datecolumn',format:'Y-m-d'
				     }    
					]
		         },{
		            title: '费用汇总',
		            xtype: 'grid',
		            itemId:'grdCost',
		            features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock: 'bottom'
					    }], 
		            columns: [
		            {header:'序号',dataIndex:'xmxh',flex: 1,
				          renderer: erp.Util.Staterenderer,
				         sumaryType: 'count',
				         summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }     },
		            {header: '费用项目',dataIndex:'fyxm',flex:6},
		            {header: '费用金额',dataIndex:'fyje',flex:3,
					  summaryType: 'sum',
				      summaryRenderer: Ext.util.Format.floatRenderer,
					  renderer:function(value, summaryData, dataIndex) {
					              	  return value;
					            }}
		            ],
		            store: me.fyStore
		         },
		         {
		            title : '分摊明细',
		         	xtype: 'grid',
		            itemId: 'grdDetial',
		            columns:[
		            {header:'出运号',dataIndex:'cyh',flex:2,
		             sumaryType: 'count',
					 summaryRenderer: function(value, summaryData, dataIndex) {
					 return '合计';}},
		            {header:'销售类别',dataIndex:'xslbmc',flex:2},
		            {header:'产品编号',dataIndex:'cpbh',flex:2},
		            {header:'产品名称',dataIndex:'cpmc',flex:6},
		            {header:'单位',dataIndex:'jldw',flex:1},
		            {header:'体积CBM',dataIndex:'hjtj',flex:2,
		              summaryType: 'sum',
		              summaryRenderer: function(value, summaryData, dataIndex) {
					  return Ext.util.Format.number(value,'0,000.000') ;
					 }},
		            {header:'分摊金额',dataIndex:'ftje',flex:2},
		            {header:'核算部门',dataIndex:'hsbm',flex:2}
		            ],
		            store: me.ftStore
		         },
		         {
		         	itemId: 'fjPl',
		         	title: '附件明细',
		         	items:[{
		         	   xtype:'grid',
		         	   itemId: 'grdAccessory',
		         	   columns:[
		         	   {header: '文件编号',dataIndex:'wjbh',width:80},
		         	   {header: '文件路径',dataIndex:'wjlj',width:300},
		         	   {header: '文件名称',dataIndex:'wjmc',width:300},
		         	   {header: '创建人名',dataIndex:'cjrm',width:80},
		         	   {header: '创建日期',dataIndex:'wjrq',width:100,xtype:'datecolumn',format:'Y.m.d'},
		         	   {
						header:'操作',xtype:'actioncolumn',width:80,
						items:[
						{iconCls:'download',tooltip:'下载',itemId:'btn_QuotFile_download',
		         	       handler: function(grid,rowIndex,colIndex){
		         	       	var rec = grid.getStore().getAt(rowIndex);
		         	       	if(Ext.isEmpty(rec.get('wjlj')))
							{
								Ext.Msg.alert('提示','未上传，无法下载');
								return;
							}
							file_path=rec.get('wjlj');
							window.open('ftp://'+tp_ftpUrl+file_path, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=no, status=no');
		         	       }
						}]
		         	   }   
		         	   ],
		         	   store: me.fjStore
		         	}
		    ]  
		   }]
		 }]}
		);
		me.callParent(arguments);
	},
	/**
	 * @description 打印模板回调函数，用于页面中打印前处理
	 * @param {} 入参item:打印选项
	 * @return {}	 出参recs：选择记录或NULL
	 */
	PrintProcess:function(item){
	    var me=this;
	    var recs;
	    var grid = me.down('#grd_PurchaseCost');
	    recs=grid.getSelectionModel().getSelection();
		if(recs.length==0){
			Ext.Msg.alert("提示","请至少选择一条数据");
			return ;
		}
		return recs;
	},
	loadMain:function(){
		var me=this;
		me.store.loadPage(1,{
		    callback: function(records, operation, success) {
		        if(records.length>0){
		        	me.down('#grd_PurchaseCost').getSelectionModel().select(records[0]);
		        }		        
		    }
		});
	}
	
});