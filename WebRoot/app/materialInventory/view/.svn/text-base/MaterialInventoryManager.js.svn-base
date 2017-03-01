Ext.define('erp.materialInventory.view.MaterialInventoryManager',{
	extend: 'erp.ux.Panel',
    alias: 'widget.mng_MaterialInventoryManager',
    requires:['erp.ux.SelectField',
              'erp.materialInventory.store.MaterialInventoryManager',
              'erp.materialInventory.store.MaterialInventoryManagerBufferrd'],
    layout: {
        type: 'border',padding : 2
    },
    initComponent:function(){
    	var me=this;
		me.can_use_btn=true;
		me.store = Ext.create('erp.materialInventory.store.MaterialInventoryManager');
		/*if(me.qsrq!=null && me.qsrq!=''){
			me.store.proxy.extraParams.qsrq = me.qsrq;
		}
		if(me.jzrq!=null && me.jzrq!=''){
			me.store.proxy.extraParams.jzrq = me.jzrq;
		}
		if(me.ckbh!=null && me.ckbh!=''){
		
			me.store.proxy.extraParams.ckbh = me.ckbh;
		}*/
		/*me.store.on({
			load:function(s,recs){
				var grid=me.down('#grd_MaterialInventory');
				if(recs.length>0){
					erp.Util.gridSelect(grid,recs);
					grid.view.bufferedRenderer.scrollTo(-1, true);
				}else{
					grid.getStore().removeAll();
				}				
			},
			totalcountchange:function onStoreSizeChange() {
				var grid=me.down('#grd_MaterialInventory');
		        grid.down('#status').update({count: me.store.getTotalCount()});
		    }
		});*/
		Ext.apply(me.store.proxy.extraParams,{
			czyh : me.czyh,
			hxbj : me.hxbj,
            cgym : me.cgym,
			qsrq : me.qsrq,
            jzrq : me.jzrq,
			s_ckbh : me.s_ckbh,
			usePaging:true
		});
		Ext.apply(me,{
			listeners:{
	    		afterrender:function(cmp){
	    			cmp.store.loadPage(1);
	    		}
	    	},
			dockedItems: [{
				 xtype: 'toolbar',
				 dock: 'top',
				 itemId: 'function_btn',
				 items: [
					       {text : '增加', iconCls:'page_add', itemId:'btn_add',
					    	   disabled : true
					    	   },					       
					       {text : '删除', iconCls:'page_delete', itemId:'btn_del',
					    	   disabled : true
					    	   },
					       {text : '筛选',iconCls: 'page_find',itemId:'btn_query'},
					       {text : '锁定', iconCls:'', itemId:'btn_lock',
					    	   disabled : true,
					    	   menu: new Ext.menu.Menu({
				   	  		    	itemId:'menu_lock',
				   	  		    	items:[
				   	  		    		{text:'整单锁定',itemId:'btn_lock1'},
				   	  		    		{text:'多选锁定',itemId:'btn_lock2'}
				   	  		    	]
				   	  		  })
					       },
					       {text : '单价核查',iconCls:'', itemId:'btn_price',
					    	   disabled : true
					    	   },
					       {text : '费用补录',iconCls:'', itemId:'btn_payment',disabled :true},
					       {text : '短料规格',iconCls:'', itemId:'btn_spec',disabled :true},
					       {text : '信息更新',iconCls:'', itemId:'btn_update',menu: new Ext.menu.Menu({
			   	  		    	itemId:'menu_update',
			   	  		    	items:[
		   	  		    		{text:'到货信息更新',itemId:'menu_update1',handler:function(item){
		   	  		    		    me.store.proxy.extraParams.infoUpdate = "arrivalInfo";
		   	  		    		    me.store.loadPage(1);
		   	  		    		}},
		   	  		    		{text:'合同信息更新',itemId:'menu_update2',handler:function(item){
		   	  		    		    me.store.proxy.extraParams.infoUpdate = "contactInfo";
		   	  		    		    me.store.loadPage(1);
		   	  		    		}},
		   	  		    		{text:'计划信息更新',itemId:'menu_update3',handler:function(item){
		   	  		    		    me.store.proxy.extraParams.infoUpdate = "planInfo";
		   	  		    		    me.store.loadPage(1);
		   	  		    		}}]		
					        })
					       },					     					       
					       {text:'刷新',iconCls:'refresh_backwards',
					   	  				    handler:function(){
					   	  				    	me.store.loadPage(1);
					   	  				    }},
					       {text : '打印', iconCls:'', itemId:'btn_print',disabled :true
					   	  				    	},
					       {text: '退出',iconCls:'',itemId:'btn_out', handler:function(){me.close();}},
					       {
						        xtype: 'displayfield',
						        itemId: 'tips',
						        value: '<font color="red">'+'材料入库单管理'+'【 '+me.arr_ckmc+' 入库日期：'+me.qsrq+' 至 '+me.jzrq+' 】</font>' 
						    }
					    ]
			}],
			items: [{
				 flex:1,
					region: 'center',
					xtype: 'grid',
					itemId: 'grd_MaterialInventory',
					overflowY:'auto',
					overflowX:'auto',
					selModel:Ext.create('Ext.selection.CheckboxModel'),
					dockedItems:[{
				    		xtype : 'pagingbar',
				    		stateId : "pagingbar"+Ext.id(),
				    		store:me.store,
				    		dock:'bottom',
				    		defaultPageSize : 200,
				    		displayInfo:true
					        }],
				    	  plugins: [{ptype: 'bufferedrenderer'},
				    	            {ptype:'gridfilters',menuFilterText:'筛选条件'}],
				    features: [{
						        ftype: 'summary',
						        summaryType: 'count',
								dock: 'bottom'
						    }],
				    columns:[
						     {header : '核销',width:40,dataIndex: 'hxbj',
						          renderer: erp.Util.Staterenderer,
						         sumaryType: 'count',
						         summaryRenderer: function(value, summaryData, dataIndex) {
							                 return '合计';
							            }    
						     },
						     {header : '锁定',width:40,dataIndex: 'sdbj',
							        renderer: erp.Util.Staterenderer
							     },
						     {header : '外协',width:40,dataIndex: 'wxbj',
							        renderer: erp.Util.Staterenderer
							     },
						     {header : '外购',width:40,dataIndex: 'wgbj',
							        renderer: erp.Util.Staterenderer
							     },
						     {header : '联入',width:40,dataIndex: 'glrk',
							        renderer: erp.Util.Staterenderer
							     },
						     {header : '联退',width:40,dataIndex: 'gltk',
							        renderer: erp.Util.Staterenderer
							     },
						     {header : '赠送',width:40,dataIndex: 'zsbj',
							        renderer: erp.Util.Staterenderer
							     },
						     {header : '估价',width:40,dataIndex: 'gjbj',
							        renderer: erp.Util.Staterenderer
							     },
						     {header : '打印',width:40,dataIndex: 'dybj',
							        renderer: erp.Util.Staterenderer
							     },
						     {header : '预付',width:40,dataIndex: 'yfbj',
						        renderer: erp.Util.Staterenderer
						     },
						     {header : '红冲',width:40,dataIndex: 'hcbj'},
						     {header: '通知单号',width:60 ,dataIndex: 'tzdh'},
						     {header: '发票号码',width:60 ,dataIndex: 'fphm'},
						     {header: '仓库名称',width:100 ,dataIndex: 'ckmc'},
						     {header: '入库单号',width:60 ,dataIndex: 'rkdh'},
						     {header: '序号',width:30 ,dataIndex: 'rkxh'},
						     {header: '入库日期',width:80 ,dataIndex: 'rkrq',xtype:'datecolumn',format:'Y-m-d'},
						     {header: '合同编号',width:80 ,dataIndex: 'htbh',hidden: true},
						     {header: '合同序号',width:80 ,dataIndex: 'htxh',hidden: true},
						     {header: '所属用户',width:100 ,dataIndex: 'yhbh',hideable: false,hidden: true},
						     {header: '仓库编号',width:100 ,dataIndex: 'ckbh',hideable: false,hidden: true},
						     {header: '供应厂商',width:100 ,dataIndex: 'csmc'},
						     {header: '材料类别',width:70 ,dataIndex: 'lbmc'},
						     {header: '材料货号',width:70 ,dataIndex: 'clhh'},
						     {header: '材料图号',width:70 ,dataIndex: 'clth'},
						     {header: '材料名称',width:100 ,dataIndex: 'clmc'},
						     {header: '规格尺寸',width:100 ,dataIndex: 'cltx1'},
						     {header: '材料特性2',width:100 ,dataIndex: 'cltx2',hideable: false,hidden: true},
						     {header: '材料特性3',width:100 ,dataIndex: 'cltx3',hideable: false,hidden: true},
						     {header: '客户型号',width:70 ,dataIndex: 'khxh'},
						     {header: '产品名称',width:70 ,dataIndex: 'cpmc'},
						     {header: '主产品名称',width:70 ,dataIndex: 'zcpmc'},
						     {header: '生产单号',width:70 ,dataIndex: 'jhbz'},
						     {header: '单位',width:40 ,dataIndex: 'jldw'},
						     {header: '货位号',width:70 ,dataIndex: 'hwbh'},
						     {header: '生产批次',width:70 ,dataIndex: 'pcbh'},
						     {header: '供货批次',width:70 ,dataIndex: 'ghpc'},
						     {header: '入库数量',width:70 ,dataIndex: 'rksl',
						    	 summaryType: 'sum',
		                            summaryRenderer: function (value, summaryData, dataIndex) {
		                                    return Ext.util.Format.number(value, '0,000');
		                                },
		                                renderer: function (value, summaryData, dataIndex) {
		                                    return Ext.util.Format.number(value, '0,000');
		                                },
		                                renderer: function (v) {
		                                    if (v == 0) {
		                                        return ' ';
		                                    } else {
		                                        return v;
		                                    }
		                                }	 
						     },
						     {header: '专利付费厂商',width:70,dataIndex:'zlcsbh',hidden:true},
						     {header: '专利付费厂商',width:70,dataIndex:'zlcsmc'},
						     {header: '专利费单价',width:70 ,dataIndex: 'zldj',
						    	 renderer:function(v){
									  return Ext.util.Format.number(v,'0,000.000000');
									   }	 
						     },
						     {header: '专利金额',width:70 ,dataIndex: 'zlje',
						    	 renderer:function(v){
									  return Ext.util.Format.number(v,'0,000.000000');
									   }	 
						     },
						     {header: '成本单价',width:70 ,dataIndex: 'cbdj',
						    	 renderer:function(v){
									  return Ext.util.Format.number(v,'0,000.000000');
									   }	 
						     },
						     {header: '含税单价',width:100 ,dataIndex: 'rkdj',
						    	 renderer:function(v){
									  return Ext.util.Format.number(v,'0,000.000000');
									   }	 
						     },
						      {header: '控制单价',width:100 ,dataIndex: 'kzdj',
						    	 renderer:function(v){
									  return Ext.util.Format.number(v,'0,000.000000');
									   }	 
						     },						     
						     {header: '含税金额',width:70 ,dataIndex: 'rkje',
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
						     {header: '税率',width:50 ,dataIndex: 'zzsl',
						    	 renderer:function(v){
									  if(v==0){
								      return ' ';
								      }else{
									  return Ext.util.Format.number(v,'0,000.0000');
								      } }	 
						     },
						     {header: '除税单价',width:70 ,dataIndex: 'csdj',
						    	 renderer:function(v){
									  return Ext.util.Format.number(v,'0,000.000000');
									   }	 
						     },
						     {header: '除税金额',width:70 ,dataIndex: 'csje',
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
						     {header: '税额',width:60 ,dataIndex: 'zzse',
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
						     {header: '币种',width:50 ,dataIndex: 'wbbh'},//
						     {header: '汇率',width:50 ,dataIndex: 'wbhl',
						    	 renderer:function(v){
									  if(v==0){
								      return ' ';
								      }else{
									  return Ext.util.Format.number(v,'0,000.0000');
								      } }	 	 
						     },
						     {header: '外币单价',width:70 ,dataIndex: 'wbdj',
						    	 renderer:function(v){
									  return Ext.util.Format.number(v,'0,000.000000');
									   }	 
						     },
						     {header: '外币金额',width:70 ,dataIndex: 'wbje',
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
						     {header: '辅助单位',width:70 ,dataIndex: 'fzdw'},
						     {header: '辅助数量',width:70 ,dataIndex: 'fzsl',
						    	 summaryType: 'sum',
							      summaryRenderer: function(value, summaryData, dataIndex) {
								              	 return Ext.util.Format.number(value,'0,000') ;
								  }, 
								  renderer:function(value, summaryData, dataIndex) {
								              	 return Ext.util.Format.number(value,'0,000') ;
								            },
							      renderer:function(v){
							      if(v==0){
							      return ' ';
							      }else{
							      return v;
							      }}	 
						     },
						     {header: '相当重量',width:70 ,dataIndex: 'xdzl'},
						     {header: '入库类别1',width:100 ,dataIndex: 'rklb',hideable:false,hidden:true},
						     {header: '入库类别',width:50, dataIndex: 'rklbmc'},
						     {header: '采计交期',width:100 ,dataIndex: 'wkjq',xtype:'datecolumn',format:'Y-m-d'},//
						     {header: '交货日期',width:100 ,dataIndex: 'jhrq',xtype:'datecolumn',format:'Y-m-d'},
						     {header: '到货号',width:70 ,dataIndex: 'dhh'},
						     {header: '合同号',width:70 ,dataIndex: 'hth'},
						     {header: '采购员编号',width:70 ,dataIndex: 'cgym', hidden:true},
						     {header: '采购员',width:70 ,dataIndex: 'cgyxm'},
						     {header: '包装编号',width:70 ,dataIndex: 'bzbh'},
						     {header: '合同类型',width:70 ,dataIndex: 'cglx'},
						     {header: '采计号',width:70 ,dataIndex: 'cgh'},
						     {header: '关联合同编号',width:70 ,dataIndex: 'glht'},
						     {header: '主计划号',width:70 ,dataIndex: 'zjhh'},
						     {header: '计划号',width:70 ,dataIndex: 'jhh'},
						     {header: '外协号',width:70 ,dataIndex: 'wxh'},
						     {header: '申请号',width:70 ,dataIndex: 'sqh'},
						     {header: '送货单号',width:70 ,dataIndex: 'shdh'},
						     {header: '返工计划号',width:100 ,dataIndex: 'fgh'},
						     {header: '返工产品',width:70 ,dataIndex: 'fgcp'},
						     {header: '送货日期',width:70 ,dataIndex: 'shsj',xtype:'datecolumn',format:'Y-m-d'},
						     {header: '备注说明',width:70 ,dataIndex: 'bzsm'},
						     {header: 'PONO',width:70 ,dataIndex: 'sxdy09'},
						     {header: '交库人',width:70 ,dataIndex: 'jkrm'},
						     {header: '制造日期',width:70 ,dataIndex: 'zzrq',xtype:'datecolumn',format:'Y-m-d'},
						     {header: '票据日期 ',width:70 ,dataIndex: 'pjrq',xtype:'datecolumn',format:'Y-m-d'},
						     {header: '操作员',width:70 ,dataIndex: 'czym'},
						     {header: '操作时间',width:70 ,dataIndex: 'czsj',xtype:'datecolumn',format:'Y-m-d'},
						     {header: '锁定人',width:70 ,dataIndex: 'sdrm'},
						     {header: '锁定时间',width:70 ,dataIndex: 'sdsj',xtype:'datecolumn',format:'Y-m-d'},
						     {header: '打印时间',width:70 ,dataIndex: 'dysj',xtype:'datecolumn',format:'Y-m-d'},
						     {header: '关联领料号',width:70 ,dataIndex: 'glllh'},
						     {header: '关联退料号',width:70 ,dataIndex: 'gltlh'},
						     {header: '延迟入库',width:70 ,dataIndex: 'ycrk'}
						     ],
			         store: me.store
			 }]
		});
		 
		me.callParent(arguments);	        
    },
    loadMain:function(){
		var me=this;
		me.store.loadPage(1,{
		    callback: function(records, operation, success) {	        
		    }
		});
	}
}); 